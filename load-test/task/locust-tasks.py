import os
import json
import random
from urllib.parse import urlencode
from locust import HttpUser, task, between, events

def env(name, default=None, cast=str):
  val = os.getenv(name, default)
  return cast(val) if val is not None else None

TARGET_HOST      = env("TARGET_HOST", "http://localhost:8080")
AUTH_TOKEN       = env("AUTH_TOKEN", "")
AUTH_LOGIN_PATH  = env("AUTH_LOGIN_PATH", "/login")
AUTH_USERNAME    = env("AUTH_USERNAME", "")
AUTH_PASSWORD    = env("AUTH_PASSWORD", "")

MEMBER_ID_MIN    = env("MEMBER_ID_MIN", "1", int)
MEMBER_ID_MAX    = env("MEMBER_ID_MAX", "1000", int)
PAGE_MIN         = env("PAGE_MIN", "0", int)
PAGE_MAX         = env("PAGE_MAX", "10", int)
PAGE_SIZE        = env("PAGE_SIZE", "20", int)

# 선택: 고정 ID 목록 파일이 있으면 우선 사용
MEMBER_IDS_PATH = "/load-test/data/member_ids.txt"
STATIC_MEMBER_IDS = []
if os.path.exists(MEMBER_IDS_PATH):
  with open(MEMBER_IDS_PATH, "r", encoding="utf-8") as f:
    for line in f:
      s = line.strip()
      if s.isdigit():
        STATIC_MEMBER_IDS.append(int(s))

def pick_member_id():
  if STATIC_MEMBER_IDS:
    return random.choice(STATIC_MEMBER_IDS)
  return random.randint(MEMBER_ID_MIN, MEMBER_ID_MAX)

class MemberUser(HttpUser):
  """
  /api/v1/members 도메인 3개 API 부하 테스트 사용자
    1) GET  /api/v1/members                (목록)
    2) GET  /api/v1/members/{id}           (상세)
    3) PUT  /api/v1/members/{id}           (수정: 닉네임 변경 예시)
  """
  host = TARGET_HOST
  wait_time = between(0.5, 2.0)

  headers = {"Content-Type": "application/json"}
  token_ready = False

  def on_start(self):
    # 토큰이 주어지면 그대로 사용
    if AUTH_TOKEN:
      self.headers["Authorization"] = f"Bearer {AUTH_TOKEN}"
      self.token_ready = True
      return

    # 필요 시 로그인 플로우 (스프링 보안 정책에 맞게 수정)
    # 예: /login 에 {username,password} 로 POST → JWT 반환 가정
    if AUTH_USERNAME and AUTH_PASSWORD and AUTH_LOGIN_PATH:
      payload = {"username": AUTH_USERNAME, "password": AUTH_PASSWORD}
      with self.client.post(
          AUTH_LOGIN_PATH,
          data=json.dumps(payload),
          headers={"Content-Type": "application/json"},
          name="AUTH /login",
          catch_response=True,
      ) as resp:
        if resp.status_code in (200, 201):
          try:
            data = resp.json()
            # 예시) { "accessToken": "xxx" }
            token = data.get("accessToken") or data.get("token") or ""
            if token:
              self.headers["Authorization"] = f"Bearer {token}"
              self.token_ready = True
              resp.success()
            else:
              resp.failure("No token in login response")
          except Exception as e:
            resp.failure(f"Login JSON parse error: {e}")
        else:
          resp.failure(f"Login failed: {resp.status_code}")

  # 1) 목록
  @task(5)
  def list_members(self):
    page = random.randint(PAGE_MIN, PAGE_MAX)
    params = {
      "page": page,
      "size": PAGE_SIZE,
      # 필요에 따라 sort, 검색 파라미터 추가
      # "sort": "createdAt,desc"
    }
    q = urlencode(params)
    self.client.get(
        f"/api/v1/members?{q}",
        headers=self.headers,
        name="GET /api/v1/members",
    )

  # 2) 상세
  @task(3)
  def get_member_detail(self):
    member_id = pick_member_id()
    self.client.get(
        f"/api/v1/members/{member_id}",
        headers=self.headers,
        name="GET /api/v1/members/{id}",
    )

  # 3) 수정(닉네임만 가볍게 변경하는 예)
  @task(2)
  def update_member(self):
    if not self.token_ready and "Authorization" not in self.headers:
      # 인증 필요한 API라면 토큰 없을 때는 생략(401 스팸 방지)
      return
    member_id = pick_member_id()
    body = {
      "nickname": f"locust_{random.randint(1, 10_000_000)}"
    }
    self.client.put(
        f"/api/v1/members/{member_id}",
        data=json.dumps(body),
        headers=self.headers,
        name="PUT /api/v1/members/{id}",
    )

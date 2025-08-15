# osca

## 실행 환경 구성

### 필수 요구사항

* Docker
* Docker Compose
* Make (Makefile 실행용)

---

## 환경별 설치 가이드

### Windows (WSL2)

1. **WSL2 설치**

   ```powershell
   # PowerShell(관리자 권한) 실행
   wsl --install
   # 재부팅 후 Ubuntu 배포판 선택 및 초기 설정
   ```

2. **Docker Desktop 설치**

    * [Docker Desktop for Windows](https://docs.docker.com/desktop/install/windows-install/) 다운로드
    * 설치 시 **"Use WSL 2 based engine"** 옵션 체크
    * Docker Desktop → Settings → **WSL Integration** 활성화

3. **WSL에서 Make 설치**

   ```bash
   sudo apt update && sudo apt install -y make
   ```

4. **Makefile 실행 불가 시 (대체 명령어)**

   ```bash
   # 빌드
   ./gradlew clean bootJar
   docker build -t osca:latest .

   # 실행
   docker run --name osca --rm \
     --read-only -v osca-tmp:/tmp \
     --memory=1g \
     -p 8080:8080 \
     -e SPRING_PROFILES_ACTIVE=prod \
     osca:latest
   ```

---

### macOS

1. **Docker Desktop 설치**

   ```bash
   brew install --cask docker
   ```

   또는 [공식 설치 페이지](https://docs.docker.com/desktop/install/mac-install/)에서 다운로드

2. **Make 설치**

    * macOS에는 기본적으로 `make`가 포함되어 있으나, 없으면 아래 명령어 실행:

   ```bash
   xcode-select --install
   ```

   또는

   ```bash
   brew install make
   ```

3. **M1/M2 Mac 성능 최적화**

    * Docker Desktop → Settings → Features:

        * **Use Virtualization Framework**
        * 필요 시 **Use Rosetta for x86/amd64 emulation**

---

### Linux (Ubuntu/Debian)

1. **Docker 설치**

   ```bash
   sudo apt update
   sudo apt install -y ca-certificates curl gnupg lsb-release

   sudo mkdir -p /etc/apt/keyrings
   curl -fsSL https://download.docker.com/linux/ubuntu/gpg \
     | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

   echo \
     "deb [arch=$(dpkg --print-architecture) \
     signed-by=/etc/apt/keyrings/docker.gpg] \
     https://download.docker.com/linux/ubuntu \
     $(lsb_release -cs) stable" \
     | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

   sudo apt update
   sudo apt install -y docker-ce docker-ce-cli containerd.io \
                       docker-buildx-plugin docker-compose-plugin

   sudo usermod -aG docker $USER
   sudo systemctl enable --now docker
   newgrp docker
   ```

2. **Make 설치**

   ```bash
   sudo apt install -y make
   ```

---

## 데이터베이스 실행

> 현재 `docker-compose.yml`에는 DB 설정만 존재

```bash
docker compose up -d   # DB 실행
docker compose down    # DB 중지
```

---

## 프로젝트 실행

### 방법 1: Makefile 사용 (권장)

```bash
make build  # Docker 이미지 빌드
make run    # 애플리케이션 실행
```

### 방법 2: 직접 명령어 사용

```bash
./gradlew clean bootJar
docker build -t osca:latest .
docker run --name osca --rm \
  --read-only -v osca-tmp:/tmp \
  --memory=1g \
  -p 8080:8080 \
  -e SPRING_PROFILES_ACTIVE=prod \
  osca:latest
```

---

## Makefile 주요 명령어

| 명령어                | 설명                    |
| ------------------ | --------------------- |
| make bootjar       | JAR 빌드만 실행            |
| make build         | Docker 이미지 빌드 (캐시 사용) |
| make build-nocache | Docker 이미지 빌드 (캐시 무시) |
| make build-fixed   | 고정 힙 메모리로 빌드          |
| make run           | 애플리케이션 실행             |
| make run-fixed     | 고정 힙 메모리로 실행          |
| make logs          | 로그 확인                 |
| make stop          | 컨테이너 중지/정리            |
| make clean         | 모든 리소스 정리             |
| make push          | 레지스트리에 이미지 푸시         |

---

## 문제 해결

1. **`make: command not found`**

    * Windows(WSL): `sudo apt install make`
    * macOS: `xcode-select --install` 또는 `brew install make`
    * Linux: `sudo apt install make`

2. **Docker 권한 오류**

   ```bash
   sudo usermod -aG docker $USER
   newgrp docker
   ```

3. **포트 충돌**

   ```bash
   sudo lsof -i :8080
   make run PORT=9090
   ```

4. **메모리 부족**

   ```bash
   make run MEM_LIMIT=2g
   make build MAX_RAM_PCT=60.0
   ```

5. **컨테이너 정리**

   ```bash
   make clean
   # 또는
   docker rm -f osca
   docker volume rm osca-tmp
   ```

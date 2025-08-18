-- =========================================
-- 1. 테이블 생성 (UNIQUE 제약조건 포함)
-- =========================================

-- 회원 테이블 (소프트 삭제 및 인증 기능 추가)
CREATE TABLE members
(
    id                     BIGINT PRIMARY KEY AUTO_INCREMENT,
    name                   VARCHAR(100) NOT NULL,
    nickname               VARCHAR(50)  NOT NULL UNIQUE,
    email                  VARCHAR(255) NOT NULL UNIQUE,
    password               VARCHAR(255) NOT NULL,
    phone_number           VARCHAR(20) UNIQUE,
    profile_image_url      VARCHAR(500),
    report_count           INT                              DEFAULT 0,
    role                   ENUM ('GENERAL', 'CEO', 'ADMIN') DEFAULT 'GENERAL',
    is_blocked             BOOLEAN                          DEFAULT FALSE,
    blocked_reason         VARCHAR(500) COMMENT '차단 사유',
    blocked_until          DATETIME COMMENT '차단 해제 날짜',
    blocked_by             BIGINT COMMENT '차단 처리한 관리자 ID',
    email_verified         BOOLEAN                          DEFAULT FALSE COMMENT '이메일 인증 여부',
    phone_verified         BOOLEAN                          DEFAULT FALSE COMMENT '전화번호 인증 여부',
    email_verify_token     VARCHAR(100) COMMENT '이메일 인증 토큰',
    phone_verify_code      VARCHAR(10) COMMENT '전화번호 인증 코드',
    last_login_at          DATETIME COMMENT '마지막 로그인',
    password_reset_token   VARCHAR(100) COMMENT '비밀번호 재설정 토큰',
    password_reset_expires DATETIME COMMENT '비밀번호 재설정 토큰 만료일',
    deleted_at             DATETIME COMMENT '소프트 삭제 (탈퇴일)',
    created_at             DATETIME                         DEFAULT CURRENT_TIMESTAMP,
    updated_at             DATETIME                         DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;

-- 일반회원 상세 정보 테이블
CREATE TABLE general_profiles
(
    member_id       BIGINT PRIMARY KEY,
    university      VARCHAR(100),
    company         VARCHAR(100),
    work_start_date DATE,
    work_end_date   DATE,
    introduction    TEXT,
    career_level    ENUM ('FRESHER', 'JUNIOR', 'SENIOR', 'LEAD') DEFAULT 'FRESHER',
    salary_range    VARCHAR(50),
    github_url      VARCHAR(255) COMMENT 'GitHub 프로필 URL',
    portfolio_url   VARCHAR(255) COMMENT '포트폴리오 URL',
    linkedin_url    VARCHAR(255) COMMENT 'LinkedIn 프로필 URL',
    created_at      DATETIME                                     DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME                                     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;

-- CEO 정보 테이블
CREATE TABLE ceo_profiles
(
    member_id                    BIGINT PRIMARY KEY,
    points                       INT      DEFAULT 1000 COMMENT '카페 광고용 포인트',
    business_registration_number VARCHAR(12) UNIQUE,
    business_name                VARCHAR(100) COMMENT '사업체명',
    business_address             VARCHAR(200) COMMENT '사업장 주소',
    created_at                   DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at                   DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;

-- 스킬 테이블
CREATE TABLE skills
(
    id         BIGINT PRIMARY KEY AUTO_INCREMENT,
    name       VARCHAR(50) NOT NULL UNIQUE,
    category   ENUM ('FRONTEND', 'BACKEND', 'MOBILE', 'DEVOPS', 'DATABASE', 'AI_ML', 'DESIGN', 'ETC') DEFAULT 'ETC',
    icon_url   VARCHAR(500) COMMENT '스킬 아이콘 URL',
    is_active  BOOLEAN                                                                                DEFAULT TRUE COMMENT '활성화 여부',
    created_at DATETIME                                                                               DEFAULT CURRENT_TIMESTAMP
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;

-- 직무 테이블
CREATE TABLE jobs
(
    id          BIGINT PRIMARY KEY AUTO_INCREMENT,
    name        VARCHAR(100) NOT NULL UNIQUE,
    category    ENUM ('DEVELOPMENT', 'DESIGN', 'PLANNING', 'MARKETING', 'DATA', 'ETC') DEFAULT 'ETC',
    description TEXT COMMENT '직무 설명',
    is_active   BOOLEAN                                                                DEFAULT TRUE COMMENT '활성화 여부',
    created_at  DATETIME                                                               DEFAULT CURRENT_TIMESTAMP
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;

-- 회원-스킬 매핑 테이블
CREATE TABLE member_skills
(
    id                BIGINT PRIMARY KEY AUTO_INCREMENT,
    member_id         BIGINT NOT NULL,
    skill_id          BIGINT NOT NULL,
    proficiency_level ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT') DEFAULT 'BEGINNER',
    created_at        DATETIME                                                DEFAULT CURRENT_TIMESTAMP,

    UNIQUE KEY uk_member_skills_member_skill (member_id, skill_id)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;

-- 회원-직무 매핑 테이블
CREATE TABLE member_jobs
(
    id         BIGINT PRIMARY KEY AUTO_INCREMENT,
    member_id  BIGINT NOT NULL,
    job_id     BIGINT NOT NULL,
    is_primary BOOLEAN  DEFAULT FALSE COMMENT '주요 직무 여부',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    UNIQUE KEY uk_member_jobs_member_job (member_id, job_id)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;

-- 카페 테이블 (소프트 삭제 추가)
CREATE TABLE cafes
(
    id               BIGINT PRIMARY KEY AUTO_INCREMENT,
    name             VARCHAR(100) NOT NULL,
    business_number  VARCHAR(12)  NOT NULL UNIQUE,
    address          VARCHAR(200) NOT NULL,
    detailed_address VARCHAR(100) COMMENT '상세 주소',
    latitude         DECIMAL(10, 8) COMMENT '위도',
    longitude        DECIMAL(11, 8) COMMENT '경도',
    phone_number     VARCHAR(20),
    email            VARCHAR(100),
    website_url      VARCHAR(255) COMMENT '웹사이트 URL',
    open_time        TIME,
    close_time       TIME,
    holiday_info     VARCHAR(200) COMMENT '휴무일 정보',
    description      TEXT,
    facilities       JSON COMMENT '시설 정보 (WiFi, 콘센트, 프린터 등)',
    main_image_url   VARCHAR(500),
    view_count       INT      DEFAULT 0 COMMENT '조회수',
    like_count       INT      DEFAULT 0 COMMENT '좋아요 수',
    is_active        BOOLEAN  DEFAULT TRUE,
    deleted_at       DATETIME COMMENT '소프트 삭제일',
    created_at       DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at       DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    owner_id         BIGINT       NOT NULL
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;

-- 카페 이미지 테이블 (다중 이미지 지원)
CREATE TABLE cafe_images
(
    id         BIGINT PRIMARY KEY AUTO_INCREMENT,
    cafe_id    BIGINT       NOT NULL,
    image_url  VARCHAR(500) NOT NULL,
    image_type ENUM ('MAIN', 'INTERIOR', 'MENU', 'EXTERIOR') DEFAULT 'INTERIOR',
    sort_order INT                                           DEFAULT 0 COMMENT '이미지 순서',
    created_at DATETIME                                      DEFAULT CURRENT_TIMESTAMP
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;

-- 스터디 테이블 (소프트 삭제 및 기능 확장)
CREATE TABLE studies
(
    id                   BIGINT PRIMARY KEY AUTO_INCREMENT,
    title                VARCHAR(200) NOT NULL,
    content              TEXT,
    curriculum           TEXT,
    study_period         VARCHAR(100),
    location             VARCHAR(100),
    detailed_location    VARCHAR(200) COMMENT '상세 위치',
    meeting_type         ENUM ('OFFLINE', 'ONLINE', 'HYBRID')                      DEFAULT 'OFFLINE',
    thumbnail_image_url  VARCHAR(500),
    report_count         INT                                                       DEFAULT 0,
    view_count           INT                                                       DEFAULT 0,
    like_count           INT                                                       DEFAULT 0,
    max_participants     INT                                                       DEFAULT 1,
    current_participants INT                                                       DEFAULT 1,
    deadline_date        DATE         NOT NULL,
    start_date           DATE COMMENT '스터디 시작일',
    end_date             DATE COMMENT '스터디 종료일',
    meeting_days         VARCHAR(20) COMMENT '모임 요일 (예: 월,수,금)',
    meeting_time         TIME COMMENT '모임 시간',
    difficulty_level     ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED')             DEFAULT 'BEGINNER',
    status               ENUM ('RECRUITING', 'CLOSED', 'IN_PROGRESS', 'COMPLETED') DEFAULT 'RECRUITING',
    is_blocked           BOOLEAN                                                   DEFAULT FALSE,
    blocked_reason       VARCHAR(500) COMMENT '차단 사유',
    blocked_at           DATETIME COMMENT '차단일',
    blocked_by           BIGINT COMMENT '차단 처리한 관리자 ID',
    deleted_at           DATETIME COMMENT '소프트 삭제일',
    created_at           DATETIME                                                  DEFAULT CURRENT_TIMESTAMP,
    updated_at           DATETIME                                                  DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    member_id            BIGINT       NOT NULL
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;

-- 스터디-스킬 매핑 테이블
CREATE TABLE study_skills
(
    id             BIGINT PRIMARY KEY AUTO_INCREMENT,
    study_id       BIGINT NOT NULL,
    skill_id       BIGINT NOT NULL,
    required_level ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT') DEFAULT 'BEGINNER',
    created_at     DATETIME                                                DEFAULT CURRENT_TIMESTAMP,

    UNIQUE KEY uk_study_skills_study_skill (study_id, skill_id)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;

-- 스터디 멤버 테이블
CREATE TABLE study_members
(
    id        BIGINT PRIMARY KEY AUTO_INCREMENT,
    study_id  BIGINT NOT NULL,
    member_id BIGINT NOT NULL,
    role      ENUM ('LEADER', 'MEMBER') DEFAULT 'MEMBER',
    joined_at DATETIME                  DEFAULT CURRENT_TIMESTAMP,
    left_at   DATETIME COMMENT '탈퇴일',

    UNIQUE KEY uk_study_members_study_member (study_id, member_id)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;

-- 댓글 테이블 (소프트 삭제 추가)
CREATE TABLE replies
(
    id             BIGINT PRIMARY KEY AUTO_INCREMENT,
    content        TEXT   NOT NULL,
    is_blocked     BOOLEAN  DEFAULT FALSE,
    blocked_reason VARCHAR(500) COMMENT '차단 사유',
    blocked_at     DATETIME COMMENT '차단일',
    blocked_by     BIGINT COMMENT '차단 처리한 관리자 ID',
    report_count   INT      DEFAULT 0,
    like_count     INT      DEFAULT 0,
    deleted_at     DATETIME COMMENT '소프트 삭제일',
    created_at     DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at     DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    member_id      BIGINT NOT NULL,
    study_id       BIGINT NOT NULL
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;

-- 스터디 스크랩 테이블
CREATE TABLE study_scraps
(
    id         BIGINT PRIMARY KEY AUTO_INCREMENT,
    member_id  BIGINT NOT NULL,
    study_id   BIGINT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    UNIQUE KEY uk_study_scraps_member_study (member_id, study_id)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;

-- 스터디 지원 테이블 (기능 확장)
CREATE TABLE study_applications
(
    id               BIGINT PRIMARY KEY AUTO_INCREMENT,
    introduction     TEXT   NOT NULL,
    motivation       TEXT   NOT NULL,
    experience       TEXT COMMENT '관련 경험',
    available_time   VARCHAR(200) COMMENT '참여 가능 시간',
    status           ENUM ('PENDING', 'APPROVED', 'REJECTED') DEFAULT 'PENDING',
    rejection_reason VARCHAR(500) COMMENT '거절 사유',
    processed_at     DATETIME COMMENT '처리일',
    processed_by     BIGINT COMMENT '처리한 사용자 ID',
    created_at       DATETIME                                 DEFAULT CURRENT_TIMESTAMP,
    updated_at       DATETIME                                 DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    member_id        BIGINT NOT NULL,
    study_id         BIGINT NOT NULL,

    UNIQUE KEY uk_study_applications_member_study (member_id, study_id)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;

-- 카페 스크랩 테이블
CREATE TABLE cafe_scraps
(
    id         BIGINT PRIMARY KEY AUTO_INCREMENT,
    member_id  BIGINT NOT NULL,
    cafe_id    BIGINT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    UNIQUE KEY uk_cafe_scraps_member_cafe (member_id, cafe_id)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;

-- 신고 테이블 (새로 추가)
CREATE TABLE reports
(
    id                   BIGINT PRIMARY KEY AUTO_INCREMENT,
    reporter_id          BIGINT                                                                                NOT NULL COMMENT '신고자 ID',
    reported_entity_type ENUM ('MEMBER', 'STUDY', 'CAFE', 'REPLY')                                             NOT NULL,
    reported_entity_id   BIGINT                                                                                NOT NULL COMMENT '신고 대상 ID',
    reason               ENUM ('SPAM', 'INAPPROPRIATE_CONTENT', 'HARASSMENT', 'FAKE_INFO', 'COPYRIGHT', 'ETC') NOT NULL,
    description          TEXT COMMENT '신고 상세 내용',
    status               ENUM ('PENDING', 'REVIEWED', 'DISMISSED', 'ACTIONED') DEFAULT 'PENDING',
    reviewed_at          DATETIME COMMENT '검토일',
    reviewed_by          BIGINT COMMENT '검토한 관리자 ID',
    action_taken         VARCHAR(500) COMMENT '조치 내용',
    created_at           DATETIME                                              DEFAULT CURRENT_TIMESTAMP,
    updated_at           DATETIME                                              DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    UNIQUE KEY uk_reports_reporter_entity (reporter_id, reported_entity_type, reported_entity_id)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;

-- 관리자 액션 로그 테이블 (새로 추가)
CREATE TABLE admin_action_logs
(
    id          BIGINT PRIMARY KEY AUTO_INCREMENT,
    admin_id    BIGINT                                                                     NOT NULL COMMENT '관리자 ID',
    action_type ENUM ('BLOCK_MEMBER', 'UNBLOCK_MEMBER', 'BLOCK_CONTENT', 'UNBLOCK_CONTENT',
        'DELETE_CONTENT', 'RESTORE_CONTENT', 'PROCESS_REPORT', 'CREATE_FAQ', 'UPDATE_FAQ') NOT NULL,
    target_type ENUM ('MEMBER', 'STUDY', 'CAFE', 'REPLY', 'REPORT', 'FAQ')                 NOT NULL,
    target_id   BIGINT                                                                     NOT NULL COMMENT '대상 ID',
    reason      VARCHAR(500) COMMENT '조치 사유',
    before_data JSON COMMENT '변경 전 데이터',
    after_data  JSON COMMENT '변경 후 데이터',
    ip_address  VARCHAR(45) COMMENT '관리자 IP',
    user_agent  VARCHAR(500) COMMENT '사용자 에이전트',
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;

-- 메시지 테이블
CREATE TABLE messages
(
    id                  BIGINT PRIMARY KEY AUTO_INCREMENT,
    content             TEXT   NOT NULL,
    message_type        ENUM ('TEXT', 'IMAGE', 'FILE') DEFAULT 'TEXT',
    is_read             BOOLEAN                        DEFAULT FALSE,
    deleted_by_sender   BOOLEAN                        DEFAULT FALSE,
    deleted_by_receiver BOOLEAN                        DEFAULT FALSE,
    created_at          DATETIME                       DEFAULT CURRENT_TIMESTAMP,
    sender_id           BIGINT NOT NULL,
    receiver_id         BIGINT NOT NULL,
    study_id            BIGINT COMMENT '스터디 관련 메시지인 경우'
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;

-- 알림 테이블 (확장)
CREATE TABLE notifications
(
    id         BIGINT PRIMARY KEY AUTO_INCREMENT,
    title      VARCHAR(200)                                                               NOT NULL,
    content    TEXT                                                                       NOT NULL,
    type       ENUM ('STUDY_APPLICATION', 'STUDY_APPROVAL', 'STUDY_REJECTION', 'STUDY_MEMBER_JOIN',
        'STUDY_MEMBER_LEAVE', 'MESSAGE', 'SYSTEM', 'REPORT_PROCESSED', 'ACCOUNT_BLOCKED') NOT NULL,
    is_read    BOOLEAN  DEFAULT FALSE,
    link_url   VARCHAR(500) COMMENT '알림 클릭 시 이동할 URL',
    expires_at DATETIME COMMENT '알림 만료일',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    member_id  BIGINT                                                                     NOT NULL,
    related_id BIGINT COMMENT '관련 엔티티 ID (스터디, 메시지 등)'
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;

-- 첨부파일 테이블 (확장)
CREATE TABLE attachments
(
    id             BIGINT PRIMARY KEY AUTO_INCREMENT,
    original_name  VARCHAR(255)                                         NOT NULL,
    stored_name    VARCHAR(100)                                         NOT NULL UNIQUE,
    file_path      VARCHAR(500)                                         NOT NULL,
    file_size      BIGINT                                               NOT NULL,
    content_type   VARCHAR(100),
    entity_type    ENUM ('STUDY', 'CAFE', 'REPLY', 'MESSAGE', 'MEMBER') NOT NULL,
    entity_id      BIGINT                                               NOT NULL,
    uploaded_by    BIGINT                                               NOT NULL COMMENT '업로드한 사용자 ID',
    is_public      BOOLEAN  DEFAULT TRUE COMMENT '공개 여부',
    download_count INT      DEFAULT 0 COMMENT '다운로드 횟수',
    created_at     DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;
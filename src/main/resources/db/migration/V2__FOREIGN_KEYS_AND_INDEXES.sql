-- V3__FOREIGN_KEYS_AND_INDEXES.sql
-- 외래키 제약조건 및 인덱스 생성

-- =========================================
-- 1. 외래키 제약 조건
-- =========================================

-- 일반회원 프로필 외래키
ALTER TABLE general_profiles
    ADD CONSTRAINT fk_general_profiles_member
        FOREIGN KEY (member_id) REFERENCES members (id) ON DELETE CASCADE;

-- CEO 프로필 외래키
ALTER TABLE ceo_profiles
    ADD CONSTRAINT fk_ceo_profiles_member
        FOREIGN KEY (member_id) REFERENCES members (id) ON DELETE CASCADE;

-- 회원-스킬 매핑 외래키
ALTER TABLE member_skills
    ADD CONSTRAINT fk_member_skills_member
        FOREIGN KEY (member_id) REFERENCES members (id) ON DELETE CASCADE;
ALTER TABLE member_skills
    ADD CONSTRAINT fk_member_skills_skill
        FOREIGN KEY (skill_id) REFERENCES skills (id) ON DELETE CASCADE;

-- 회원-직무 매핑 외래키
ALTER TABLE member_jobs
    ADD CONSTRAINT fk_member_jobs_member
        FOREIGN KEY (member_id) REFERENCES members (id) ON DELETE CASCADE;
ALTER TABLE member_jobs
    ADD CONSTRAINT fk_member_jobs_job
        FOREIGN KEY (job_id) REFERENCES jobs (id) ON DELETE CASCADE;

-- 카페 외래키
ALTER TABLE cafes
    ADD CONSTRAINT fk_cafes_owner
        FOREIGN KEY (owner_id) REFERENCES ceo_profiles (member_id) ON DELETE CASCADE;

-- 카페 이미지 외래키
ALTER TABLE cafe_images
    ADD CONSTRAINT fk_cafe_images_cafe
        FOREIGN KEY (cafe_id) REFERENCES cafes (id) ON DELETE CASCADE;

-- 스터디 외래키
ALTER TABLE studies
    ADD CONSTRAINT fk_studies_member
        FOREIGN KEY (member_id) REFERENCES members (id) ON DELETE CASCADE;
ALTER TABLE studies
    ADD CONSTRAINT fk_studies_blocked_by
        FOREIGN KEY (blocked_by) REFERENCES members (id) ON DELETE SET NULL;

-- 스터디-스킬 매핑 외래키
ALTER TABLE study_skills
    ADD CONSTRAINT fk_study_skills_study
        FOREIGN KEY (study_id) REFERENCES studies (id) ON DELETE CASCADE;
ALTER TABLE study_skills
    ADD CONSTRAINT fk_study_skills_skill
        FOREIGN KEY (skill_id) REFERENCES skills (id) ON DELETE CASCADE;

-- 스터디 멤버 외래키
ALTER TABLE study_members
    ADD CONSTRAINT fk_study_members_study
        FOREIGN KEY (study_id) REFERENCES studies (id) ON DELETE CASCADE;
ALTER TABLE study_members
    ADD CONSTRAINT fk_study_members_member
        FOREIGN KEY (member_id) REFERENCES members (id) ON DELETE CASCADE;

-- 댓글 외래키
ALTER TABLE replies
    ADD CONSTRAINT fk_replies_member
        FOREIGN KEY (member_id) REFERENCES members (id) ON DELETE CASCADE;
ALTER TABLE replies
    ADD CONSTRAINT fk_replies_study
        FOREIGN KEY (study_id) REFERENCES studies (id) ON DELETE CASCADE;
ALTER TABLE replies
    ADD CONSTRAINT fk_replies_blocked_by
        FOREIGN KEY (blocked_by) REFERENCES members (id) ON DELETE SET NULL;

-- 스터디 스크랩 외래키
ALTER TABLE study_scraps
    ADD CONSTRAINT fk_study_scraps_member
        FOREIGN KEY (member_id) REFERENCES members (id) ON DELETE CASCADE;
ALTER TABLE study_scraps
    ADD CONSTRAINT fk_study_scraps_study
        FOREIGN KEY (study_id) REFERENCES studies (id) ON DELETE CASCADE;

-- 스터디 지원 외래키
ALTER TABLE study_applications
    ADD CONSTRAINT fk_study_applications_member
        FOREIGN KEY (member_id) REFERENCES members (id) ON DELETE CASCADE;
ALTER TABLE study_applications
    ADD CONSTRAINT fk_study_applications_study
        FOREIGN KEY (study_id) REFERENCES studies (id) ON DELETE CASCADE;
ALTER TABLE study_applications
    ADD CONSTRAINT fk_study_applications_processed_by
        FOREIGN KEY (processed_by) REFERENCES members (id) ON DELETE SET NULL;

-- 카페 스크랩 외래키
ALTER TABLE cafe_scraps
    ADD CONSTRAINT fk_cafe_scraps_member
        FOREIGN KEY (member_id) REFERENCES members (id) ON DELETE CASCADE;
ALTER TABLE cafe_scraps
    ADD CONSTRAINT fk_cafe_scraps_cafe
        FOREIGN KEY (cafe_id) REFERENCES cafes (id) ON DELETE CASCADE;

-- 신고 외래키
ALTER TABLE reports
    ADD CONSTRAINT fk_reports_reporter
        FOREIGN KEY (reporter_id) REFERENCES members (id) ON DELETE CASCADE;
ALTER TABLE reports
    ADD CONSTRAINT fk_reports_reviewed_by
        FOREIGN KEY (reviewed_by) REFERENCES members (id) ON DELETE SET NULL;

-- 관리자 액션 로그 외래키
ALTER TABLE admin_action_logs
    ADD CONSTRAINT fk_admin_action_logs_admin
        FOREIGN KEY (admin_id) REFERENCES members (id) ON DELETE CASCADE;

-- 메시지 외래키
ALTER TABLE messages
    ADD CONSTRAINT fk_messages_sender
        FOREIGN KEY (sender_id) REFERENCES members (id) ON DELETE CASCADE;
ALTER TABLE messages
    ADD CONSTRAINT fk_messages_receiver
        FOREIGN KEY (receiver_id) REFERENCES members (id) ON DELETE CASCADE;
ALTER TABLE messages
    ADD CONSTRAINT fk_messages_study
        FOREIGN KEY (study_id) REFERENCES studies (id) ON DELETE SET NULL;

-- 알림 외래키
ALTER TABLE notifications
    ADD CONSTRAINT fk_notifications_member
        FOREIGN KEY (member_id) REFERENCES members (id) ON DELETE CASCADE;

-- 첨부파일 외래키
ALTER TABLE attachments
    ADD CONSTRAINT fk_attachments_uploaded_by
        FOREIGN KEY (uploaded_by) REFERENCES members (id) ON DELETE CASCADE;

-- =========================================
-- 2. 기본 인덱스 생성 (성능 최적화)
-- =========================================

-- 회원 테이블 인덱스
CREATE INDEX idx_members_role ON members (role);
CREATE INDEX idx_members_is_blocked ON members (is_blocked);
CREATE INDEX idx_members_email_verified ON members (email_verified);
CREATE INDEX idx_members_phone_verified ON members (phone_verified);
CREATE INDEX idx_members_deleted_at ON members (deleted_at);
CREATE INDEX idx_members_created_at ON members (created_at);
CREATE INDEX idx_members_last_login ON members (last_login_at);
CREATE INDEX idx_members_blocked_until ON members (blocked_until);

-- 스킬 테이블 인덱스
CREATE INDEX idx_skills_category ON skills (category);
CREATE INDEX idx_skills_is_active ON skills (is_active);

-- 직무 테이블 인덱스
CREATE INDEX idx_jobs_category ON jobs (category);
CREATE INDEX idx_jobs_is_active ON jobs (is_active);

-- 회원-스킬 매핑 인덱스
CREATE INDEX idx_member_skills_member_id ON member_skills (member_id);
CREATE INDEX idx_member_skills_skill_id ON member_skills (skill_id);
CREATE INDEX idx_member_skills_proficiency ON member_skills (proficiency_level);

-- 회원-직무 매핑 인덱스
CREATE INDEX idx_member_jobs_member_id ON member_jobs (member_id);
CREATE INDEX idx_member_jobs_job_id ON member_jobs (job_id);
CREATE INDEX idx_member_jobs_is_primary ON member_jobs (is_primary);

-- 카페 테이블 인덱스
CREATE INDEX idx_cafes_owner_id ON cafes (owner_id);
CREATE INDEX idx_cafes_address ON cafes (address);
CREATE INDEX idx_cafes_is_active ON cafes (is_active);
CREATE INDEX idx_cafes_deleted_at ON cafes (deleted_at);
CREATE INDEX idx_cafes_location ON cafes (latitude, longitude);
CREATE INDEX idx_cafes_view_count ON cafes (view_count DESC);
CREATE INDEX idx_cafes_like_count ON cafes (like_count DESC);
CREATE INDEX idx_cafes_created_at ON cafes (created_at DESC);

-- 카페 이미지 인덱스
CREATE INDEX idx_cafe_images_cafe_id ON cafe_images (cafe_id);
CREATE INDEX idx_cafe_images_type ON cafe_images (image_type);
CREATE INDEX idx_cafe_images_sort ON cafe_images (cafe_id, sort_order);

-- 스터디 테이블 인덱스 (검색 성능 최적화)
CREATE INDEX idx_studies_member_id ON studies (member_id);
CREATE INDEX idx_studies_status ON studies (status);
CREATE INDEX idx_studies_location ON studies (location);
CREATE INDEX idx_studies_meeting_type ON studies (meeting_type);
CREATE INDEX idx_studies_difficulty ON studies (difficulty_level);
CREATE INDEX idx_studies_is_blocked ON studies (is_blocked);
CREATE INDEX idx_studies_deleted_at ON studies (deleted_at);
CREATE INDEX idx_studies_created_at ON studies (created_at DESC);
CREATE INDEX idx_studies_view_count ON studies (view_count DESC);
CREATE INDEX idx_studies_like_count ON studies (like_count DESC);

-- 스터디-스킬 매핑 인덱스
CREATE INDEX idx_study_skills_study_id ON study_skills (study_id);
CREATE INDEX idx_study_skills_skill_id ON study_skills (skill_id);
CREATE INDEX idx_study_skills_required_level ON study_skills (required_level);

-- 스터디 멤버 인덱스
CREATE INDEX idx_study_members_study_id ON study_members (study_id);
CREATE INDEX idx_study_members_member_id ON study_members (member_id);
CREATE INDEX idx_study_members_role ON study_members (role);
CREATE INDEX idx_study_members_joined_at ON study_members (joined_at);

-- 댓글 테이블 인덱스
CREATE INDEX idx_replies_member_id ON replies (member_id);
CREATE INDEX idx_replies_study_id ON replies (study_id);
CREATE INDEX idx_replies_is_blocked ON replies (is_blocked);
CREATE INDEX idx_replies_deleted_at ON replies (deleted_at);
CREATE INDEX idx_replies_created_at ON replies (created_at DESC);

-- 스터디 스크랩 인덱스
CREATE INDEX idx_study_scraps_member_id ON study_scraps (member_id);
CREATE INDEX idx_study_scraps_study_id ON study_scraps (study_id);
CREATE INDEX idx_study_scraps_created_at ON study_scraps (created_at DESC);

-- 스터디 지원 인덱스
CREATE INDEX idx_study_applications_member_id ON study_applications (member_id);
CREATE INDEX idx_study_applications_study_id ON study_applications (study_id);
CREATE INDEX idx_study_applications_status ON study_applications (status);
CREATE INDEX idx_study_applications_created_at ON study_applications (created_at DESC);
CREATE INDEX idx_study_applications_processed_at ON study_applications (processed_at);

-- 카페 스크랩 인덱스
CREATE INDEX idx_cafe_scraps_member_id ON cafe_scraps (member_id);
CREATE INDEX idx_cafe_scraps_cafe_id ON cafe_scraps (cafe_id);
CREATE INDEX idx_cafe_scraps_created_at ON cafe_scraps (created_at DESC);

-- 신고 테이블 인덱스
CREATE INDEX idx_reports_reporter_id ON reports (reporter_id);
CREATE INDEX idx_reports_entity ON reports (reported_entity_type, reported_entity_id);
CREATE INDEX idx_reports_status ON reports (status);
CREATE INDEX idx_reports_reason ON reports (reason);
CREATE INDEX idx_reports_created_at ON reports (created_at DESC);
CREATE INDEX idx_reports_reviewed_at ON reports (reviewed_at);

-- 관리자 액션 로그 인덱스
CREATE INDEX idx_admin_action_logs_admin_id ON admin_action_logs (admin_id);
CREATE INDEX idx_admin_action_logs_action_type ON admin_action_logs (action_type);
CREATE INDEX idx_admin_action_logs_target ON admin_action_logs (target_type, target_id);
CREATE INDEX idx_admin_action_logs_created_at ON admin_action_logs (created_at DESC);

-- 메시지 테이블 인덱스
CREATE INDEX idx_messages_sender ON messages (sender_id);
CREATE INDEX idx_messages_receiver ON messages (receiver_id);
CREATE INDEX idx_messages_study_id ON messages (study_id);
CREATE INDEX idx_messages_is_read ON messages (is_read);
CREATE INDEX idx_messages_created_at ON messages (created_at DESC);
CREATE INDEX idx_messages_conversation ON messages (sender_id, receiver_id, created_at DESC);

-- 알림 테이블 인덱스
CREATE INDEX idx_notifications_member_id ON notifications (member_id);
CREATE INDEX idx_notifications_type ON notifications (type);
CREATE INDEX idx_notifications_is_read ON notifications (is_read);
CREATE INDEX idx_notifications_created_at ON notifications (created_at DESC);
CREATE INDEX idx_notifications_expires_at ON notifications (expires_at);
CREATE INDEX idx_notifications_member_unread ON notifications (member_id, is_read, created_at DESC);

-- 첨부파일 테이블 인덱스
CREATE INDEX idx_attachments_entity ON attachments (entity_type, entity_id);
CREATE INDEX idx_attachments_uploaded_by ON attachments (uploaded_by);
CREATE INDEX idx_attachments_is_public ON attachments (is_public);
CREATE INDEX idx_attachments_created_at ON attachments (created_at DESC);
CREATE INDEX idx_attachments_content_type ON attachments (content_type);

-- =========================================
-- 3. 복합 인덱스 (조합 검색 최적화)
-- =========================================

-- 스터디 검색용 복합 인덱스
CREATE INDEX idx_studies_search_status ON studies (status, deleted_at, deadline_date);
CREATE INDEX idx_studies_search_location ON studies (location, status, deleted_at);
CREATE INDEX idx_studies_search_difficulty ON studies (difficulty_level, status, deleted_at);
CREATE INDEX idx_studies_search_meeting ON studies (meeting_type, status, deleted_at);

-- 회원 관리용 복합 인덱스
CREATE INDEX idx_members_admin_search ON members (role, is_blocked, deleted_at);
CREATE INDEX idx_members_active ON members (deleted_at, is_blocked, email_verified);

-- 카페 검색용 복합 인덱스
CREATE INDEX idx_cafes_search_location ON cafes (address, is_active, deleted_at);
CREATE INDEX idx_cafes_search_active ON cafes (is_active, deleted_at, created_at DESC);

-- 신고 관리용 복합 인덱스
CREATE INDEX idx_reports_admin ON reports (status, reported_entity_type, created_at DESC);
CREATE INDEX idx_reports_pending ON reports (status, created_at DESC);

-- 스터디 지원 상태별 복합 인덱스
CREATE INDEX idx_applications_pending ON study_applications (study_id, status, created_at DESC);
CREATE INDEX idx_applications_member_status ON study_applications (member_id, status, created_at DESC);

-- 스터디 멤버 활성 상태 복합 인덱스
CREATE INDEX idx_study_members_active ON study_members (study_id, left_at, joined_at);

-- 댓글 계층 구조 복합 인덱스
CREATE INDEX idx_replies_active ON replies (study_id, is_blocked, created_at DESC, deleted_at);

-- =========================================
-- 4. 유니크 인덱스 (중복 방지)
-- =========================================

-- 스터디 지원 중복 방지 유니크 인덱스
CREATE UNIQUE INDEX uk_study_applications ON study_applications (study_id, member_id);


-- V3__INIT_DATA.sql
-- 초기 데이터 삽입

-- =========================================
-- 1. 기본 스킬 데이터
-- =========================================

INSERT INTO skills (name, category, icon_url)
VALUES
-- Frontend
('JavaScript', 'FRONTEND', '/icons/javascript.svg'),
('TypeScript', 'FRONTEND', '/icons/typescript.svg'),
('React', 'FRONTEND', '/icons/react.svg'),
('Vue.js', 'FRONTEND', '/icons/vue.svg'),
('Angular', 'FRONTEND', '/icons/angular.svg'),
('HTML/CSS', 'FRONTEND', '/icons/html.svg'),
('Sass/SCSS', 'FRONTEND', '/icons/sass.svg'),
('Tailwind CSS', 'FRONTEND', '/icons/tailwind.svg'),

-- Backend
('Java', 'BACKEND', '/icons/java.svg'),
('Spring Boot', 'BACKEND', '/icons/spring.svg'),
('Python', 'BACKEND', '/icons/python.svg'),
('Django', 'BACKEND', '/icons/django.svg'),
('Flask', 'BACKEND', '/icons/flask.svg'),
('Node.js', 'BACKEND', '/icons/nodejs.svg'),
('Express.js', 'BACKEND', '/icons/express.svg'),
('PHP', 'BACKEND', '/icons/php.svg'),
('Laravel', 'BACKEND', '/icons/laravel.svg'),
('C#', 'BACKEND', '/icons/csharp.svg'),
('.NET', 'BACKEND', '/icons/dotnet.svg'),
('Go', 'BACKEND', '/icons/go.svg'),
('Rust', 'BACKEND', '/icons/rust.svg'),

-- Mobile
('React Native', 'MOBILE', '/icons/react-native.svg'),
('Flutter', 'MOBILE', '/icons/flutter.svg'),
('Swift', 'MOBILE', '/icons/swift.svg'),
('Kotlin', 'MOBILE', '/icons/kotlin.svg'),
('Java (Android)', 'MOBILE', '/icons/android.svg'),
('Ionic', 'MOBILE', '/icons/ionic.svg'),

-- DevOps
('Docker', 'DEVOPS', '/icons/docker.svg'),
('Kubernetes', 'DEVOPS', '/icons/kubernetes.svg'),
('Jenkins', 'DEVOPS', '/icons/jenkins.svg'),
('GitHub Actions', 'DEVOPS', '/icons/github-actions.svg'),
('AWS', 'DEVOPS', '/icons/aws.svg'),
('Azure', 'DEVOPS', '/icons/azure.svg'),
('GCP', 'DEVOPS', '/icons/gcp.svg'),
('Terraform', 'DEVOPS', '/icons/terraform.svg'),
('Ansible', 'DEVOPS', '/icons/ansible.svg'),

-- Database
('MySQL', 'DATABASE', '/icons/mysql.svg'),
('PostgreSQL', 'DATABASE', '/icons/postgresql.svg'),
('MongoDB', 'DATABASE', '/icons/mongodb.svg'),
('Redis', 'DATABASE', '/icons/redis.svg'),
('Oracle', 'DATABASE', '/icons/oracle.svg'),
('SQLite', 'DATABASE', '/icons/sqlite.svg'),
('MariaDB', 'DATABASE', '/icons/mariadb.svg'),
('Elasticsearch', 'DATABASE', '/icons/elasticsearch.svg'),

-- AI/ML
('Python (ML)', 'AI_ML', '/icons/python-ml.svg'),
('TensorFlow', 'AI_ML', '/icons/tensorflow.svg'),
('PyTorch', 'AI_ML', '/icons/pytorch.svg'),
('Scikit-learn', 'AI_ML', '/icons/sklearn.svg'),
('Pandas', 'AI_ML', '/icons/pandas.svg'),
('NumPy', 'AI_ML', '/icons/numpy.svg'),
('Jupyter', 'AI_ML', '/icons/jupyter.svg'),
('R', 'AI_ML', '/icons/r.svg'),

-- Design
('Figma', 'DESIGN', '/icons/figma.svg'),
('Adobe XD', 'DESIGN', '/icons/adobe-xd.svg'),
('Sketch', 'DESIGN', '/icons/sketch.svg'),
('Photoshop', 'DESIGN', '/icons/photoshop.svg'),
('Illustrator', 'DESIGN', '/icons/illustrator.svg'),
('Zeplin', 'DESIGN', '/icons/zeplin.svg'),

-- ETC
('Git', 'ETC', '/icons/git.svg'),
('Linux', 'ETC', '/icons/linux.svg'),
('Jira', 'ETC', '/icons/jira.svg'),
('Slack', 'ETC', '/icons/slack.svg'),
('Notion', 'ETC', '/icons/notion.svg');

-- =========================================
-- 2. 기본 직무 데이터
-- =========================================

INSERT INTO jobs (name, category, description)
VALUES
-- Development
('프론트엔드 개발자', 'DEVELOPMENT', '사용자 인터페이스 및 사용자 경험을 구현하는 개발자'),
('백엔드 개발자', 'DEVELOPMENT', '서버사이드 로직 및 데이터베이스를 담당하는 개발자'),
('풀스택 개발자', 'DEVELOPMENT', '프론트엔드와 백엔드 모두를 담당하는 개발자'),
('모바일 앱 개발자', 'DEVELOPMENT', '모바일 애플리케이션을 개발하는 개발자'),
('DevOps 엔지니어', 'DEVELOPMENT', '개발과 운영을 연결하는 인프라 및 배포 전문가'),
('데이터베이스 관리자', 'DEVELOPMENT', '데이터베이스 설계, 관리, 최적화 전문가'),
('시스템 아키텍트', 'DEVELOPMENT', '시스템 전체 구조를 설계하는 전문가'),

-- Design
('UI/UX 디자이너', 'DESIGN', '사용자 인터페이스 및 사용자 경험을 디자인하는 전문가'),
('웹 디자이너', 'DESIGN', '웹사이트의 시각적 디자인을 담당하는 전문가'),
('그래픽 디자이너', 'DESIGN', '브랜딩 및 시각적 콘텐츠를 제작하는 전문가'),
('프로덕트 디자이너', 'DESIGN', '제품의 전체적인 디자인 경험을 담당하는 전문가'),

-- Planning
('기획자', 'PLANNING', '서비스 기획 및 전략을 수립하는 전문가'),
('프로덕트 매니저', 'PLANNING', '제품 개발 전 과정을 관리하는 전문가'),
('프로젝트 매니저', 'PLANNING', '프로젝트 진행을 관리하고 조율하는 전문가'),
('비즈니스 애널리스트', 'PLANNING', '비즈니스 요구사항을 분석하는 전문가'),

-- Marketing
('디지털 마케터', 'MARKETING', '온라인 마케팅 전략을 수립하고 실행하는 전문가'),
('콘텐츠 마케터', 'MARKETING', '콘텐츠 제작 및 마케팅을 담당하는 전문가'),
('퍼포먼스 마케터', 'MARKETING', '성과 기반 마케팅을 담당하는 전문가'),
('브랜드 매니저', 'MARKETING', '브랜드 전략 및 관리를 담당하는 전문가'),

-- Data
('데이터 분석가', 'DATA', '데이터를 분석하여 인사이트를 도출하는 전문가'),
('데이터 사이언티스트', 'DATA', '머신러닝 및 통계를 활용한 데이터 분석 전문가'),
('머신러닝 엔지니어', 'DATA', '머신러닝 모델을 개발하고 운영하는 전문가'),
('빅데이터 엔지니어', 'DATA', '대용량 데이터 처리 시스템을 구축하는 전문가'),

-- ETC
('QA 엔지니어', 'ETC', '소프트웨어 품질 보증을 담당하는 전문가'),
('기술 작가', 'ETC', '기술 문서 작성을 전문으로 하는 전문가'),
('보안 전문가', 'ETC', '정보보안을 담당하는 전문가'),
('스크럼 마스터', 'ETC', '애자일 개발 프로세스를 관리하는 전문가');

-- =========================================
-- 3. 기본 관리자 계정
-- =========================================

INSERT INTO members (name, nickname, email, password, role, email_verified, phone_verified)
VALUES ('시스템관리자', 'admin', 'admin@osca.kr',
        '$2a$10$N.zmdr9k7uOkXfIgKYZZiOSz0OBzOykQILJr5lVQ.CZ/DOCg8KG2S', 'ADMIN', TRUE, TRUE);

-- 관리자 프로필은 일반 회원 프로필로 생성
INSERT INTO general_profiles (member_id, introduction, career_level)
VALUES (1, 'OSCA 플랫폼 시스템 관리자입니다.', 'SENIOR');

-- =========================================
-- 5. 샘플 스터디 데이터 (선택사항)
-- =========================================

-- 샘플 일반 사용자 계정
INSERT INTO members (name, nickname, email, password, email_verified, phone_verified)
VALUES ('김개발', 'developer_kim', 'kim@example.com',
        '$2a$10$N.zmdr9k7uOkXfIgKYZZiOSz0OBzOykQILJr5lVQ.CZ/DOCg8KG2S', TRUE, TRUE),
       ('이스터디', 'study_lee', 'lee@example.com',
        '$2a$10$N.zmdr9k7uOkXfIgKYZZiOSz0OBzOykQILJr5lVQ.CZ/DOCg8KG2S', TRUE, TRUE);

-- 일반 사용자 프로필
INSERT INTO general_profiles (member_id, university, company, introduction, career_level)
VALUES (2, '서울대학교', '네이버', '백엔드 개발에 관심이 많은 주니어 개발자입니다.', 'JUNIOR'),
       (3, '연세대학교', '카카오', '프론트엔드 개발을 공부하고 있는 신입 개발자입니다.', 'FRESHER');

-- 샘플 스터디
INSERT INTO studies (title, content, curriculum, study_period, location, max_participants, deadline_date,
                     member_id, meeting_type, difficulty_level)
VALUES ('Spring Boot 마스터하기',
        'Spring Boot를 활용한 백엔드 개발을 체계적으로 학습하는 스터디입니다. 실제 프로젝트를 만들어보며 실무 경험을 쌓아보세요!',
        '1주차: Spring Boot 기초\n2주차: JPA와 데이터베이스\n3주차: REST API 개발\n4주차: 보안과 인증\n5주차: 테스트 코드 작성\n6주차: 배포와 운영',
        '6주', '강남역', 6, '2025-09-01', 2, 'OFFLINE', 'INTERMEDIATE'),

       ('React 프론트엔드 스터디',
        'React를 처음 배우는 분들을 위한 기초부터 실전까지의 스터디입니다. 함께 토이 프로젝트를 만들어보며 실력을 향상시켜요!',
        '1주차: React 기초 문법\n2주차: 컴포넌트와 Props\n3주차: State와 생명주기\n4주차: Hook 활용하기\n5주차: 상태관리 (Redux)\n6주차: 프로젝트 완성',
        '6주', '홍대입구역', 5, '2025-08-25', 3, 'HYBRID', 'BEGINNER'),

       ('알고리즘 코딩테스트 스터디',
        '취업 준비를 위한 알고리즘 문제 풀이 스터디입니다. 매주 정해진 주제로 문제를 풀고 코드 리뷰를 진행합니다.',
        '1주차: 정렬과 탐색\n2주차: 자료구조 (스택, 큐)\n3주차: 그래프와 트리\n4주차: 동적계획법\n5주차: 그리디 알고리즘\n6주차: 백트래킹',
        '6주', '선릉역', 8, '2025-08-30', 2, 'ONLINE', 'INTERMEDIATE');

-- 스터디-스킬 매핑
INSERT INTO study_skills (study_id, skill_id, required_level)
VALUES (1, 9, 'BEGINNER'),     -- Java
       (1, 10, 'BEGINNER'),    -- Spring Boot
       (1, 37, 'BEGINNER'),    -- MySQL
       (2, 1, 'BEGINNER'),     -- JavaScript
       (2, 3, 'BEGINNER'),     -- React
       (2, 6, 'INTERMEDIATE'), -- HTML/CSS
       (3, 9, 'INTERMEDIATE'), -- Java (알고리즘용)
       (3, 11, 'BEGINNER');
-- Python (알고리즘용)

-- 스터디 멤버 (개설자는 자동으로 리더가 됨)
INSERT INTO study_members (study_id, member_id, role)
VALUES (1, 2, 'LEADER'),
       (2, 3, 'LEADER'),
       (3, 2, 'LEADER');

-- =========================================
-- 6. 샘플 CEO 및 카페 데이터
-- =========================================

-- CEO 사용자 계정
INSERT INTO members (name, nickname, email, password, role, email_verified, phone_verified)
VALUES ('박사장', 'cafe_owner_park', 'park@cafebiz.com',
        '$2a$10$N.zmdr9k7uOkXfIgKYZZiOSz0OBzOykQILJr5lVQ.CZ/DOCg8KG2S', 'CEO', TRUE, TRUE),
       ('최카페', 'cafe_owner_choi', 'choi@mycafe.com',
        '$2a$10$N.zmdr9k7uOkXfIgKYZZiOSz0OBzOykQILJr5lVQ.CZ/DOCg8KG2S', 'CEO', TRUE, TRUE);

-- CEO 프로필
INSERT INTO ceo_profiles (member_id, business_registration_number, business_name, business_address)
VALUES (4, '123-45-67890', '개발자카페', '서울특별시 강남구 테헤란로 123'),
       (5, '987-65-43210', '코딩스페이스', '서울특별시 마포구 월드컵북로 456');

-- 샘플 카페
INSERT INTO cafes (name, business_number, address, detailed_address, phone_number, email, open_time,
                   close_time, description, owner_id, latitude, longitude)
VALUES ('개발자카페 강남점', '123-45-67890', '서울특별시 강남구 테헤란로 123', '2층', '02-1234-5678',
        'gangnam@devcafe.com', '08:00:00', '22:00:00',
        '개발자들을 위한 전용 카페입니다. 무료 와이파이, 콘센트, 화이트보드를 제공하며 조용한 환경에서 코딩과 스터디가 가능합니다.
        개발 관련 도서도 비치되어 있어 언제든 참고하실 수 있습니다.',
        4, 37.4979517, 127.0276189),

       ('코딩스페이스 홍대점', '987-65-43210', '서울특별시 마포구 월드컵북로 456', '지하 1층', '02-9876-5432',
        'hongdae@codingspace.com', '09:00:00', '24:00:00',
        '24시간 운영하는 개발자 전용 공간입니다. 개인 부스와 팀 스터디룸을 제공하며, 고성능 모니터와 키보드를 대여할 수 있습니다.
        야식과 음료 주문도 가능합니다.',
        5, 37.5563016, 126.9215848);

-- 카페 이미지
INSERT INTO cafe_images (cafe_id, image_url, image_type, sort_order)
VALUES (1, '/images/cafes/cafe1_main.jpg', 'MAIN', 1),
       (1, '/images/cafes/cafe1_interior1.jpg', 'INTERIOR', 2),
       (1, '/images/cafes/cafe1_interior2.jpg', 'INTERIOR', 3),
       (2, '/images/cafes/cafe2_main.jpg', 'MAIN', 1),
       (2, '/images/cafes/cafe2_interior1.jpg', 'INTERIOR', 2),
       (2, '/images/cafes/cafe2_booth.jpg', 'INTERIOR', 3);

-- =========================================
-- 7. 샘플 스크랩 데이터
-- =========================================

INSERT INTO study_scraps (member_id, study_id)
VALUES (3, 1), -- 이스터디가 Spring Boot 스터디를 스크랩
       (2, 2); -- 김개발이 React 스터디를 스크랩

INSERT INTO cafe_scraps (member_id, cafe_id)
VALUES (2, 1), -- 김개발이 개발자카페를 스크랩
       (3, 2), -- 이스터디가 코딩스페이스를 스크랩
       (2, 2);
-- 김개발이 코딩스페이스를 스크랩

-- =========================================
-- 8. 샘플 스터디 지원 데이터
-- =========================================

INSERT INTO study_applications (member_id, study_id, introduction, motivation, experience,
                                available_time)
VALUES (3, 1, '안녕하세요! 프론트엔드 개발자 이스터디입니다.',
        '백엔드 지식을 쌓아서 풀스택 개발자가 되고 싶습니다. Spring Boot를 체계적으로 배우고 싶어 지원하게 되었습니다.',
        'Node.js로 간단한 API 개발 경험이 있습니다.', '평일 저녁 7시 이후, 주말 종일 가능'),

       (2, 2, '백엔드 개발자 김개발입니다.',
        '프론트엔드 지식을 익혀서 개발 역량을 넓히고 싶습니다. React를 배워보고 싶어 지원합니다.',
        'HTML, CSS, JavaScript 기초는 알고 있습니다.', '주말 오후 2시 이후 가능');

-- =========================================
-- 9. 샘플 댓글 데이터
-- =========================================

INSERT INTO replies (member_id, study_id, content)
VALUES (3, 1, '좋은 스터디네요! 커리큘럼이 체계적으로 잘 짜여있는 것 같습니다. 혹시 과제나 프로젝트도 있나요?'),
       (2, 2, 'React 입문자에게 정말 좋은 스터디인 것 같아요. 토이 프로젝트는 어떤 것을 만들 예정인가요?');

-- =========================================
-- 10. 샘플 알림 데이터
-- =========================================

INSERT INTO notifications (member_id, title, content, type, link_url)
VALUES (2, '스터디 지원자가 있습니다', '이스터디님이 "Spring Boot 마스터하기" 스터디에 지원했습니다.', 'STUDY_APPLICATION',
        '/study/applicant'),
       (3, '스터디 지원자가 있습니다', '김개발님이 "React 프론트엔드 스터디" 스터디에 지원했습니다.', 'STUDY_APPLICATION',
        '/study/applicant'),
       (1, '시스템 점검 안내', '2025년 8월 12일 오전 2시부터 4시까지 시스템 점검이 예정되어 있습니다.', 'SYSTEM', '/notice');

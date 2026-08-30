-- =========================================================================
-- JHARKHAND PALASHBHASHA 360 DATABASE SCHEMA (SIH26042)
-- Government of Jharkhand - Department of Higher & Technical Education
-- =========================================================================

CREATE TABLE IF NOT EXISTS classroom_vernacular_lessons (
    id SERIAL PRIMARY KEY,
    lesson_id VARCHAR(64) UNIQUE NOT NULL,
    school_name VARCHAR(255) NOT NULL,
    grade_level VARCHAR(64) NOT NULL,
    teacher_name VARCHAR(128) NOT NULL,
    target_language VARCHAR(64) NOT NULL,
    nipun_competency VARCHAR(128) NOT NULL,
    teacher_hindi_prompt TEXT NOT NULL,
    tribal_translated_text TEXT NOT NULL,
    audio_synthesis TEXT NOT NULL,
    measured_latency_sec NUMERIC(4, 2) NOT NULL,
    classroom_response TEXT NOT NULL,
    status VARCHAR(64) DEFAULT 'LESSON_ACTIVE',
    delivered_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS bilingual_worksheets (
    id SERIAL PRIMARY KEY,
    worksheet_code VARCHAR(64) UNIQUE NOT NULL,
    lesson_id VARCHAR(64) REFERENCES classroom_vernacular_lessons(lesson_id),
    language_pair VARCHAR(64) NOT NULL, -- Hindi-Ho, Hindi-Santhali, Hindi-Mundari
    printable_pdf_url TEXT NOT NULL,
    downloads_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

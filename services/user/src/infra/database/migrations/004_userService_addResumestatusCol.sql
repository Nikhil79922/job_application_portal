ALTER TABLE users
ADD COLUMN resume_upload_status file_upload_status DEFAULT 'pending';

UPDATE users SET resume_upload_status='success' WHERE resume IS NOT NULL;
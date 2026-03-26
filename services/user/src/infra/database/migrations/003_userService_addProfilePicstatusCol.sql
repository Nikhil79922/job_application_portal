ALTER TABLE users
ADD COLUMN profile_pic_upload_status file_upload_status DEFAULT 'pending';

UPDATE users SET profile_pic_upload_status='success' WHERE profile_pic IS NOT NULL;
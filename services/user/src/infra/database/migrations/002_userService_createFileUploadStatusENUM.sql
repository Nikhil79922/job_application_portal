DO $$ 
BEGIN 
  IF NOT EXISTS (
    SELECT 1 FROM pg_type WHERE typname = 'file_upload_status'
  ) THEN 
    CREATE TYPE file_upload_status AS ENUM ('pending', 'success', 'fail');
  END IF;
END $$;
-- \c jobtracker;

ALTER TABLE jobs
ADD last_modified TIMESTAMP WITH TIME ZONE;
UPDATE jobs SET last_modified = created_at;
ALTER TABLE jobs ALTER last_modified SET DEFAULT CURRENT_TIMESTAMP;

CREATE OR REPLACE FUNCTION update_last_modified_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.last_modified = now(); 
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER  update_job_last_modified BEFORE
UPDATE ON jobs FOR EACH ROW
EXECUTE PROCEDURE  update_last_modified_column();

CREATE TABLE jobs_status_timelines
(
    id SERIAL PRIMARY KEY,
    status VARCHAR,
    created_at TIMESTAMP
    WITH TIME ZONE,
    job_id INT REFERENCES jobs
    (id) ON
    DELETE
    SET NULL
    );


    INSERT INTO jobs_status_timelines
        (status, created_at, job_id)
    SELECT status, created_at, id
    FROM jobs;


    ALTER TABLE jobs_status_timelines ALTER created_at
    SET
    DEFAULT CURRENT_TIMESTAMP;

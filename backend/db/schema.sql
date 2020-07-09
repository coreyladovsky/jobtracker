
-- DROP DATABASE IF EXISTS jobtracker;
-- CREATE DATABASE jobtracker;

-- \c jobtracker;


DROP TABLE IF EXISTS jobs;
CREATE TABLE jobs
(
    id SERIAL PRIMARY KEY,
    company VARCHAR,
    job_title VARCHAR,
    post_url VARCHAR,
    salary VARCHAR,
    location VARCHAR,
    due_date VARCHAR,
    description VARCHAR,
    status VARCHAR,
    created_at TIMESTAMP
    WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    user_id VARCHAR
    );

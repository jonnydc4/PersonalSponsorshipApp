CREATE TABLE companies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    address TEXT
    -- add other fields as necessary
);

CREATE TABLE influencers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE
    -- add other fields as necessary
);

CREATE TABLE jobs (
    id SERIAL PRIMARY KEY,
    company_id INT REFERENCES companies(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255)    -- New field added here
    -- add other fields as necessary
);

--Map the job to the influencer
CREATE TABLE job_map (
    job_id INT REFERENCES jobs(id) ON DELETE CASCADE,
    influencer_id INT REFERENCES influencers(id) ON DELETE CASCADE,
    PRIMARY KEY (job_id, influencer_id)
    -- add other fields as necessary
);


-- Insert data into companies table
INSERT INTO companies (name, email, address) VALUES ('Apple Inc', 'contact@apple.com', 'Cupertino, CA');
INSERT INTO companies (name, email, address) VALUES ('Google', 'contact@google.com', 'Mountain View, CA');

-- Insert data into influencers table
INSERT INTO influencers (name, email) VALUES ('John Doe', 'john@example.com');
INSERT INTO influencers (name, email) VALUES ('Jane Smith', 'jane@example.com');

-- Insert data into jobs table
INSERT INTO jobs (company_id, title, description, location)
VALUES
(1, 'Marketing', 'Marketing job for a new Apple product', 'New York, NY'),
(2, 'Software Development', 'Develop new features for Google Search', 'Remote');

-- Insert data into job_map table
INSERT INTO job_map (job_id, influencer_id) VALUES (1, 1);
INSERT INTO job_map (job_id, influencer_id) VALUES (2, 1);
INSERT INTO job_map (job_id, influencer_id) VALUES (2, 2);

CREATE DATABASE jwtlogin;


-- NEED EXTENSION
CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

-- insert fake users

INSERT INTO users(user_name, user_email, user_password) VALUES ('henry', 'henry1@gmail.com', 'henry128');


CREATE TABLE trips(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id TEXT,
    user_name VARCHAR(255) NOT NULL,
    user_to VARCHAR(500),
    user_from VARCHAR(500),
    user_restrictions TEXT NOT NULL,
    trip_date DATE,
    user_info TEXT
    
);
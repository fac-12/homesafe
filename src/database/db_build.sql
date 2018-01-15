BEGIN;

DROP TABLE IF EXISTS parents CASCADE;
DROP TABLE IF EXISTS children CASCADE;
DROP TABLE IF EXISTS schools CASCADE;
DROP TABLE IF EXISTS designated_adults CASCADE;
DROP TABLE IF EXISTS scheduled_pickups CASCADE;

CREATE TABLE parents (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(100) NOT NULL,
  address TEXT NOT NULL,
  postcode VARCHAR(10) NOT NULL,
  phone VARCHAR(15) NOT NULL
);

CREATE TABLE schools (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(100) NOT NULL,
  verification_number VARCHAR(10),
  verified BOOLEAN
);

CREATE TABLE children (
  id SERIAL PRIMARY KEY,
  parent_id INT REFERENCES parents(id) ON DELETE CASCADE,
  school_id INT REFERENCES schools(id) ON DELETE CASCADE,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  year INT,
  dob DATE
);

CREATE TABLE designated_adults (
  id SERIAL PRIMARY KEY,
  parent_id INT REFERENCES parents(id) ON DELETE CASCADE,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  address TEXT NOT NULL,
  postcode VARCHAR(10) NOT NULL,
  phone VARCHAR(15) NOT NULL
);

CREATE TABLE scheduled_pickups (
  id SERIAL PRIMARY KEY,
  parent_id INT REFERENCES parents(id) ON DELETE CASCADE,
  child_id INT REFERENCES children(id) ON DELETE CASCADE,
  designated_adult_id INT REFERENCES designated_adults(id) ON DELETE CASCADE,
  pickup_date DATE,
  keyword VARCHAR(50) NOT NULL
);

INSERT INTO parents (first_name, last_name, email, address, postcode, phone, password) VALUES ('Kitty', 'Allen', 'k@a.com', '27 Soudan St Thirroul NSW', 'E83AS', '07490388097', 'apple');
INSERT INTO parents (first_name, last_name, email, address, postcode, phone, password) VALUES ('Sophie', 'Levens', 's@l.com', '123 Fake St', 'SW166AP', '07422388097', 'watermelon');

INSERT INTO schools (name, email, password, verification_number, verified) VALUES ('St Andrews', 'k.allen91@gmail.com', 'cucumber', '289013', true );
INSERT INTO schools (name, email, password, verification_number, verified) VALUES ('Portway', 'school@school.com', 'pepper', '39839830', false);

INSERT INTO children (parent_id, school_id, first_name, last_name, year, dob) VALUES ((SELECT id FROM parents WHERE email = 'k@a.com'), (SELECT id FROM schools WHERE email = 'k.allen91@gmail.com'), 'Frankie', 'Allen', 3, '1991-03-06');
INSERT INTO children (parent_id, school_id, first_name, last_name, year, dob) VALUES ((SELECT id FROM parents WHERE email = 's@l.com'), (SELECT id FROM schools WHERE email = 'school@school.com'), 'Pebbles', 'Levens', 3, '1990-01-01');

INSERT INTO designated_adults (parent_id, first_name, last_name, email, address, postcode, phone) VALUES ((SELECT id FROM parents WHERE email = 'k@a.com'), 'Fatimat', 'Gbaja', 'f@g.com', '99 Fake St', 'E82AS', '07342733849');
INSERT INTO designated_adults (parent_id, first_name, last_name, email, address, postcode, phone) VALUES ((SELECT id FROM parents WHERE email = 's@l.com'), 'Dragomir', 'Ceban', 'd@c.com', '101 Fake St', 'SE62AS', '07129292764');

INSERT INTO scheduled_pickups (parent_id, child_id, designated_adult_id, pickup_date, keyword) VALUES ((SELECT id FROM parents WHERE email = 'k@a.com'), (SELECT id FROM children WHERE first_name = 'Frankie'), (SELECT id FROM designated_adults WHERE first_name = 'Fatimat'), '2018-03-06', 'bacon');
INSERT INTO scheduled_pickups (parent_id, child_id, designated_adult_id, pickup_date, keyword) VALUES ((SELECT id FROM parents WHERE email = 's@l.com'), (SELECT id FROM children WHERE first_name = 'Pebbles'), (SELECT id FROM designated_adults WHERE first_name = 'Dragomir'), '2018-01-26', 'beef');

COMMIT;

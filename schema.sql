CREATE TABLE users
(
  userid      SERIAL                NOT NULL
    CONSTRAINT users_pkey
    PRIMARY KEY,
  physician   BOOLEAN DEFAULT FALSE NOT NULL,
  email       VARCHAR(40)
    CONSTRAINT users_email_key
    UNIQUE,
  given_name  VARCHAR(40),
  family_name VARCHAR(40),
  picture     VARCHAR(300),
  address     VARCHAR(260),
  city        VARCHAR(80),
  state       VARCHAR(2),
  zip         INTEGER
);

CREATE TABLE messages
(
  messageid   SERIAL NOT NULL
    CONSTRAINT messages_pkey
    PRIMARY KEY,
  recipientid INTEGER
    CONSTRAINT messages_users_userid_fk
    REFERENCES users,
  senderid    INTEGER,
  subject     VARCHAR(80),
  content     TEXT
);

CREATE TABLE medications
(
  medicationid SERIAL NOT NULL
    CONSTRAINT medications_pkey
    PRIMARY KEY,
  patientid    INTEGER
    CONSTRAINT medications_users_userid_fk
    REFERENCES users,
  dosage       VARCHAR(30),
  prescribed   BOOLEAN DEFAULT FALSE
);

-- AUTO0 Return:
-- {
--   "sub": "linkedin|Tp3uxBozeo",    --   identity provider id}|{unique id in the provider}
--   "given_name": "Michael", // first_name
--   "family_name": "Kovich",
--   "nickname": "kovich",
--   "name": "Michael Kovich",
--   "picture": "https://media.licdn.com/dms/image/C4D03AQH-nVPlcBFLXA/profile-displayphoto-shrink_100_100/0?e=1526853600&v=alpha&t=BHM52yDngnJ1IlJVQyi-yXpTZP0GH3-MTZW7c3R6zGo",
--   "updated_at": "2018-03-21T21:39:01.640Z"
-- }
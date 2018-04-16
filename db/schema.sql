create table billing
(
  billid      serial not null
    constraint billing_pkey
    primary key,
  patientid   integer,
  paid        boolean default false,
  amount      integer,
  description varchar(60)
);

create table blog
(
  postid  serial not null
    constraint blog_pkey
    primary key,
  title   varchar(80),
  excerpt varchar(240),
  content text,
  image   text,
  date    varchar(43),
  author  integer
);

create table comments
(
  commentid serial not null
    constraint comments_pkey
    primary key,
  postid    integer,
  author    integer,
  content   text
);

create table medications
(
  medicationid    serial not null
    constraint medications_pkey
    primary key,
  patientid       integer
    constraint medications_users_userid_fk
    references users,
  dosage          varchar(120),
  prescribed      boolean default false,
  medication_name varchar(60)
);

create table messages
(
  messageid   serial not null
    constraint messages_pkey
    primary key,
  recipientid integer
    constraint messages_users_userid_fk
    references users,
  senderid    integer,
  subject     varchar(80),
  content     text,
  date        varchar(43)
);

create table users
(
  userid        serial                not null
    constraint users_pkey
    primary key,
  physician     boolean default false not null,
  email         varchar(40)
    constraint users_email_key
    unique,
  given_name    varchar(40),
  family_name   varchar(40),
  picture       text,
  address       varchar(260),
  city          varchar(80),
  state         varchar(2),
  zip           integer,
  phone         varchar(10),
  notifications boolean default false
);

create table visits
(
  visitid  serial not null
    constraint visits_pkey
    primary key,
  type     varchar(80),
  date     varchar(40),
  patient  integer
    constraint visits_patient_fkey
    references users,
  provider integer
    constraint visits_provider_fkey
    references users
);
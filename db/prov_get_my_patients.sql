SELECT DISTINCT userid, given_name, family_name
FROM users
JOIN visits ON users.userid = visits.patient
WHERE visits.provider = $1;
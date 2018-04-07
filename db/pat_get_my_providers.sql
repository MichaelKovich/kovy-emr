SELECT DISTINCT userid, given_name, family_name
FROM users
JOIN visits ON users.userid = visits.provider
WHERE visits.patient = $1;
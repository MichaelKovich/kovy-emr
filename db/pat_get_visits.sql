SELECT * FROM visits
JOIN users ON visits.patient = users.userid
WHERE users.email = $1;
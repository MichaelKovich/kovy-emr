SELECT * FROM visits
JOIN users ON visits.provider = users.userid
WHERE visits.patient = $1;
SELECT * FROM visits
JOIN users ON visits.patient = users.userid;
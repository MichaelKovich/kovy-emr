SELECT * FROM medications
JOIN users on medications.patientid = users.userid;
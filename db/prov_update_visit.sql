UPDATE visits 
SET type = $1,
    date = $2,
    patient = $3,
    provider = $4
WHERE visits.visitid = $5;
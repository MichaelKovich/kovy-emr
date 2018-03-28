UPDATE medications 
SET dosage = $1,
    prescribed = $2,
    medication_name = $3
WHERE medications.medicationid = $4;
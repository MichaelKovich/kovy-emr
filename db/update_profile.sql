UPDATE users 
SET given_name = $1,
    family_name = $2,
    picture = $3,
    address = $4,
    city = $5,
    state = $6,
    zip = $7,
    phone = $8,
    notifications = $9
WHERE users.userid = $10;
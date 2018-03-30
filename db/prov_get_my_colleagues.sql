SELECT * FROM users
WHERE users.userid != $1 AND physician = true;
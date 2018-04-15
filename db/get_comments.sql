SELECT * FROM comments
JOIN users on comments.author = users.userid
WHERE comments.postid = $1;
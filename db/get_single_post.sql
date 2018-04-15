SELECT image, title, date, given_name, family_name, content FROM blog
JOIN users ON blog.author = users.userid
WHERE blog.postid = $1;
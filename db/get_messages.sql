SELECT * FROM messages
JOIN users ON messages.senderid = users.userid
WHERE messages.recipientid = $1
ORDER BY messages.messageid DESC;
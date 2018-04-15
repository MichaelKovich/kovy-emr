const getPosts = (req, res, next) => {
  const db = req.app.get('db');

  db
    .get_posts()
    .then(response => res.status(200).json(response))
    .catch(err => console.log(err));
};

const getSinglePost = (req, res, next) => {
  const db = req.app.get('db');

  db
    .get_single_post([req.params.id])
    .then(response => res.status(200).json(response))
    .catch(err => console.log(err));
};

const getComments = (req, res, next) => {
  const db = req.app.get('db');

  db
    .get_comments([req.params.id])
    .then(response => res.status(200).json(response))
    .catch(err => console.log(err));
};

const submitComment = (req, res, next) => {
  const db = req.app.get('db');

  db
    .submit_comment([req.body.postid, req.body.author, req.body.content])
    .then(response => res.status(200))
    .catch(err => console.log(err));
};

const submitPost = (req, res, next) => {
  console.log('Submitting Post...');

  const db = req.app.get('db');
  const moment = require('moment');
  const date = moment().format('MMMM Do YYYY');

  db
    .prov_submit_post([
      req.body.title,
      req.body.excerpt,
      req.body.content,
      req.body.image,
      date,
      req.body.author,
    ])
    .then(response => res.status(200))
    .catch(err => console.log(err));
};

module.exports = {
  getPosts,
  getSinglePost,
  getComments,
  submitComment,
  submitPost,
};

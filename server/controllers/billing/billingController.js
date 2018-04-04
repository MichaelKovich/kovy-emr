const getBillingItems = (req, res, next) => {
  const db = req.app.get('db');

  db
    .get_userid([req.session.user.emails[0].value])
    .then((response) => {
      db
        .pat_get_billing_items([response[0].userid])
        .then((response) => res.status(200).json(response))
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

module.exports = {
  getBillingItems,
}
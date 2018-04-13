const getBillingItems = (req, res, next) => {
  const db = req.app.get('db');

  db
    .get_userid([req.session.user.emails[0].value])
    .then((response) => {
      db
        .pat_get_billing_items([response[0].userid])
        .then(response => res.status(200).json(response))
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

const getBillingHistory = (req, res, next) => {
  const db = req.app.get('db');

  db
    .get_userid([req.session.user.emails[0].value])
    .then((response) => {
      db
        .pat_get_billing_history([response[0].userid])
        .then(response => res.status(200).json(response))
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

const getBillingItemsMaster = (req, res, next) => {
  const db = req.app.get('db');

  db
    .prov_get_billing_items_master()
    .then(response => res.status(200).json(response))
    .catch(err => console.log(err));
};

const addBill = (req, res, next) => {
  const db = req.app.get('db');

  db
    .prov_add_bill([req.body.patientid, req.body.amount, req.body.description])
    .then(response => res.status(200))
    .catch(err => console.log(err));
};

const updateBill = (req, res, next) => {
  const db = req.app.get('db');

  db
    .prov_update_bill([req.body.billid, req.body.paid, req.body.amount, req.body.description])
    .then(response => res.status(200))
    .catch(err => console.log(err));
};

module.exports = {
  getBillingItems,
  getBillingHistory,
  addBill,
  updateBill,
  getBillingItemsMaster,
};

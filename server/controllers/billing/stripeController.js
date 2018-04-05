require('dotenv').config();

const secretKey = process.env.STRIPE_KEY;
const stripe = require('stripe')(secretKey);

const stripeCharge = (req, res, next) => {
  const db = req.app.get('db');
  console.log(req.body);

  stripe.charges.create(
    {
      amount: req.body.amount,
      currency: 'usd',
      source: req.body.stripeToken,
      receipt_email: req.body.username,
    },
    (err, charge) => {
      db
        .pat_update_billing_items([req.body.billid])
        .then(response => res.status(200).json({message: 'Transaction complete!'}))
        .catch(err => console.log(err));
    },
  );
};

module.exports = {
  stripeCharge,
};

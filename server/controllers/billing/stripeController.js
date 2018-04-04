require('dotenv').config();
const secretKey = process.env.STRIPE_KEY;

const stripe = require("stripe")(
  secretKey
);

const stripeCharge = (req, res, next) => {
  stripe.charges.create({
    amount: req.body.amount,
    currency: "usd",
    source: req.body.stripeToken,
  });
};

module.exports = {
  stripeCharge,
};
const path = require('path');

const dashboardRouter = (req, res, next) => {
  res.sendFile(path.join(`${__dirname}/../../build/index.html`));
};

module.exports = {
  dashboardRouter,
};

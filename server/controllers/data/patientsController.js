const getPatients = (req, res, next) => {
  const db = req.app.get('db');

  db
    .prov_get_patients()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch(err => console.log(err));
};

module.exports = {
  getPatients,
};

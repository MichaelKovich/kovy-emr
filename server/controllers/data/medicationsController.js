const addMedication = (req, res, next) => {
  const db = req.app.get('db');

  db
    .prov_add_medication([
      req.body.userid,
      req.body.dosage,
      req.body.prescribed,
      req.body.medication_name,
    ])
    .then((response) => {
      res.status(200);
    })
    .catch(err => console.log(err));
};

const getMedicationsMaster = (req, res, next) => {
  const db = req.app.get('db');

  db
    .prov_get_medication_master()
    .then(response => res.status(200).json(response))
    .catch(err => console.log(err));
};

module.exports = {
  addMedication,
  getMedicationsMaster,
};

const request = require('request-promise');

const client_id = '8dbcf90617c73ea960abe7e69e00dae4';
const client_secret = '2f57c50a9ddcfd92f869b7d3274eaf7d';

const receiveCode = (req, res, next) => {
  if (req.query.code) {
    const code = req.query.code;
    req.session.code = code;

    request({
      method: 'POST',
      url: 'https://api.23andme.com/token',
      form: {
        client_id,
        client_secret,
        grant_type: 'authorization_code',
        code: req.query.code,
        redirect_uri: 'http://localhost:3000/receive_code/',
        scope: 'report:all',
      },
      json: true,
    })
      .then((response) => {
        req.session.token = response;
        return res.redirect('/patients/genomics');
      })
      .catch(err => console.log(err));
  } else {
    return res.redirect('/patients/genomics');
  }
};

const checkToken = (req, res, next) => {
  if (req.session.token) {
    return res.status(200).json({token: true});
  }
  return res.status(200).json({token: false});
};

const getReports = (req, res, next) => {
  const {scope} = req.session.token;
  const profile = scope.replace('report:all profile_id:', '');

  const headers = {Authorization: `Bearer ${req.session.token.access_token}`};

  request
    .get({
      url: `https://api.23andme.com/3/profile/${profile}/report/`,
      headers,
      json: true,
    })
    .then(response => res.status(200).json(response.data))
    .catch(err => console.log(err));
};

module.exports = {
  receiveCode,
  checkToken,
  getReports,
};

var express = require('express');
var router = express.Router();
const queryString = require('../constants/queryConstants');
const query = require('../db/query');
const sha = require('sha.js');

router.post('/register', async (req, res) => {
  let username = req.body.username;
  let password = sha('sha256').update(req.body.password).digest('hex');

  query.execPost(req, res, queryString.REGISTER_USER(username, password));
});

router.post('/auth', async (req, res) => {
  // const payload = {
  //   username: req.body.username,
  //   password: sha('sha256').update(req.body.password).digest('hex')
  // }

  // query.execLogin(res, queryString.CHECK_USER(payload), false);
  query.loginUser(res, [{email: 'abc@kjs.com'}], 'jdslajdklsajkl');
});

router.post('/', async (req, res) => {

  query.exec(req, res, queryString.GET_USERS, query.get);
});

router.get('/checkusername', async (req, res) => {
  let username = req.query.username;

  query.execGet(req, res, queryString.CHECK_USERNAME(username));
})

module.exports = router;

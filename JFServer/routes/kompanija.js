var express = require('express');
var router = express.Router();
const queryString = require('../constants/queryConstants');
const query = require('../db/query');
const sha = require('sha.js');

router.post('/auth', async (req, res) => {
  let username = req.body.username;
  let password = sha('sha256').update(req.body.password).digest('hex');

  const payload = {
      username,
      password
  };

  query.execLogin(res, req.body, queryString.LOGIN_KOMPANIJA(payload), true);
});

router.get('/', async (req, res) => {
  let id = req.query.id;

  query.execUser(req, res, id);
});

router.get('/checkMail', async (req, res) => {
  query.execMailCheck(res);
})

router.post('/stats', async (req, res) => {
  const type = req.body.type;
  
  switch(type){
    case 'top10': {
      query.exec(req, res, queryString.STATS_TOP_10(), query.get);
      break;
    }
    case 'cv': {
      query.exec(req, res, '', query.getCVStats(res));
      break;
    }
    case 'totalUsers': {
      query.exec(req, res, queryString.STATS_TOTAL_USERS(), query.get);
      break;
    }
  }
  
})

module.exports = router;

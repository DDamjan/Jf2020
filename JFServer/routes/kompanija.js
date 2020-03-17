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

router.get('/checkMail', async (req, res) => {
  query.execMailCheck(res);
})

router.post('/stats', async (req, res) => {
  query.exec(req, res, '', query.getStats(res));
});

router.post('/formOptions', async (req, res) => {
  query.exec(req, res, '', query.filterOptions(res));
});

router.get('/', async (req, res) => {
  query.upisiKompanije(res);
})

router.post('/history/add', async (req, res) => {
  query.exec(req, res, queryString.ADD_TO_HISTORY(req.body), query.get);
});

router.post('/history/get', async (req, res) => {
  query.exec(req, res, '', query.getHistory(res, req.body));
})

router.post('/favourites/add', async (req, res) => {
  query.exec(req, res, queryString.ADD_TO_FAVOURITES(req.body), query.get);
});

router.post('/favourites/remove', async (req, res) => {
  query.exec(req, res, queryString.REMOVE_FROM_FAVOURITES(req.body), query.get);
});

router.post('/downloaded', async (req, res) => {
  query.exec(req, res, queryString.ADD_TO_DOWNLOADED(req.body), query.get);
});


module.exports = router;

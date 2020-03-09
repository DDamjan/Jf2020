var express = require('express');
var router = express.Router();
const queryString = require('../constants/queryConstants');
const query = require('../db/query');
const sha = require('sha.js');
const fs = require('fs');
var glob = require("glob");

router.post('/register', async (req, res) => {
  query.execRegister(res, req.body);
});

router.post('/verify', async (req, res) => {
  query.verifyAccount(res, req.body.token);
});

router.post('/sifra', async (req, res) => {
  query.resetPassword(res, req.body);
});

router.post('/newpassword', async (req, res) => {
  query.newPassword(res, req.body);
});

router.post('/auth', async (req, res) => {
  // console.log(req.body);
  query.execLogin(res, queryString.CHECK_USER(req.body), false);
});

router.post('/', async (req, res) => {
  //res.send('Hi there');
  query.exec(req, res, queryString.GET_USERS, query.get);
});

router.post('/refresh', async (req, res) => {
  query.exec(req, res, '', query.getUser(res, req.body, undefined));
});

router.get('/checkusername', async (req, res) => {
  let username = req.query.username;

  query.execGet(req, res, queryString.CHECK_USERNAME(username));
});

router.post('/update', async (req, res) => {
  console.log(req.body);
  switch (req.body.field) {
    case 'licniPodaci': {
      query.exec(req, res, queryString.UPDATE_LICNI_PODACI(req.body.payload), query.get(res, req.body));
      break;
    }
    case 'kontakt': {
      query.exec(req, res, queryString.UPDATE_KONTAKT(req.body.payload), query.get(res, req.body));
      break;
    }
    case 'prebivaliste': {
      query.exec(req, res, '', query.update(res, req.body));
      break;
    }
    case 'boraviste': {
      query.exec(req, res, '', query.update(res, req.body));
      break;
    }
    case 'srednjeObrazovanje': {
      query.exec(req, res, '', query.update(res, req.body));
      break;
    }
    case 'visokoObrazovanje': {
      query.exec(req, res, '', query.update(res, req.body));
      break;
    }
    case 'radnoIskustvo': {
      query.exec(req, res, '', query.updateIskustva(res, req.body));
      break;
    }
    case 'radNaProjektu': {
      query.exec(req, res, '', query.updateIskustva(res, req.body));
      break;
    }
    case 'strucnoUsavrsavanje': {
      query.exec(req, res, '', query.updateIskustva(res, req.body));
      break;
    }
    case 'radNaRacunaru': {
      query.exec(req, res, '', query.updateIskustva(res, req.body));
      break;
    }
    case 'poznavanjeJezika': {
      query.exec(req, res, '', query.updateIskustva(res, req.body));
      break;
    }
  }
});

router.post('/addField', async (req, res) => {
  switch (req.body.field) {
    case 'srednjeObrazovanje': {
      query.exec(req, res, '', query.addSrednja(res, req.body));
      break;
    }
    case 'visokoObrazovanje': {
      query.exec(req, res, '', query.addFakultet(res, req.body));
      break;
    }
    case 'radnoIskustvo': {
      query.exec(req, res, '', query.addIskustvo(res, req.body));
      break;
    }
    case 'radNaProjektu': {
      query.exec(req, res, '', query.addIskustvo(res, req.body));
      break;
    }
    case 'strucnoUsavrsavanje': {
      query.exec(req, res, '', query.addIskustvo(res, req.body));
      break;
    }
    case 'radNaRacunaru': {
      query.exec(req, res, '', query.addIskustvo(res, req.body));
      break;
    }
    case 'poznavanjeJezika': {
      query.exec(req, res, '', query.addIskustvo(res, req.body));
      break;
    }
  }
});

router.post('/remove', async (req, res) => {
  console.log(req.body);
  switch (req.body.field) {
    case 'srednjeObrazovanje': {
      query.exec(req, res, queryString.DELETE_SREDNJA_SKOLA(req.body.payload.id), query.get(res, req.body));
      break;
    }
    case 'visokoObrazovanje': {
      query.exec(req, res, queryString.DELETE_FAKULTET(req.body.payload.id), query.get(res, req.body));
      break;
    }
    case 'radnoIskustvo': {
      query.exec(req, res, queryString.DELETE_RADNO_ISKUSTVO(req.body.payload.id), query.get(res, req.body));
      break;
    }
    case 'radNaProjektu': {
      query.exec(req, res, queryString.DELETE_RAD_NA_PROJEKTU(req.body.payload.id), query.get(res, req.body));
      break;
    }
    case 'strucnoUsavrsavanje': {
      query.exec(req, res, queryString.DELETE_STRUCNO_USAVRSAVANJE(req.body.payload.id), query.get(res, req.body));
      break;
    }
    case 'radNaRacunaru': {
      query.exec(req, res, queryString.DELETE_RAD_NA_RACUNARU(req.body.payload.id), query.get(res, req.body));
      break;
    }
    case 'poznavanjeJezika': {
      console.log(req.body.payload.id);
      query.exec(req, res, queryString.DELETE_GOVORI(req.body.payload.id), query.get(res, req.body));
      break;
    }
  }
});

router.post('/addpicture/', async (req, res) => {
//   let fs = require('fs')
// const path = queryString.REPO_PATH + '//profile//'
// let regex = /[.]txt$/
// fs.readdirSync(path)
//     .filter(f => regex.test(f))
//     .map(f => fs.unlinkSync(dbpath + f))
  query.upload(req, res, '//profile//', 'picture');
});

router.post('/addcv', async (req, res) => {
  query.upload(req, res, '//cv//', 'cv');
});

router.get('/returncv', async (req, res) => {
  query.execFile(res, queryString.REPO_PATH + '//cv//' + req.query.file);
});

router.get('/returnpicture/', async (req, res) => {
  console.log(req.query.file);
  query.execFile(res, queryString.REPO_PATH + '//profile//' + req.query.file);
});

module.exports = router;
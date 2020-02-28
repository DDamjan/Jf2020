let mysql = require('../db/db');
let jwt = require('jsonwebtoken');
let config = require('../constants/config');
let queryStrings = require('../constants/queryConstants');

function exec(req, res, query, fun) {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    if (token) {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                return res.json([{
                    success: false,
                    message: 'Token is not valid'
                }]);
            } else {
                mysql.pool.query(query, (err, result) => {
                    if (result.length !== 0) {
                        console.log(res);
                        fun(res, result);
                    } else {
                        fun(res, result);
                    }
                })
            }
        });
    } else {
        return res.json({
            success: false,
            message: 'Auth token is not supplied'
        });
    }
}

function execLogin(res, query, kompanija) {
    mysql.pool.query(query, (err, results) => {
        try {
            if (results.length !== 0) {
                let tokenKey;
                if (kompanija) {
                    tokenKey = {
                        username: results[0].username
                    };
                } else {
                    tokenKey = {
                        username: results[0].email
                    }
                }

                let token = jwt.sign(tokenKey, config.secret, { expiresIn: '8h' });

                if (kompanija) {
                    loginKompanija(res, results, token);
                } else {
                    loginUser(req, results, token);
                }

            }
            else {
                const payload = [{
                    kompanijaID: -1,
                    username: 'error'
                }];
                res.json(payload);
                res.send();
            }

        } catch (err) {
            console.log(err);
        }
    });
}

function execLocal(query) {
    return mysql.pool.query(query, (err, results) => {
        return results;
    });
}

function get(res, result) {
    res.json(result);
    res.send();
}

function loginKompanija(res, results, token) {
    const payload = [{
        username: results[0].username,
        kompanijaID: results[0].kompanijaID,
        token: token
    }];

    res.json(payload);
    res.send();
}

async function loginUser(res, results, token) {
    let user = await execLocal(queryStrings.GET_USER + results[0].email);
    let licniPodaci = await execLocal(queryStrings.GET_LICNI_PODACI_BY_USERID + user[0].userID);
    let boravisteGrad = await execLocal(queryStrings.GET_GRAD + licniPodaci[0].boravisteGradID);
    let boravisteDrzava = await execLocal(queryStrings.GET_DRZAVA + licniPodaci[0].boravisteDrzavaID);
    let prebivalisteGrad = await execLocal(queryStrings.GET_GRAD + licniPodaci[0].prebivalisteGradID);
    let prebivalisteDrzava = await execLocal(queryStrings.GET_DRZAVA + licniPodaci[0].prebivalisteDrzavaID);

    let srednjaSkola = await execLocal(queryStrings.GET_SREDNJA_SKOLA(user[0].userID));
    let visokoOBrazovanje = await execLocal(queryStrings.GET_FAKULTET(user[0].userID));

    let radnoIskustvo = await execLocal(queryStrings.GET_RADNO_ISKUSTVO(user[0].userID));
    let strucnoUsavrsavanje = await execLocal(queryStrings.GET_STRUCNO_USAVRSAVANJE(user[0].userID));
    let radNaRacunaru = await execLocal(queryStrings.GET_RAD_NA_RACUNARU(user[0].userID));
    let radNaProjektu = await execLocal(queryStrings.GET_RAD_NA_PROJEKTU(user[0].userID));
    let poznavanjeJezika = await execLocal(queryStrings.GET_POZNAVANJE_JEZIKA(user[0].userID));
    let ostaleVestine = await execLocal(queryStrings.GET_OSTALE_VESTINE(user[0].userID));

    let payload = {
        userID: user[0].userID,
        email: user[0].email,
        licniPodaci: {
            ...licniPodaci[0], kontakt: { telefon: licniPodaci[0].telefon, linkedIn: licniPodaci[0].linkedIn }
        },
        prebivaliste: {
            drzava: prebivalisteDrzava[0].naziv,
            grad: prebivalisteGrad[0].naziv,
            adresa: licniPodaci[0].prebivalisteAdresa
        },
        boraviste: {
            drzava: boravisteDrzava[0].naziv,
            grad: boravisteGrad[0].naziv,
            adresa: licniPodaci[0].boravisteAdresa
        },
        srednjeObrazovanje: srednjaSkola,
        visokoOBrazovanje: visokoOBrazovanje,
        iskustvo: {
            radnoIskustvo: radnoIskustvo,
            strucnoUsavrsavanje: strucnoUsavrsavanje,
            radNaRacunaru: radNaRacunaru,
            radNaProjektu: radNaProjektu,
            poznavanjeJezika: poznavanjeJezika,
            ostaleVestine: ostaleVestine
        },
        token: token
    }

    res.json(payload);
    res.send();

}


module.exports = {
    execLogin,
    exec,
    get,
    loginUser
}
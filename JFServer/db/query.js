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

async function loginUser(req, results, token) {
    let user = await execLocal(queryStrings.GET_USER+results[0].email);
    let licniPodaci = await execLocal(queryStrings.GET_LICNI_PODACI_BY_USERID+user[0].userID);
    let jezici = await execLocal(queryStrings.GET_JEZICI(user[0].userID));
    let boravisteGrad = awaitexecLocal(queryStrings.GET_GRAD+licniPodaci[0].boravisteGradID);
    let boravisteDrzava = awaitexecLocal(queryStrings.GET_DRZAVA+licniPodaci[0].boravisteDrzavaID);
    let prebivalisteGrad = awaitexecLocal(queryStrings.GET_GRAD+licniPodaci[0].prebivalisteGradID);
    let prebivalisteDrzava = awaitexecLocal(queryStrings.GET_DRZAVA+licniPodaci[0].prebivalisteDrzavaID);
    

}


module.exports = {
    execLogin,
    exec,
    get
}
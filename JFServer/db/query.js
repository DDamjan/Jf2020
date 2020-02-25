let mysql = require('../db/db');
let jwt = require('jsonwebtoken');
let config = require('../constants/config');

function execLogin(res, query, kompanija) {
    mysql.pool.query(query, (err, results) => {
        try {
            if (results.length !== 0) {
                let token = jwt.sign({ username: results[0].username },
                    config.secret,
                    { expiresIn: '8h' });
                let payload;
                if (kompanija) {
                    payload = [{
                        username: results[0].username,
                        kompanijaID: results[0].kompanijaID,
                        token: token
                    }];
                }
                res.json(payload);
                res.send();
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

function exec(req, res, query, fun) {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    if (token) {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Token is not valid'
                });
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

function login(res, result) {
    res.json(result);
    res.send();
}

module.exports = {
    execLogin,
    exec,
    login
}
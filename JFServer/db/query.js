let mysql = require('../db/db');
let jwt = require('jsonwebtoken');
let config = require('../constants/config');
let queryStrings = require('../constants/queryConstants');
const sha = require('sha.js');

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
            if (results.length != 0) {
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
                    loginUser(res, results, token);
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
            res.status(500);
            res.send(err.message);
        }
    });
}

async function execRegister(res, user) {
    await mysql.pool.getConnection(async (err, conn) => {
        await conn.execute(queryStrings.CHECK_USER({ email: user.email, password: user.password }), [], async (err, results, fields) => {
            const temp = JSON.stringify(results);
            const userExists = JSON.parse(temp);
            try {
                if (userExists.length == 0) {
                    await conn.execute(queryStrings.REGISTER_USER_DRZAVA(user.prebivaliste.drzava));
                    await conn.execute(queryStrings.REGISTER_USER_GRAD(user.prebivaliste.grad));

                    await conn.execute(queryStrings.REGISTER_USER_DRZAVA(user.boraviste.drzava));
                    await conn.execute(queryStrings.REGISTER_USER_GRAD(user.boraviste.grad));

                    await conn.execute(queryStrings.REGISTER_USER_USER(user.email, user.password, user.datumRegistracije));
                    await conn.execute(queryStrings.REGISTER_USER_LICNI_PODACI(user.email, user.licniPodaci.ime, user.licniPodaci.prezime, user.licniPodaci.imeRoditelja, user.licniPodaci.datumRodjenja, user.boraviste, user.prebivaliste, user.kontakt, user.datumRegistracije));

                    mysql.pool.releaseConnection(conn);
                    res.status(200);
                    res.send();
                } else {
                    res.status(409);
                    res.json("Korisnik vec postoji");
                    res.send();
                }
            } catch (err) {
                mysql.pool.releaseConnection(conn);
                console.log(err.message);
                res.status(500);
                res.send(err.message);
            }
        });
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
    await mysql.pool.getConnection(async (err, conn) => {
        let user = await conn.promise().execute(queryStrings.GET_USER(results[0].email));
        let temp = JSON.stringify(user[0]);
        const userParsed = JSON.parse(temp);

        let licniPodaci = await conn.promise().execute(queryStrings.GET_LICNI_PODACI_BY_USERID + userParsed[0].userID);
        temp = JSON.stringify(licniPodaci[0]);
        const licniPodaciParsed = JSON.parse(temp);

        let boravisteGrad = await conn.promise().execute(queryStrings.GET_GRAD + licniPodaciParsed[0].boravisteGradID);
        let boravisteDrzava = await conn.promise().execute(queryStrings.GET_DRZAVA + licniPodaciParsed[0].boravisteDrzavaID);
        let prebivalisteGrad = await conn.promise().execute(queryStrings.GET_GRAD + licniPodaciParsed[0].prebivalisteGradID);
        let prebivalisteDrzava = await conn.promise().execute(queryStrings.GET_DRZAVA + licniPodaciParsed[0].prebivalisteDrzavaID);

        let srednjaSkola = await conn.promise().execute(queryStrings.GET_SREDNJA_SKOLA(userParsed[0].userID));
        let fakultet = await conn.promise().execute(queryStrings.GET_FAKULTET(userParsed[0].userID));

        let radnoIskustvo = await conn.promise().execute(queryStrings.GET_RADNO_ISKUSTVO(userParsed[0].userID));
        let strucnoUsavrsavanje = await conn.promise().execute(queryStrings.GET_STRUCNO_USAVRSAVANJE(userParsed[0].userID));
        let radNaRacunaru = await conn.promise().execute(queryStrings.GET_RAD_NA_RACUNARU(userParsed[0].userID));
        let radNaProjektu = await conn.promise().execute(queryStrings.GET_RAD_NA_PROJEKTU(userParsed[0].userID));
        let poznavanjeJezika = await conn.promise().execute(queryStrings.GET_POZNAVANJE_JEZIKA(userParsed[0].userID));
        let ostaleVestine = await conn.promise().execute(queryStrings.GET_OSTALE_VESTINE(userParsed[0].userID));

        temp = JSON.stringify(prebivalisteDrzava[0]);
        const prebivalisteDrzavaParsed = JSON.parse(temp);

        temp = JSON.stringify(boravisteDrzava[0]);
        const boravisteDrzavaParsed = JSON.parse(temp);

        temp = JSON.stringify(prebivalisteGrad[0]);
        const prebivalisteGradParsed = JSON.parse(temp);

        temp = JSON.stringify(boravisteGrad[0]);
        const boravisteGradParsed = JSON.parse(temp);

        temp = JSON.stringify(srednjaSkola[0]);
        const srednjaSkolaParsed = JSON.parse(srednjaSkola[0].length == 0 ? '{}' : temp);

        temp = JSON.stringify(fakultet[0]);
        const fakultetParsed = JSON.parse(fakultet[0].length == 0 ? '{}' : temp);

        temp = JSON.stringify(radnoIskustvo[0]);
        const radnoIskustvoParsed = JSON.parse(radnoIskustvo[0].length == 0 ? '{}' : temp);

        temp = JSON.stringify(strucnoUsavrsavanje[0]);
        const strucnoUsavrsavanjeParsed = JSON.parse(strucnoUsavrsavanje[0].length == 0 ? '{}' : temp);

        temp = JSON.stringify(radNaRacunaru[0]);
        const radNaRacunaruParsed = JSON.parse(radNaRacunaru[0].length == 0 ? '{}' : temp);

        temp = JSON.stringify(radNaProjektu[0]);
        const radNaProjektuParsed = JSON.parse(radNaProjektu[0].length == 0 ? '{}' : temp);

        temp = JSON.stringify(poznavanjeJezika[0]);
        const poznavanjeJezikaParsed = JSON.parse(poznavanjeJezika[0].length == 0 ? '{}' : temp);

        temp = JSON.stringify(ostaleVestine[0]);
        const ostaleVestineParsed = JSON.parse(ostaleVestine[0].length == 0 ? '{}' : temp);

        let payload = {
            userID: userParsed[0].userID,
            email: userParsed[0].email,
            licniPodaci: {
                ...licniPodaciParsed[0], kontakt: { telefon: licniPodaciParsed[0].telefon, linkedIn: licniPodaciParsed[0].linkedIn }
            },
            prebivaliste: {
                drzava: prebivalisteDrzavaParsed[0].naziv,
                grad: prebivalisteGradParsed[0].naziv,
                adresa: licniPodaciParsed[0].prebivalisteAdresa
            },
            boraviste: {
                drzava: boravisteDrzavaParsed[0].naziv,
                grad: boravisteGradParsed[0].naziv,
                adresa: licniPodaciParsed[0].boravisteAdresa
            },
            srednjeObrazovanje: srednjaSkolaParsed,
            visokoOBrazovanje: fakultetParsed,
            iskustvo: {
                radnoIskustvo: radnoIskustvoParsed,
                strucnoUsavrsavanje: strucnoUsavrsavanjeParsed,
                radNaRacunaru: radNaRacunaruParsed,
                radNaProjektu: radNaProjektuParsed,
                poznavanjeJezika: poznavanjeJezikaParsed,
                ostaleVestine: ostaleVestineParsed
            },
            token: token
        }
        mysql.pool.releaseConnection(conn);
        res.status(200);
        res.json(payload);
        res.send();
    });
}


module.exports = {
    execLogin,
    exec,
    get,
    loginUser,
    execRegister
}
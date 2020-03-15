let mysql = require('../db/db');
let jwt = require('jsonwebtoken');
let config = require('../constants/config');
let queryStrings = require('../constants/queryConstants');
const sha = require('sha.js');
var nodemailer = require('../Middleware/nodemailer');
var formidable = require('formidable');
var mv = require('mv');
var logger = require('../Middleware/log4js');
var path = require('path');

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
                    if (req.body.field != undefined || query == '') {
                        fun;
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
        res.send();
    }
}

async function execLogin(res, req, query, kompanija) {
    await mysql.pool.getConnection(async (err, conn) => {
        try {
            const loginInfo = await conn.promise().execute(query);
            const temp = JSON.stringify(loginInfo[0]);
            const loginInfoParsed = JSON.parse(temp);

            if (loginInfoParsed[0] != undefined) {
                if (!kompanija) {
                    if (loginInfoParsed[0].oldAcc == 0) {
                        if (loginInfoParsed[0].aktiviran != 0) {
                            const tokenKey = {
                                username: loginInfoParsed[0].email
                            }
                            let token = jwt.sign(tokenKey, config.secret, { expiresIn: '8h' });
                            getUser(res, loginInfoParsed, token);
                        } else {
                            const data = {
                                status: 401
                            }
                            res.status(401);
                            res.json(data);
                            res.send();
                        }
                    } else {
                        const data = {
                            status: 412
                        }
                        res.status(412);
                        res.json(data)
                        res.send();
                    }
                } else {
                    const tokenKey = {
                        username: loginInfoParsed[0].username
                    }
                    let token = jwt.sign(tokenKey, config.secret, { expiresIn: '8h' });
                    loginKompanija(res, loginInfoParsed, token);
                }
            } else {
                if (!kompanija) {
                    const isOld = await conn.promise().execute(queryStrings.CHECK_EMAIL(req.email));

                    const temp = JSON.stringify(isOld[0]);
                    const isOldParsed = JSON.parse(temp);

                    if (isOldParsed[0] != undefined) {
                        if (isOldParsed[0].oldAcc == 1) {
                            const data = {
                                status: 412
                            }
                            res.status(412);
                            res.json(data)
                            res.send();
                        } else {
                            const data = {
                                status: 409
                            };
                            res.status(409);
                            res.json(data);
                            res.send();
                        }
                    } else {
                        const data = {
                            status: 409
                        };
                        res.status(202);
                        res.json(data);
                        res.send();
                    }
                } else {
                    const data = {
                        status: 409
                    };
                    res.status(202);
                    res.json(data);
                    res.send();
                }
            }
        } catch (err) {
            res.status(500);
            console.log(err.message);
            res.send(err.message);
        }
    });

}

async function execRegister(res, user) {
    await mysql.pool.getConnection(async (err, conn) => {
        await conn.execute(queryStrings.CHECK_EMAIL(user.email), [], async (err, results, fields) => {
            const temp = JSON.stringify(results);
            const userExists = JSON.parse(temp);

            console.log(userExists.length);
            try {
                if (userExists.length == 0) {
                    await conn.execute(queryStrings.REGISTER_USER_DRZAVA(user.prebivaliste.drzava));
                    await conn.execute(queryStrings.REGISTER_USER_GRAD(user.prebivaliste.grad));

                    await conn.execute(queryStrings.REGISTER_USER_DRZAVA(user.boraviste.drzava));
                    await conn.execute(queryStrings.REGISTER_USER_GRAD(user.boraviste.grad));

                    await conn.execute(queryStrings.REGISTER_USER_USER(user.email, user.password, user.datumRegistracije));
                    await conn.execute(queryStrings.REGISTER_USER_LICNI_PODACI(user.email, user.licniPodaci.ime, user.licniPodaci.prezime, user.licniPodaci.imeRoditelja, user.licniPodaci.datumRodjenja, user.boraviste, user.prebivaliste, user.kontakt, user.datumRegistracije));

                    const registerToken = sha('sha256').update(user.email).digest('hex');

                    await conn.execute(queryStrings.REGISTER_TOKEN(registerToken, user.email));

                    var mailOptions = {
                        from: 'jfit@jobfairnis.rs',
                        to: user.email,
                        subject: 'Aktivacija Job Fair naloga',
                        html: `<h3>Molimo Vas da aktivirate Vaš nalog klikom na ovaj </h3><a href="cv.jobfairnis.rs/verification/${registerToken}">link</a>. <h3>Ako link ne radi iskopirajte ovu adresu: http://cv.jobfairnis.rs/verification/${registerToken}</h3>`
                    };

                    nodemailer.transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });

                    mysql.pool.releaseConnection(conn);
                    res.status(200);
                    res.json({ status: 200 });
                    res.send();
                } else {
                    res.status(409);
                    res.json({ status: 409 });
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

async function verifyAccount(res, payload) {
    await mysql.pool.getConnection(async (err, conn) => {
        const userID = await conn.promise().execute(queryStrings.CHECK_REGISTER_TOKEN(payload));

        if (userID != undefined) {
            await conn.promise().execute(queryStrings.ACTIVATE_USER(payload));
            await conn.promise().execute(queryStrings.DELETE_REGISTER_TOKEN(payload));

            const data = {
                status: 201
            }

            res.status(201);
            res.json(data);
            res.send();
        } else {
            const data = {
                status: 404
            }
            res.status(404);
            res.json(data);
            res.send();
        }
    });
}

async function resetPassword(res, payload) {
    await mysql.pool.getConnection(async (err, conn) => {
        console.log(payload);
        const passwordToken = sha('sha256').update(payload.email).digest('hex');

        const userID = await conn.promise().execute(queryStrings.CHECK_EMAIL(payload.email));
        console.log(userID[0]);
        if (userID[0].length != 0) {
            await conn.execute(queryStrings.PASSWORD_TOKEN(passwordToken, payload.email));

            var mailOptions = {
                from: 'jfit@jobfairnis.rs',
                to: payload.email,
                subject: 'Promena lozinke Job Fair CV aplikacije',
                html: `<h3>Molimo Vas da potvrdite Vaš identitet klikom na ovaj </h3><a href="http://cv.jobfairnis.rs/changePassword/${passwordToken}">link</a> <h3>Ako link ne radi iskopirajte ovu adresu: http://cv.jobfairnis.rs/changePassword/${passwordToken}</h3>`
            };

            nodemailer.transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });

            const data = {
                status: 200
            }

            res.json(data);
            res.status(200);
            res.send();
        } else {
            const data = {
                status: 404
            }

            res.json(data);
            res.status(404);
            res.send();
        }
    });
}

async function newPassword(res, payload) {
    await mysql.pool.getConnection(async (err, conn) => {
        console.log(payload);
        const userID = await conn.promise().execute(queryStrings.CHECK_PASSWORD_TOKEN(payload.token));

        if (userID != undefined) {
            temp = JSON.stringify(userID[0]);
            const userIDParsed = JSON.parse(temp);

            const isOldAcc = await conn.promise().execute(queryStrings.GET_OLD_ACC_TOKEN(userIDParsed[0].userID));
            temp = JSON.stringify(isOldAcc[0]);
            const isOldAccParsed = JSON.parse(temp);

            await conn.promise().execute(queryStrings.CHANGE_PASSWORD(payload.password, userIDParsed[0].userID));
            await conn.promise().execute(queryStrings.DELETE_PASSWORD_TOKEN(payload.token));

            console.log(isOldAccParsed[0]);

            if (isOldAccParsed[0].oldAcc == 1) {
                await conn.promise().execute(queryStrings.UPDATE_OLD_ACC_TOKEN(userIDParsed[0].userID));
            }

            const data = {
                status: 201
            }

            res.status(201);
            res.json(data);
            res.send();
        } else {
            const data = {
                status: 404
            }
            res.status(404);
            res.json(data);
            res.send();
        }
    });
}

function get(res, result) {
    res.json(result);
    res.send();
}

async function update(res, payload) {
    await mysql.pool.getConnection(async (err, conn) => {
        await conn.promise().execute(queryStrings.REGISTER_USER_DRZAVA(payload.payload.drzava));
        await conn.promise().execute(queryStrings.REGISTER_USER_GRAD(payload.payload.grad));

        switch (payload.field) {
            case 'prebivaliste': {
                await conn.promise().execute(queryStrings.UPDATE_PREBIVALISTE(payload.payload));
                break;
            }
            case 'boraviste': {
                await conn.promise().execute(queryStrings.UPDATE_BORAVISTE(payload.payload));
                break;
            }
            case 'srednjeObrazovanje': {
                await conn.promise().execute(queryStrings.ADD_SREDNJA_SKOLA(payload.payload));
                await conn.promise().execute(queryStrings.UPDATE_SREDNJA_SKOLA(payload.payload));
                break;
            }
            case 'visokoObrazovanje': {
                await conn.promise().execute(queryStrings.ADD_FAKULTET(payload.payload));
                await conn.promise().execute(queryStrings.UPDATE_FAKULTET(payload.payload));
                break;
            }
        }

        mysql.pool.releaseConnection(conn);
        res.status(200);
        res.json(payload);
        res.send();
    });
}

async function updateIskustva(res, payload) {
    await mysql.pool.getConnection(async (err, conn) => {
        switch (payload.field) {
            case 'radnoIskustvo': {
                await conn.promise().execute(queryStrings.ADD_ORGANIZACIJA(payload.payload.kompanija));
                await conn.promise().execute(queryStrings.EDIT_RADNO_ISKUSTVO(payload.payload));
                break;
            }
            case 'radNaProjektu': {
                await conn.promise().execute(queryStrings.EDIT_RAD_NA_PROJEKTU(payload.payload));
                break;
            }
            case 'strucnoUsavrsavanje': {
                await conn.promise().execute(queryStrings.ADD_ORGANIZACIJA(payload.payload.organizator));
                await conn.promise().execute(queryStrings.EDIT_STRUCNO_USAVRSAVANJE(payload.payload));
                break;
            }
            case 'radNaRacunaru': {
                await conn.promise().execute(queryStrings.EDIT_RAD_NA_RACUNARU(payload.payload));
                break;
            }
            case 'poznavanjeJezika': {
                await conn.promise().execute(queryStrings.ADD_JEZIK(payload.payload));
                await conn.promise().execute(queryStrings.EDIT_GOVORI(payload.payload));
                break;
            }
        }

        mysql.pool.releaseConnection(conn);
        res.status(200);
        res.json(payload);
        res.send();
    });
}

async function addSrednja(res, payload) {
    await mysql.pool.getConnection(async (err, conn) => {
        console.log(payload);
        await conn.promise().execute(queryStrings.REGISTER_USER_DRZAVA(payload.payload.drzava));
        await conn.promise().execute(queryStrings.REGISTER_USER_GRAD(payload.payload.grad));
        await conn.promise().execute(queryStrings.ADD_SREDNJA_SKOLA(payload.payload));
        await conn.promise().execute(queryStrings.ADD_IDE_U_SREDNJU(payload.payload));
        const srednjaID = await conn.promise().execute(queryStrings.GET_SREDNJE_OBRAZOVANJE_ID(payload.payload.naziv, payload.payload.userID, payload.payload.smer, payload.payload.godinaZavrsetka));

        temp = JSON.stringify(srednjaID[0]);
        const srednjaIDParsed = JSON.parse(temp);

        console.log(srednjaIDParsed);

        const data = {
            field: payload.field,
            payload: {
                naziv: payload.payload.naziv,
                tip: payload.payload.tip,
                drzava: payload.payload.drzava,
                grad: payload.payload.grad,
                smer: payload.payload.smer,
                godinaZavrsetka: payload.payload.godinaZavrsetka,
                id: srednjaIDParsed[0].ID
            }
        }

        mysql.pool.releaseConnection(conn);
        res.status(200);
        res.json(data);
        res.send();
    });
}

async function addFakultet(res, payload) {
    await mysql.pool.getConnection(async (err, conn) => {
        console.log(payload.payload);
        await conn.promise().execute(queryStrings.REGISTER_USER_DRZAVA(payload.payload.drzava));
        await conn.promise().execute(queryStrings.REGISTER_USER_GRAD(payload.payload.grad));
        await conn.promise().execute(queryStrings.ADD_FAKULTET(payload.payload));
        await conn.promise().execute(queryStrings.ADD_STUDIRA(payload.payload));
        const faksID = await conn.promise().execute(queryStrings.GET_VISOKO_OBRAZOVANJE_ID(payload.payload));

        temp = JSON.stringify(faksID[0]);
        const faksIDParsed = JSON.parse(temp);

        const data = {
            field: payload.field,
            payload: {
                drzava: payload.payload.drzava,
                grad: payload.payload.grad,
                univerzitet: payload.payload.univerzitet,
                fakultet: payload.payload.fakultet,
                smer: payload.payload.smer,
                status: payload.payload.status,
                godinaUpisa: payload.payload.godinaUpisa,
                godineStudija: payload.payload.godineStudija,
                brojPolozenihIspita: payload.payload.brojPolozenihIspita,
                prosek: payload.payload.prosek,
                espb: payload.payload.espb,
                id: faksIDParsed[0].ID
            }
        }

        mysql.pool.releaseConnection(conn);
        res.status(200);
        res.json(data);
        res.send();
    });
}

async function addIskustvo(res, payload) {
    await mysql.pool.getConnection(async (err, conn) => {
        console.log(payload.payload);
        switch (payload.field) {
            case 'radnoIskustvo': {
                await conn.promise().execute(queryStrings.ADD_ORGANIZACIJA(payload.payload.kompanija));
                await conn.promise().execute(queryStrings.ADD_RADNO_ISKUSTVO(payload.payload));
                const radnoIskustvoID = await conn.promise().execute(queryStrings.GET_RADNO_ISKUSTVO_ID(payload.payload));

                temp = JSON.stringify(radnoIskustvoID[0]);
                const radnoIskustvoIDParsed = JSON.parse(temp);

                const data = {
                    field: payload.field,
                    payload: {
                        id: radnoIskustvoIDParsed[0].radnoIskustvoID,
                        kompanija: payload.payload.kompanija,
                        datumPocetka: payload.payload.datumPocetka,
                        datumZavrsetka: payload.payload.datumZavrsetka,
                        funkcija: payload.payload.funkcija,
                        opis: payload.payload.opis,
                        userID: payload.payload.userID
                    }
                }
                mysql.pool.releaseConnection(conn);
                res.status(200);
                res.json(data);
                res.send();
                break;
            }
            case 'radNaProjektu': {
                await conn.promise().execute(queryStrings.ADD_RAD_NA_PROJEKTU(payload.payload));
                const radNaProjektuID = await conn.promise().execute(queryStrings.GET_RAD_NA_PROJEKTU_ID(payload.payload));

                temp = JSON.stringify(radNaProjektuID[0]);
                const radNaProjektuIDParsed = JSON.parse(temp);

                const data = {
                    field: payload.field,
                    payload: {
                        id: radNaProjektuIDParsed[0].projekatID,
                        naziv: payload.payload.naziv,
                        datumPocetka: payload.payload.datumPocetka,
                        datumZavrsetka: payload.payload.datumZavrsetka,
                        uloga: payload.payload.uloga,
                        opis: payload.payload.opis,
                        userID: payload.payload.userID
                    }
                }
                mysql.pool.releaseConnection(conn);
                res.status(200);
                res.json(data);
                res.send();
                break;
            }
            case 'strucnoUsavrsavanje': {
                await conn.promise().execute(queryStrings.ADD_ORGANIZACIJA(payload.payload.organizator));
                await conn.promise().execute(queryStrings.ADD_STRUCNO_USAVRSAVANJE(payload.payload));
                const strucnoUsavrsavanjeID = await conn.promise().execute(queryStrings.GET_STRUCNO_USAVRSAVANJE_ID(payload.payload));

                temp = JSON.stringify(strucnoUsavrsavanjeID[0]);
                const strucnoUsavrsavanjeIDParsed = JSON.parse(temp);

                const data = {
                    field: payload.field,
                    payload: {
                        id: strucnoUsavrsavanjeIDParsed[0].radnoIskustvoID,
                        organizator: payload.payload.organizator,
                        datumPocetka: payload.payload.datumPocetka,
                        datumZavrsetka: payload.payload.datumZavrsetka,
                        sertifikat: payload.payload.sertifikat,
                        opis: payload.payload.opis,
                        userID: payload.payload.userID,
                        naziv: payload.payload.naziv
                    }
                }
                mysql.pool.releaseConnection(conn);
                res.status(200);
                res.json(data);
                res.send();
                break;
            }
            case 'radNaRacunaru': {
                await conn.promise().execute(queryStrings.ADD_RAD_NA_RACUNARU(payload.payload));
                const radNaRacunaruID = await conn.promise().execute(queryStrings.GET_RAD_NA_RACUNARU_ID(payload.payload));

                temp = JSON.stringify(radNaRacunaruID[0]);
                const radNaRacunaruIDParsed = JSON.parse(temp);

                const data = {
                    field: payload.field,
                    payload: {
                        id: radNaRacunaruIDParsed[0].projekatID,
                        naziv: payload.payload.naziv,
                        nivo: payload.payload.nivo,
                        sertifikat: payload.payload.sertifikat,
                        userID: payload.payload.userID
                    }
                }
                mysql.pool.releaseConnection(conn);
                res.status(200);
                res.json(data);
                res.send();
                break;
            }
            case 'poznavanjeJezika': {
                await conn.promise().execute(queryStrings.ADD_JEZIK(payload.payload));
                await conn.promise().execute(queryStrings.ADD_GOVORI(payload.payload));
                const govoriID = await conn.promise().execute(queryStrings.GET_GOVORI_ID(payload.payload));

                temp = JSON.stringify(govoriID[0]);
                const govoriIDParsed = JSON.parse(temp);

                const data = {
                    field: payload.field,
                    payload: {
                        id: govoriIDParsed[0].govoriID,
                        jezik: payload.payload.jezik,
                        nivoGovora: payload.payload.nivoGovora,
                        nivoRazumevanja: payload.payload.nivoRazumevanja,
                        nivoCitanja: payload.payload.nivoCitanja,
                        nivoPisanja: payload.payload.nivoPisanja,
                        sertifikat: payload.payload.sertifikat,
                        userID: payload.payload.userID
                    }
                }
                mysql.pool.releaseConnection(conn);
                res.status(200);
                res.json(data);
                res.send();
                break;
            }
        }
    });
}

async function updateReturn(res, field, id) {
    await mysql.pool.getConnection(async (err, conn) => {
        switch (field) {
            case 'licniPodaci': {
                const licniPodaci = await conn.promise().execute(queryStrings.GET_LICNI_PODACI_BY_USERID + id);
                console.log(id);
                console.log(licniPodaci[0]);
                temp = JSON.stringify(licniPodaci[0]);
                const licniPodaciParsed = JSON.parse(temp);

                const payload = {
                    ime: licniPodaciParsed[0].ime,
                    prezime: licniPodaciParsed[0].prezime,
                    imeRoditelja: licniPodaciParsed[0].imeRoditelja,
                    datumRodjenja: licniPodaciParsed[0].datumRodjenja,
                    profilnaSlika: licniPodaciParsed[0].profilnaSlika,
                    cv: licniPodaci[0].cv
                }
                res.json(payload);
                res.status(200);
                res.send();
                mysql.pool.releaseConnection(conn);
            }
        }
    });
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

async function getUser(res, results, token) {
    await mysql.pool.getConnection(async (err, conn) => {
        let user
        if (results[0] != undefined) {
            user = await conn.promise().execute(queryStrings.GET_USER(results[0].email));
        } else {
            user = await conn.promise().execute(queryStrings.GET_USER_BY_ID + results.userID);
        }

        let temp = JSON.stringify(user[0]);
        const userParsed = JSON.parse(temp);

        let licniPodaci = await conn.promise().execute(queryStrings.GET_LICNI_PODACI_BY_USERID + userParsed[0].userID);
        temp = JSON.stringify(licniPodaci[0]);
        const licniPodaciParsed = JSON.parse(temp);

        let cv = await conn.promise().execute(queryStrings.GET_CV(userParsed[0].userID));

        temp = JSON.stringify(cv[0]);
        const cvParsed = JSON.parse(temp);

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
        const srednjaSkolaParsed = JSON.parse(temp);

        temp = JSON.stringify(fakultet[0]);
        const fakultetParsed = JSON.parse(temp);

        temp = JSON.stringify(radnoIskustvo[0]);
        const radnoIskustvoParsed = JSON.parse(temp);

        temp = JSON.stringify(strucnoUsavrsavanje[0]);
        const strucnoUsavrsavanjeParsed = JSON.parse(temp);

        temp = JSON.stringify(radNaRacunaru[0]);
        const radNaRacunaruParsed = JSON.parse(temp);

        temp = JSON.stringify(radNaProjektu[0]);
        const radNaProjektuParsed = JSON.parse(temp);

        temp = JSON.stringify(poznavanjeJezika[0]);
        const poznavanjeJezikaParsed = JSON.parse(temp);

        temp = JSON.stringify(ostaleVestine[0]);
        const ostaleVestineParsed = JSON.parse(temp);

        let payload = {
            userID: userParsed[0].userID,
            email: userParsed[0].email,
            licniPodaci: {
                ime: licniPodaciParsed[0].ime,
                prezime: licniPodaciParsed[0].prezime,
                imeRoditelja: licniPodaciParsed[0].imeRoditelja,
                datumRodjenja: licniPodaciParsed[0].datumRodjenja,
                cv: cvParsed[0] == undefined || cvParsed[0].cv == '' || cvParsed[0].cv == 'null' ? null : cvParsed[0].cv,
                profilnaSlika: licniPodaciParsed[0].profilnaSlika == '' || licniPodaciParsed[0].cv == 'null' ? null : licniPodaciParsed[0].profilnaSlika
            },
            kontakt: {
                telefon: licniPodaciParsed[0].telefon,
                linkedIn: licniPodaciParsed[0].linkedIn
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
            visokoObrazovanje: fakultetParsed,
            iskustvo: {
                radnoIskustvo: radnoIskustvoParsed,
                strucnoUsavrsavanje: strucnoUsavrsavanjeParsed,
                radNaRacunaru: radNaRacunaruParsed,
                radNaProjektu: radNaProjektuParsed,
                poznavanjeJezika: poznavanjeJezikaParsed,
                ostaleVestine: ostaleVestineParsed
            },
            token: token,
            status: 200
        }
        mysql.pool.releaseConnection(conn);
        res.status(200);
        res.json(payload);
        res.send();
    });
}

async function upload(req, res, repo, mode) {
    try {
        var form = new formidable.IncomingForm();
        form.parse(req, async function (err, fields, files) {
            var oldpath = files.fileUpload.path;
            var newpath = queryStrings.REPO_PATH + repo + req.query.userid + '_-' + files.fileUpload.name.replace(/ /g, "_");
            mv(oldpath, newpath, function (err) {
                if (err) throw err;
            });
            await mysql.pool.getConnection(async (err, conn) => {
                if (mode == 'picture') {
                    await conn.promise().execute(queryStrings.ADD_PICTURE('http://server.jobfairnis.rs/users/returnpicture/?file=' + req.query.userid + '_-' + files.fileUpload.name.replace(/ /g, "_"), req.query.userid));
                    const data = {
                        profilnaSlika: 'http://server.jobfairnis.rs/users/returnpicture/?file=' + req.query.userid + '_-' + files.fileUpload.name.replace(/ /g, "_")
                    }
                    res.status(200);
                    res.json(data);
                    res.send();
                } else if (mode == 'cv') {
                    await conn.promise().execute(queryStrings.ADD_CV('http://server.jobfairnis.rs/users/returncv/?file=' + req.query.userid + '_-' + files.fileUpload.name.replace(/ /g, "_"), req.query.userid));
                    const data = {
                        cv: 'http://server.jobfairnis.rs/users/returncv/?file=' + req.query.userid + '_-' + files.fileUpload.name.replace(/ /g, "_")
                    }
                    res.status(200);
                    res.json(err);
                    res.send();
                }
                mysql.pool.releaseConnection(conn);
            });
        });
    } catch (err) {
        res.json(err.message);
        res.send();
    }

}

async function execFile(res, path) {
    try {
        res.sendFile(path);
    } catch (err) {
        res.status(500);
        res.send(err.message);
    }
}

async function getStats(res) {
    await mysql.pool.getConnection(async (err, conn) => {
        const postaviliCV = await conn.promise().execute(queryStrings.STATS_HAS_CV());

        temp = JSON.stringify(postaviliCV[0]);
        const postaviliCVParsed = JSON.parse(temp);

        const top10 = await conn.promise().execute(queryStrings.STATS_TOP_10());

        temp = JSON.stringify(top10[0]);
        const top10Parsed = JSON.parse(temp);

        const totalUsers = await conn.promise().execute(queryStrings.STATS_TOTAL_USERS());

        temp = JSON.stringify(totalUsers[0]);
        const totalUsersParsed = JSON.parse(temp);

        console.log(postaviliCVParsed[0].broj);

        const nisuPostaviliCV = totalUsersParsed[0].broj - postaviliCVParsed[0].broj;

        console.log(nisuPostaviliCV);

        const payload = {
            cv: {
                postavili: postaviliCVParsed[0].broj,
                nisuPostavili: nisuPostaviliCV
            },
            top10: top10Parsed,
            totalUsers: { broj: totalUsersParsed[0].broj }
        };

        res.json(payload);
        res.send();

        mysql.pool.releaseConnection(conn);
    });
}

async function filter(req, res) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const yos = req.body.yos;
    const grade = req.body.grade;
    const faculty = req.body.faculty;
    const permanentResidenceCity = req.body.permanentResidenceCity;
    const temporaryResidenceCity = req.body.temporaryResidenceCity;
    const permanentResidenceCountry = req.body.permanentResidenceCountry;
    const temporaryResidenceCountry = req.body.temporaryResidenceCountry;
    const cv = req.body.cv;

    console.log(req.body);

    let queryString = queryStrings.GET_USERS;


    if (yos != '' || grade != '' || faculty != '') {
        queryString = queryString + " " + queryStrings.JOIN_STUDIES();
    }

    if (faculty != '') {
        queryString = queryString + " " + queryStrings.JOIN_FACULTY();
    }

    if (permanentResidenceCity != '') {
        queryString = queryString + " " + queryStrings.JOIN_PERMANENT_RESIDENCE_CITY();
    }

    if (temporaryResidenceCity != '') {
        queryString = queryString + " " + queryStrings.JOIN_RESIDENCE_CITY();
    }

    if (permanentResidenceCountry != '') {
        queryString = queryString + " " + queryStrings.JOIN_PERMANENT_RESIDENCE_COUNTRY();
    }

    if (temporaryResidenceCountry != '') {
        queryString = queryString + " " + queryStrings.JOIN_RESIDENCE_COUNTRY();
    }

    if (cv != '') {
        queryString = queryString + ' ' + queryStrings.JOIN_CV();
    }

    if (firstName != '' || lastName != '' || yos != '' || grade != '' || faculty != '' || permanentResidenceCity != '' || temporaryResidenceCity != ''
        || permanentResidenceCountry != '' || temporaryResidenceCountry != '' || cv != '') {

        queryString = queryString + " WHERE ";
    }

    if (firstName != '') {
        queryString = queryString + " " + queryStrings.FILTER_BY_NAME(firstName);

        if (lastName != '' || yos != '' || grade != '' || faculty != '' || permanentResidenceCity != '' || temporaryResidenceCity != ''
            || permanentResidenceCountry != '' || temporaryResidenceCountry != '' || cv != '') {

            queryString = queryString + ' AND ';
        }
    }

    if (lastName != '') {
        queryString = queryString + " " + queryStrings.FILTER_BY_LAST_NAME(lastName);

        if (yos != '' || grade != '' || faculty != '' || permanentResidenceCity != '' || temporaryResidenceCity != ''
            || permanentResidenceCountry != '' || temporaryResidenceCountry != '' || cv != '') {

            queryString = queryString + ' AND ';
        }
    }

    if (yos != '') {
        queryString = queryString + " " + queryStrings.FILTER_BY_YOS(yos);

        if (grade != '' || faculty != '' || permanentResidenceCity != '' || temporaryResidenceCity != '' || permanentResidenceCountry != ''
            || temporaryResidenceCountry != '' || cv != '') {

            queryString = queryString + ' AND ';
        }
    }

    if (grade != '') {
        queryString = queryString + " " + queryStrings.FILTER_BY_GRADE_AVERAGE(grade);

        if (faculty != '' || permanentResidenceCity != '' || temporaryResidenceCity != '' || permanentResidenceCountry != ''
            || temporaryResidenceCountry != '' || cv != '') {

            queryString = queryString + ' AND ';
        }
    }

    if (faculty != '') {
        queryString = queryString + " " + queryStrings.FILTER_BY_FACULTY(faculty);

        if (permanentResidenceCity != '' || temporaryResidenceCity != '' || permanentResidenceCountry != ''
            || temporaryResidenceCountry != '' || cv != '') {

            queryString = queryString + ' AND ';
        }
    }

    if (permanentResidenceCity != '') {
        queryString = queryString + " " + queryStrings.FILTER_BY_PERMANENT_RESIDENCE_CITY(permanentResidenceCity);

        if (temporaryResidenceCity != '' || permanentResidenceCountry != '' || temporaryResidenceCountry != '' || cv != '') {
            queryString = queryString + ' AND ';
        }
    }

    if (temporaryResidenceCity != '') {
        queryString = queryString + " " + queryStrings.FILTER_BY_RESIDENCE_CITY(temporaryResidenceCity);

        if (permanentResidenceCountry != '' || temporaryResidenceCountry != '' || cv != '') {
            queryString = queryString + ' AND ';
        }
    }

    if (permanentResidenceCountry != '') {
        queryString = queryString + " " + queryStrings.FILTER_BY_PERMANENT_RESIDENCE_COUNTRY(permanentResidenceCountry);

        if (temporaryResidenceCountry != '' || cv != '') {
            queryString = queryString + ' AND ';
        }
    }

    if (temporaryResidenceCountry != '') {
        queryString = queryString + " " + queryStrings.FILTER_BY_RESIDENCE_COUNTRY(temporaryResidenceCountry);

        if (cv != '') {
            queryString = queryString + ' AND ';
        }
    }

    if (cv != '') {
        queryString = queryString + " " + queryStrings.FILTER_BY_CV();
    }

    queryString = queryString + " " + 'GROUP BY licni.userID';

    console.log(queryString);

    await mysql.pool.getConnection(async (err, conn) => {
        const filteredUsers = await conn.promise().execute(queryString);
        temp = JSON.stringify(filteredUsers[0]);
        const filteredUsersParsed = JSON.parse(temp);

        const payload = {
            filteredUsers: filteredUsersParsed,
            filters: { ...req.body, cv: cv === '' ? false : true }
        }

        res.json(payload);
        res.send();

        mysql.pool.releaseConnection(conn);
    });

}

async function filterOptions(res) {
    await mysql.pool.getConnection(async (err, conn) => {
        const drzave = await conn.promise().execute(queryStrings.GET_ALL_COUNTRIES());
        temp = JSON.stringify(drzave[0]);
        const drzaveParsed = JSON.parse(temp);

        const gradovi = await conn.promise().execute(queryStrings.GET_ALL_CITIES());
        temp = JSON.stringify(gradovi[0]);
        const gradoviParsed = JSON.parse(temp);

        const fakulteti = await conn.promise().execute(queryStrings.GET_ALL_FACULTIES());
        temp = JSON.stringify(fakulteti[0]);
        const fakultetiParsed = JSON.parse(temp);

        const payload = {
            drzave: drzaveParsed,
            gradovi: gradoviParsed,
            fakulteti: fakultetiParsed
        }

        res.json(payload);
        res.send();

        mysql.pool.releaseConnection(conn);
    });
}

async function getHistory(res) {
    await mysql.pool.getConnection(async (err, conn) => {
        const history = await conn.promise().execute(queryStrings.GET_ALL_COUNTRIES());
        temp = JSON.stringify(history[0]);
        const historyParsed = JSON.parse(temp);

        

        mysql.pool.releaseConnection(conn);
    });
}

module.exports = {
    execLogin,
    exec,
    get,
    getUser,
    execRegister,
    updateReturn,
    update,
    addSrednja,
    addFakultet,
    addIskustvo,
    updateIskustva,
    verifyAccount,
    newPassword,
    resetPassword,
    upload,
    execFile,
    getStats,
    filter,
    filterOptions
}
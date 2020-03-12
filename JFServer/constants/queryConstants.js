const sha = require('sha.js');

/* REPO */
const REPO_PATH = __dirname.substring(0, __dirname.indexOf('\\constants')) + '/repo';

/* USERS */
function CHECK_USER(payload) {
    return `SELECT userID, email, aktiviran, oldAcc
            FROM user 
            WHERE email = '${payload.email}' AND 
                  password = '${sha('sha256').update(payload.password).digest('hex')}'`;
}

function REGISTER_USER_DRZAVA(payload) {
    return `INSERT INTO drzava (naziv) 
            SELECT '${payload}' 
            WHERE   (
                        SELECT drzavaID 
                        FROM drzava 
                        WHERE naziv = '${payload}' LIMIT 1
                    ) IS NULL;`
}

function REGISTER_USER_GRAD(payload) {
    return `INSERT INTO grad (naziv) 
            SELECT '${payload}' 
            WHERE   (
                        SELECT gradID 
                        FROM grad 
                        WHERE naziv = '${payload}' LIMIT 1
                    ) IS NULL;`
}

function REGISTER_USER_USER(email, password, datumRegistracije) {
    return `INSERT INTO user (email, password, datumRegistracije) 
            SELECT  '${email}', 
                    '${sha('sha256').update(password).digest('hex')}', 
                    Convert('${datumRegistracije}', DATETIME)`;
}

function REGISTER_USER_LICNI_PODACI(email, ime, prezime, imeRoditelja, datumRodjenja, boraviste, prebivaliste, kontakt, datumRegistracije) {
    return `INSERT INTO licniPodaci (userID, ime, imeRoditelja, prezime, datumRodjenja, prebivalisteDrzavaID, prebivalisteGradID, prebivalisteAdresa, boravisteDrzavaID, boravisteGradID, boravisteAdresa, telefon, linkedIn, datumAzuriranja)
            SELECT  (
                        SELECT userID 
                        FROM user 
                        WHERE email = '${email}'
                    ), 
                    '${ime}', 
                    '${imeRoditelja}', 
                    '${prezime}', 
                    Convert('${datumRodjenja}', DATE), 
                    (
                        SELECT drzavaID 
                        FROM drzava 
                        WHERE naziv = '${prebivaliste.drzava}' LIMIT 1
                    ), 
                    (
                        SELECT gradID 
                        FROM grad 
                        WHERE naziv = '${prebivaliste.grad}' LIMIT 1
                    ), 
                    '${prebivaliste.adresa}', 
                    (
                        SELECT drzavaID 
                        FROM drzava 
                        WHERE naziv = '${boraviste.drzava}' LIMIT 1
                    ), 
                    (
                        SELECT gradID 
                        FROM grad 
                        WHERE naziv = '${boraviste.grad}' LIMIT 1
                    ), 
                    '${boraviste.adresa}', 
                    '${kontakt.telefon}', 
                    '${kontakt.linkedIn}', 
                    Convert('${datumRegistracije}', DATETIME) 
            WHERE   (
                        SELECT id 
                        FROM licniPodaci 
                        WHERE userID =  (
                                            SELECT userID 
                                            FROM user 
                                            WHERE email = '${email}'
                                        )
                    ) IS NULL;`;
}

function REGISTER_TOKEN (token, email){
    return `INSERT INTO userRegisterToken (userID, token) 
            SELECT  (
                        SELECT userID 
                        FROM user 
                        WHERE email = '${email}'
                    ), 
                    '${token}';`;
}

function CHECK_REGISTER_TOKEN (token){
    return `SELECT userID 
            FROM userRegisterToken 
            WHERE token = '${token}'`;
}

function ACTIVATE_USER (token){
    return `UPDATE user 
            SET aktiviran = 1 
            WHERE userID =  (
                                SELECT userID 
                                FROM userRegisterToken 
                                WHERE token = '${token}'
                            );`;
}

function DELETE_REGISTER_TOKEN (token){
    return `DELETE FROM userRegisterToken 
            WHERE token = '${token}'`;
}

function CHECK_EMAIL (email){
    return `SELECT * FROM user 
            WHERE email = '${email}'`;
}

function PASSWORD_TOKEN (token, email){
    return `INSERT INTO forgotPassword (userID, token) 
            SELECT  (
                        SELECT userID 
                        FROM user 
                        WHERE email = '${email}' LIMIT 1
                    ), 
                    '${token}';`;
}

function CHECK_PASSWORD_TOKEN (token){
    return `SELECT userID FROM forgotPassword 
            WHERE token = '${token}'`;
}

function DELETE_PASSWORD_TOKEN (token){
    return `DELETE FROM forgotPassword 
            WHERE token = '${token}'`;
}

function CHANGE_PASSWORD (password, userID) {
    return `UPDATE user 
            SET password = '${sha('sha256').update(password).digest('hex')}' 
            WHERE userID = ${userID};`;
}

function GET_OLD_ACC_TOKEN (userID) {
    return `SELECT oldAcc 
            FROM user
            WHERE userID = ${userID}`;
}

function UPDATE_OLD_ACC_TOKEN (userID) {
    return `UPDATE user
            SET oldAcc = 0
            WHERE userID = ${userID}`;
}

const GET_USERS = `SELECT userID, ime, prezime FROM licniPodaci`;
const GET_USER_BY_ID = `SELECT userID, email FROM user WHERE userID = `;
function GET_USER(email) {
    return `SELECT userID, email 
            FROM user 
            WHERE email = '${email}'`;
}
const GET_LICNI_PODACI_BY_USERID = `SELECT * FROM licniPodaci WHERE userID = `;
const GET_GRAD = `SELECT * FROM grad where gradID = `;
function GET_GRAD_BY_NAZIV(naziv) {
    return `SELECT * FROM grad 
            WHERE naziv = '${naziv}'`;
}
const GET_DRZAVA = `SELECT * FROM drzava WHERE drzavaID = `;
function GET_DRZAVA_BY_NAZIV(naziv) {
    return `SELECT * FROM grad 
            WHERE gradID = '${naziv}'`;
}

function GET_SREDNJA_SKOLA(userID) {
    return `SELECT
                ideUSrednju.ID as id,
                ideUSrednju.godinaZavrsetka,
                srednjaSkola.naziv,
                grad.naziv as grad,
                drzava.naziv as drzava,
                ideUSrednju.smer,
                srednjaSkola.tip
            FROM ideUSrednju
            INNER JOIN srednjaSkola ON ideUSrednju.srednjaID = srednjaSkola.srednjaSkolaID
            INNER JOIN grad ON srednjaSkola.gradID = grad.gradID
            INNER JOIN drzava ON srednjaSkola.drzavaID = drzava.drzavaID
            WHERE userID = ${userID}`;
}
function GET_FAKULTET(userID) {
    return `SELECT 
                studira.ID as id,
                studira.godinaUpisa,
                studira.brojPolozenihIspita,
                studira.prosek,
                studira.status,
                fakultetSmer.naziv as smer,
                fakultet.naziv as fakultet,
                univerzitet.naziv as univerzitet, 
                grad.naziv as grad,
                drzava.naziv as drzava,
                studira.godineStudija,
                studira.espb
            FROM studira
            INNER JOIN fakultetSmer ON studira.smerID = fakultetSmer.smerID
            INNER JOIN fakultet ON studira.fakultetID = fakultet.fakultetID
            INNER JOIN univerzitet ON fakultet.univerzitetID = univerzitet.univerzitetID
            INNER JOIN grad ON univerzitet.gradID = grad.gradID
            INNER JOIN drzava ON univerzitet.drzavaID = drzava.drzavaID
            WHERE studira.userID = ${userID}`;
}
function GET_RADNO_ISKUSTVO(userID) {
    return `SELECT
                radnoIskustvo.radnoIskustvoID as id,
                radnoIskustvo.datumPocetka,
                radnoIskustvo.datumZavrsetka,
                radnoIskustvo.pozicija as funkcija,
                radnoIskustvo.opisPosla as opis,
                organizacija.imeOrganizacije as kompanija
            FROM radnoIskustvo
            INNER JOIN organizacija ON radnoIskustvo.organizacijaID = organizacija.organizacijaID
            WHERE userID = ${userID}`;
}
function GET_STRUCNO_USAVRSAVANJE(userID) {
    return `SELECT
                strucnoUsavrsavanje.strucnoUsavrsavanjeID as id,
                strucnoUsavrsavanje.naziv,
                organizacija.imeOrganizacije as organizator,
                strucnoUsavrsavanje.datumPocetka,
                strucnoUsavrsavanje.datumZavrsetka,
                strucnoUsavrsavanje.opis,
                strucnoUsavrsavanje.sertifikat
            FROM strucnoUsavrsavanje
            INNER JOIN organizacija ON strucnoUsavrsavanje.organizacijaID = organizacija.organizacijaID
            WHERE strucnoUsavrsavanje.userID = ${userID}`;
}
function GET_RAD_NA_RACUNARU(userID) {
    return `SELECT
                radNaRacunaruID as id,
                naziv,
                nivo,
                sertifikat
            FROM radNaRacunaru
            WHERE userID = ${userID}`;
}
function GET_RAD_NA_PROJEKTU(userID) {
    return `SELECT
                projekatID as id,
                naziv,
                uloga,
                datumPocetka,
                datumZavrsetka,
                opis
            FROM radNaProjektu
            WHERE userID = ${userID}`;
}
function GET_POZNAVANJE_JEZIKA(userID) {
    return `SELECT
                jezik.imeJezika as jezik,
                govori.govoriID as id,
                govori.citanje as nivoCitanja,
                govori.pisanje as nivoPisanja,
                govori.razumevanje as nivoRazumevanja,
                govori.govor as nivoGovora,
                govori.sertifikat
            FROM govori
            INNER JOIN jezik ON govori.jezikID = jezik.jezikID
            WHERE govori.userID = ${userID}`;
}
function GET_OSTALE_VESTINE(userID) {
    return `SELECT
                ostaleVestineID,
                vozackeDozvole,
                vestine,
                osobine,
                interesovanja
            FROM ostaleVestine
            WHERE userID = ${userID}`;
}

function UPDATE_LICNI_PODACI(payload) {
    return `UPDATE licniPodaci 
            SET ime = '${payload.ime}', prezime = '${payload.prezime}', imeRoditelja = '${payload.imeRoditelja}', datumRodjenja = '${payload.datumRodjenja}' 
            WHERE userID = ${payload.userID};`;
}

function UPDATE_KONTAKT(payload) {
    return `UPDATE licniPodaci 
            SET telefon =  '${payload.telefon}', linkedIn = '${payload.linkedIn}' 
            WHERE userID = ${payload.userID};`;
}

function UPDATE_PREBIVALISTE(payload) {
    return `UPDATE licniPodaci 
            SET prebivalisteAdresa = '${payload.adresa}', 
                prebivalisteDrzavaID = (
                    SELECT drzavaID 
                    FROM drzava 
                    WHERE naziv = '${payload.drzava}' LIMIT 1
                ), 
                prebivalisteGradID = (
                    SELECT gradID 
                    FROM grad 
                    WHERE naziv = '${payload.grad}' LIMIT 1
                ) 
            WHERE userID = ${payload.userID}`;
}

function UPDATE_BORAVISTE(payload) {
    return `UPDATE licniPodaci 
            SET boravisteAdresa = '${payload.adresa}', 
            boravisteDrzavaID = (
                SELECT drzavaID FROM drzava 
                WHERE naziv = '${payload.drzava}' LIMIT 1
            ), 
            boravisteGradID = (
                SELECT gradID FROM grad 
                WHERE naziv = '${payload.grad}' LIMIT 1
            ) 
            WHERE userID = ${payload.userID};`;
}

function ADD_SREDNJA_SKOLA(payload) {
    return `INSERT INTO srednjaSkola (naziv, gradID, drzavaID, tip) 
            SELECT '${payload.naziv}', 
                    (
                        SELECT gradID 
                        FROM grad 
                        WHERE naziv = '${payload.grad}' LIMIT 1
                    ), 
                    (
                        SELECT drzavaID 
                        FROM drzava 
                        WHERE naziv = '${payload.drzava}' LIMIT 1
                    ), 
                    '${payload.tip}' 
                    WHERE   (
                                SELECT srednjaSkolaID 
                                FROM srednjaSkola 
                                WHERE naziv = '${payload.naziv}' 
                                    AND tip = '${payload.tip}'
                            ) IS NULL;`;
}

function ADD_IDE_U_SREDNJU(payload) {
    return `INSERT INTO ideUSrednju (srednjaID, godinaZavrsetka, userID, smer) 
            SELECT (
                        SELECT srednjaSkolaID FROM srednjaSkola 
                        WHERE naziv = '${payload.naziv}' 
                            AND tip = '${payload.tip}' LIMIT 1
                    ), 
                    ${payload.godinaZavrsetka}, 
                    ${payload.userID}, 
                    '${payload.smer}' 
            WHERE (
                        SELECT ID 
                        FROM ideUSrednju 
                        WHERE srednjaID =   (
                                                SELECT srednjaSkolaID 
                                                FROM srednjaSkola 
                                                WHERE naziv = '${payload.naziv}'
                                                    AND tip = '${payload.tip}' LIMIT 1
                                            ) 
                            AND smer = '${payload.smer}' 
                            AND userID = ${payload.userID}) IS NULL;`;
}

function GET_SREDNJE_OBRAZOVANJE_ID(naziv, userID, smer, godinaZavrsetka) {
    return `SELECT ID 
            FROM ideUSrednju 
            WHERE srednjaID =   (
                                    SELECT srednjaSkolaID 
                                    FROM srednjaSkola 
                                    WHERE naziv = '${naziv}' LIMIT 1
                                ) 
                AND godinaZavrsetka = ${godinaZavrsetka} 
                AND smer = '${smer}' 
                AND userID = ${userID};`;
}

function ADD_UNIVERZITET(payload) {
    return `INSERT INTO univerzitet (drzavaID, gradID, naziv) 
            SELECT  (
                        SELECT drzavaID 
                        FROM drzava 
                        WHERE naziv = '${payload.drzava}' LIMIT 1
                    ), 
                    (
                        SELECT gradID 
                        FROM grad 
                        WHERE naziv = '${payload.grad}' LIMIT 1
                    ), 
                    '${payload.univerzitet}' 
            WHERE   (
                        SELECT univerzitetID 
                        FROM univerzitet 
                        WHERE naziv = '${payload.univerzitet}' 
                            AND gradID =    (
                                                SELECT gradID 
                                                FROM grad 
                                                WHERE naziv = '${payload.grad}' LIMIT 1
                                            ) 
                            AND drzavaID =  (
                                                SELECT drzavaID 
                                                FROM drzava 
                                                WHERE naziv = '${payload.drzava}' LIMIT 1
                                            )
                    ) IS NULL;`;
}

function ADD_FAKULTET(payload) {
    return `INSERT INTO fakultet (univerzitetID, naziv) 
            SELECT  (
                        SELECT univerzitetID 
                        FROM univerzitet 
                        WHERE naziv = '${payload.univerzitet}' 
                            AND gradID =    (
                                                SELECT gradID 
                                                FROM grad 
                                                WHERE naziv = '${payload.grad}' LIMIT 1
                                            ) 
                            AND drzavaID =  (
                                                SELECT drzavaID 
                                                FROM drzava 
                                                WHERE naziv = '${payload.drzava}' LIMIT 1
                                            ) LIMIT 1
                    ), 
                    '${payload.fakultet}' 
            WHERE   (
                        SELECT fakultetID 
                        FROM fakultet 
                        WHERE naziv = '${payload.fakultet}' 
                            AND univerzitetID =     (
                                                        SELECT univerzitetID 
                                                        FROM univerzitet 
                                                        WHERE naziv = '${payload.univerzitet}' 
                                                            AND gradID =    (
                                                                                SELECT gradID 
                                                                                FROM grad 
                                                                                WHERE naziv = '${payload.grad}' LIMIT 1
                                                                            ) 
                                                            AND drzavaID =  (
                                                                                SELECT drzavaID 
                                                                                FROM drzava 
                                                                                WHERE naziv = '${payload.drzava}' LIMIT 1
                                                                            ) LIMIT 1
                                                    ) LIMIT 1
                    ) IS NULL;`;
}

function ADD_SMER(payload) {
    return `INSERT INTO fakultetSmer (fakultetID, naziv) 
            SELECT  (
                        SELECT fakultetID 
                        FROM fakultet 
                        WHERE naziv = '${payload.fakultet}' LIMIT 1
                    ), 
                    '${payload.smer}' 
            WHERE   (
                        SELECT smerID 
                        FROM fakultetSmer 
                        WHERE naziv = '${payload.smer}' LIMIT 1
                    ) IS NULL;`;
}

function ADD_STUDIRA(payload) {
    return `INSERT INTO studira (userID, smerID, fakultetID, godinaUpisa, prosek, status, espb, godineStudija, brojPolozenihIspita) 
            SELECT  ${payload.userID},
                    (
                        SELECT smerID 
                        FROM fakultetSmer 
                        WHERE naziv = '${payload.smer}' LIMIT 1
                    ), 
                    (
                        SELECT fakultetID 
                        FROM fakultet 
                        WHERE naziv = '${payload.fakultet}' LIMIT 1
                    ), 
                    ${payload.godinaUpisa}, 
                    ${payload.prosek}, 
                    '${payload.status}', 
                    ${payload.espb}, 
                    ${payload.godineStudija}, 
                    ${payload.brojPolozenihIspita} 
            WHERE   (
                        SELECT ID 
                        FROM studira 
                        WHERE userID = ${payload.userID} 
                            AND fakultetID =    (
                                                    SELECT fakultetID 
                                                    FROM fakultet 
                                                    WHERE naziv = '${payload.fakultet}' LIMIT 1
                                                ) 
                            AND smerID =        (
                                                    SELECT smerID 
                                                    FROM fakultetSmer 
                                                    WHERE smerID = '${payload.smer}' LIMIT 1
                                                ) 
                            AND status = '${payload.status}' LIMIT 1
                    ) IS NULL`;
}

function GET_VISOKO_OBRAZOVANJE_ID(fakultet, smer, userID, status) {
    return `SELECT ID 
            FROM studira 
            WHERE fakultetID =  (
                                    SELECT fakultetID 
                                    FROM fakultet 
                                    WHERE naziv = '${fakultet}' LIMIT 1
                                ) 
                AND smerID =    (
                                    SELECT smerID 
                                    FROM fakultetSmer 
                                    WHERE naziv = '${smer}' LIMIT 1
                                ) 
                AND status = '${status}' 
                AND userID = ${userID};`;
}

function UPDATE_SREDNJA_SKOLA(payload) {
    return `UPDATE ideUSrednju 
            SET srednjaID =     (
                                    SELECT srednjaSkolaID 
                                    FROM srednjaSkola 
                                    WHERE naziv = '${payload.naziv}' 
                                    AND tip = '${payload.tip}' LIMIT 1
                                ), 
                                godinaZavrsetka = ${payload.godinaZavrsetka}, 
                                smer = '${payload.smer}' 
            WHERE ID = ${payload.id}`;
}

function UPDATE_FAKULTET(payload) {
    return `UPDATE studira 
            SET smerID =    (
                                SELECT smerID 
                                FROM fakultetSmer 
                                WHERE naziv = '${payload.smer}' LIMIT 1
                            ), 
            fakultetID =    (
                                SELECT fakultetID 
                                FROM fakultet 
                                WHERE naziv = '${payload.fakultet}' 
                                    AND univerzitetID =     (
                                                                SELECT univerzitetID 
                                                                FROM univerzitet 
                                                                WHERE naziv = '${payload.univerzitet}' 
                                                                AND drzavaID =  (
                                                                                    SELECT drzavaID 
                                                                                    FROM drzava 
                                                                                    WHERE naziv = '${payload.drzava}' LIMIT 1
                                                                                ) 
                                                                AND gradID =    (
                                                                                    SELECT gradID 
                                                                                    FROM grad 
                                                                                    WHERE naziv = '${payload.grad}' LIMIT 1
                                                                                )LIMIT 1
                                                            ) LIMIT 1
                            ), 
            godinaUpisa = ${payload.godinaUpisa}, 
            prosek = ${payload.prosek}, 
            status = '${payload.status}', 
            godineStudija = ${payload.godineStudija}, 
            brojPolozenihIspita = ${payload.brojPolozenihIspita}, 
            espb = ${payload.espb} 
            WHERE ID = ${payload.id};`;
}

function DELETE_SREDNJA_SKOLA(payload) {
    return `DELETE FROM ideUSrednju 
            WHERE ID = ${payload};`;
}

function DELETE_FAKULTET(payload) {
    return `DELETE FROM studira 
            WHERE ID = ${payload};`;
}

function ADD_ORGANIZACIJA(payload) {
    return `INSERT INTO organizacija (imeOrganizacije) 
            SELECT '${payload}' 
            WHERE   (
                        SELECT organizacijaID 
                        FROM organizacija 
                        WHERE imeOrganizacije = '${payload}' LIMIT 1
                    ) IS NULL;`
}

function ADD_RADNO_ISKUSTVO(payload) {
    return `INSERT INTO radnoIskustvo (userID, organizacijaID, datumPocetka, datumZavrsetka, pozicija, opisPosla) 
            SELECT ${payload.userID}, 
            (
                SELECT organizacijaID 
                FROM organizacija 
                WHERE imeOrganizacije = '${payload.kompanija}' LIMIT 1
            ), 
            '${payload.datumPocetka}', 
            '${payload.datumZavrsetka}', 
            '${payload.funkcija}', 
            '${payload.opis}';`;
}

function GET_RADNO_ISKUSTVO_ID(payload) {
    return `SELECT radnoIskustvoID 
            FROM radnoIskustvo 
            WHERE userID = ${payload.userID} 
                AND organizacijaID =    (
                                            SELECT organizacijaID 
                                            FROM organizacija 
                                            WHERE imeOrganizacije = '${payload.kompanija}' LIMIT 1
                                        ) 
                AND datumPocetka = '${payload.datumPocetka}' 
                AND datumZavrsetka = '${payload.datumZavrsetka}' 
                AND pozicija = '${payload.funkcija}'`;
}

function DELETE_RADNO_ISKUSTVO(payload) {
    return `DELETE FROM radnoIskustvo 
            WHERE radnoIskustvoID = ${payload}`;
}

function EDIT_RADNO_ISKUSTVO(payload) {
    return `UPDATE radnoIskustvo 
            SET organizacijaID =    (
                                        SELECT organizacijaID 
                                        FROM organizacija 
                                        WHERE imeOrganizacije = '${payload.kompanija}' LIMIT 1
                                    ), 
                datumPocetka = '${payload.datumPocetka}', 
                datumZavrsetka = '${payload.datumZavrsetka}', 
                pozicija = '${payload.funkcija}', 
                opisPosla = '${payload.opis}' 
            WHERE radnoIskustvoID = ${payload.id}`;
}

function ADD_RAD_NA_PROJEKTU(payload) {
    return `INSERT INTO radNaProjektu (naziv, uloga, datumPocetka, datumZavrsetka, opis, userID) 
            SELECT  '${payload.naziv}', 
                    '${payload.uloga}', 
                    '${payload.datumPocetka}', 
                    '${payload.datumZavrsetka}', 
                    '${payload.opis}', 
                    ${payload.userID};`;
}

function GET_RAD_NA_PROJEKTU_ID(payload) {
    return `SELECT projekatID 
            FROM radNaProjektu 
            WHERE   naziv = '${payload.naziv}' 
                AND uloga = '${payload.uloga}' 
                AND datumPocetka = '${payload.datumPocetka}' 
                AND datumZavrsetka = '${payload.datumZavrsetka}' 
                AND userID = ${payload.userID};`;
}

function EDIT_RAD_NA_PROJEKTU(payload) {
    return `UPDATE radNaProjektu 
            SET naziv = '${payload.naziv}', 
                uloga = '${payload.uloga}', 
                datumPocetka = '${payload.datumPocetka}', 
                datumZavrsetka = '${payload.datumZavrsetka}', 
                opis = '${payload.opis}' 
            WHERE projekatID = ${payload.id};`;
}

function DELETE_RAD_NA_PROJEKTU(payload) {
    return `DELETE FROM radNaProjektu 
            WHERE projekatID = ${payload}`;
}

function ADD_STRUCNO_USAVRSAVANJE(payload) {
    return `INSERT INTO strucnoUsavrsavanje (naziv, organizacijaID, datumPocetka, datumZavrsetka, opis, sertifikat, userID) 
            SELECT  '${payload.naziv}', 
                    (
                        SELECT organizacijaID 
                        FROM organizacija 
                        WHERE imeOrganizacije = '${payload.organizator}' LIMIT 1
                    ), 
                    '${payload.datumPocetka}', 
                    '${payload.datumZavrsetka}', 
                    '${payload.opis}', 
                    ${payload.sertifikat}, 
                    ${payload.userID};`;
}

function EDIT_STRUCNO_USAVRSAVANJE(payload) {
    return `UPDATE strucnoUsavrsavanje 
            SET organizacijaID =    (
                                        SELECT organizacijaID 
                                        FROM organizacija 
                                        WHERE imeOrganizacije = '${payload.organizator}' LIMIT 1
                                    ), 
                datumPocetka = '${payload.datumPocetka}', 
                datumZavrsetka = '${payload.datumZavrsetka}', 
                naziv = '${payload.naziv}', 
                opis = '${payload.opis}', 
                sertifikat = ${payload.sertifikat} 
            WHERE strucnoUsavrsavanjeID = ${payload.id}`;
}

function DELETE_STRUCNO_USAVRSAVANJE(payload) {
    return `DELETE FROM strucnoUsavrsavanje 
            WHERE strucnoUsavrsavanjeID = ${payload}`;
}

function GET_STRUCNO_USAVRSAVANJE_ID(payload) {
    return `SELECT strucnoUsavrsavanjeID 
            FROM strucnoUsavrsavanje 
            WHERE userID = ${payload.userID} 
                AND organizacijaID =    (
                                            SELECT organizacijaID 
                                            FROM organizacija 
                                            WHERE imeOrganizacije = '${payload.organizator}' LIMIT 1
                                        ) 
                AND datumPocetka = '${payload.datumPocetka}' 
                AND datumZavrsetka = '${payload.datumZavrsetka}'`;
}

function ADD_RAD_NA_RACUNARU(payload) {
    return `INSERT INTO radNaRacunaru (naziv, nivo, sertifikat, userID) 
            SELECT  '${payload.naziv}', 
                    '${payload.nivo}', 
                    '${payload.sertifikat}', 
                    ${payload.userID};`;
}

function GET_RAD_NA_RACUNARU_ID(payload) {
    return `SELECT radNaRacunaruID 
            FROM radNaRacunaru 
            WHERE naziv = '${payload.naziv}' 
                AND nivo = '${payload.nivo}' 
                AND sertifikat = '${payload.sertifikat}' 
                AND userID = ${payload.userID};`;
}

function EDIT_RAD_NA_RACUNARU(payload) {
    return `UPDATE radNaRacunaru 
            SET naziv = '${payload.naziv}', 
                nivo = '${payload.nivo}', 
                sertifikat = '${payload.sertifikat}' 
            WHERE radNaRacunaruID = ${payload.id};`;
}

function DELETE_RAD_NA_RACUNARU(payload) {
    return `DELETE FROM radNaRacunaru 
            WHERE radNaRacunaruID = ${payload}`;
}

function ADD_JEZIK(payload) {
    return `INSERT INTO jezik (imeJezika) 
            SELECT '${payload.jezik}' 
            WHERE   (
                        SELECT jezikID 
                        FROM jezik
                         WHERE imeJezika = '${payload.jezik}' LIMIT 1
                    ) IS NULL;`;
}

function ADD_GOVORI(payload) {
    return `INSERT INTO govori (userID, jezikID, citanje, pisanje, razumevanje, govor, sertifikat) 
            SELECT  ${payload.userID}, 
                    (
                        SELECT jezikID 
                        FROM jezik 
                        WHERE imeJezika = '${payload.jezik}' LIMIT 1
                    ), 
                    '${payload.nivoCitanja}', 
                    '${payload.nivoPisanja}', 
                    '${payload.nivoRazumevanja}', 
                    '${payload.nivoGovora}', 
                    '${payload.sertifikat}';`;
}

function GET_GOVORI_ID(payload) {
    return `SELECT govoriID 
            FROM govori 
            WHERE userID = ${payload.userID} 
                AND jezikID =   (
                                    SELECT jezikID 
                                    FROM jezik 
                                    WHERE imeJezika = '${payload.jezik}' LIMIT 1
                                );`;
}

function EDIT_GOVORI(payload) {
    return `UPDATE govori 
            SET jezikID =   (
                                SELECT jezikID 
                                FROM jezik 
                                WHERE imeJezika = '${payload.jezik}' LIMIT 1
                            ), 
                citanje = '${payload.nivoCitanja}', 
                pisanje = '${payload.nivoPisanja}', 
                razumevanje = '${payload.nivoRazumevanja}', 
                govor = '${payload.nivoGovora}', 
                sertifikat = '${payload.sertifikat}' 
            WHERE govoriID = ${payload.id};`;
}

function DELETE_GOVORI(payload) {
    return `DELETE FROM govori 
            WHERE govoriID = ${payload}`;
}
function ADD_OSTALE_VESTINE(payload) {
    return `INSERT INTO ostaleVestine (userID, vozackeDozvole, vestine, osobine, interesovanja) 
            SELECT  ${payload.userID}, 
                    '${payload.vozackeDozvole}', 
                    '${payload.vestine}', 
                    '${payload.osobine}', 
                    '${payload.interesovanja}';`;
}

function GET_OSTALE_VESTINE_ID(payload) {
    return `SELECT ostaleVestineID 
            FROM ostaleVestine 
            WHERE userID = '${payload.userID}';`;
}

function EDIT_OSTALE_VESTINE(payload) {
    return `UPDATE ostaleVestine 
            SET vozackeDozvole = '${payload.vozackeDozvole}', 
                vestine = '${payload.vestine}', 
                osobine = '${payload.osobine}', 
                interesovanja = '${payload.interesovanja}' 
            WHERE ostaleVestineID = ${payload.id};`;
}

function DELETE_OSTALE_VESTINE(payload) {
    return `DELETE FROM ostaleVestine 
            WHERE ostaleVestineID = ${payload}`;
}

function ADD_PICTURE (payload, userID) {
    return `UPDATE licniPodaci 
            SET profilnaSlika = '${payload}' 
            WHERE userID = ${userID}`;
}

function ADD_CV (payload, userID) {
    console.log(userID);
    return `UPDATE licniPodaci 
            SET cv = '${payload}' 
            WHERE userID = ${userID}`;
}

/* KOMPANIJA */
function LOGIN_KOMPANIJA(payload) {
    return `SELECT kompanijaID, username 
            FROM kompanija 
            WHERE username = '${payload.username}' 
                AND password = '${payload.password}';`;
}

function STATS_TOP_10 () {
    return `SELECT f.naziv, count(*) as broj
            FROM studira as s
            INNER JOIN fakultet as f
                ON f.fakultetID = s.fakultetID
            GROUP BY f.naziv
            ORDER BY broj DESC
            LIMIT 10`;
}

function STATS_HAS_CV (isEqual) {
    return `SELECT count(l.cv) as broj
            FROM licniPodaci as l
            where l.cv ${isEqual} ''
            ORDER BY broj DESC`;
}

function STATS_TOTAL_USERS () {
    return `SELECT count(u.email) as broj
            FROM user as u`;
}


module.exports = {
    CHECK_USER,
    LOGIN_KOMPANIJA,
    GET_USERS,
    GET_USER,
    GET_LICNI_PODACI_BY_USERID,
    GET_GRAD,
    GET_DRZAVA,
    GET_SREDNJA_SKOLA,
    GET_FAKULTET,
    GET_RADNO_ISKUSTVO,
    GET_STRUCNO_USAVRSAVANJE,
    GET_RAD_NA_RACUNARU,
    GET_RAD_NA_PROJEKTU,
    GET_POZNAVANJE_JEZIKA,
    GET_OSTALE_VESTINE,
    REGISTER_USER_DRZAVA,
    REGISTER_USER_GRAD,
    REGISTER_USER_USER,
    REGISTER_USER_LICNI_PODACI,
    UPDATE_LICNI_PODACI,
    UPDATE_KONTAKT,
    UPDATE_PREBIVALISTE,
    GET_USER_BY_ID,
    UPDATE_BORAVISTE,
    GET_GRAD_BY_NAZIV,
    GET_DRZAVA_BY_NAZIV,
    ADD_SREDNJA_SKOLA,
    ADD_IDE_U_SREDNJU,
    GET_SREDNJE_OBRAZOVANJE_ID,
    ADD_UNIVERZITET,
    ADD_FAKULTET,
    ADD_SMER,
    ADD_STUDIRA,
    GET_VISOKO_OBRAZOVANJE_ID,
    UPDATE_SREDNJA_SKOLA,
    UPDATE_FAKULTET,
    DELETE_SREDNJA_SKOLA,
    DELETE_FAKULTET,
    ADD_ORGANIZACIJA,
    ADD_RADNO_ISKUSTVO,
    GET_RADNO_ISKUSTVO_ID,
    DELETE_RADNO_ISKUSTVO,
    EDIT_RADNO_ISKUSTVO,
    ADD_RAD_NA_PROJEKTU,
    GET_RAD_NA_PROJEKTU_ID,
    EDIT_RAD_NA_PROJEKTU,
    DELETE_RAD_NA_PROJEKTU,
    ADD_STRUCNO_USAVRSAVANJE,
    EDIT_STRUCNO_USAVRSAVANJE,
    DELETE_STRUCNO_USAVRSAVANJE,
    GET_STRUCNO_USAVRSAVANJE_ID,
    ADD_RAD_NA_RACUNARU,
    GET_RAD_NA_RACUNARU_ID,
    EDIT_RAD_NA_RACUNARU,
    DELETE_RAD_NA_RACUNARU,
    ADD_JEZIK,
    ADD_GOVORI,
    GET_GOVORI_ID,
    EDIT_GOVORI,
    DELETE_GOVORI,
    REGISTER_TOKEN,
    CHECK_REGISTER_TOKEN,
    DELETE_REGISTER_TOKEN,
    PASSWORD_TOKEN,
    CHECK_PASSWORD_TOKEN,
    DELETE_PASSWORD_TOKEN,
    CHANGE_PASSWORD,
    ACTIVATE_USER,
    REPO_PATH,
    ADD_PICTURE,
    ADD_CV,
    CHECK_EMAIL,
    GET_OLD_ACC_TOKEN,
    UPDATE_OLD_ACC_TOKEN,
    ADD_OSTALE_VESTINE,
    GET_OSTALE_VESTINE_ID,
    EDIT_OSTALE_VESTINE,
    DELETE_OSTALE_VESTINE,
    STATS_TOP_10,
    STATS_HAS_CV,
    STATS_TOTAL_USERS
}
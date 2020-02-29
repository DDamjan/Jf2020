/* USERS */
function CHECK_USER(payload) {
    return `SELECT userID, email FROM user WHERE email = '${payload.email}' AND password = '${payload.password}'`;
}

function REGISTER_USER_DRZAVA(payload) {
    return `INSERT INTO drzava (naziv) SELECT '${payload}' WHERE (SELECT drzavaID FROM drzava WHERE naziv = '${payload}') IS NULL;`
}

function REGISTER_USER_GRAD(payload) {
    return `INSERT INTO grad (naziv) SELECT '${payload}' WHERE (SELECT gradID FROM grad WHERE naziv = '${payload}') IS NULL;`
}

function REGISTER_USER_USER (email, password, datumRegistracije) {
    return `INSERT INTO user (email, password, datumRegistracije) SELECT '${email}', '${password}', Convert('${datumRegistracije}', DATETIME)`;
}

function REGISTER_USER_LICNI_PODACI (email, ime, prezime, imeRoditelja, datumRodjenja, boraviste, prebivaliste, kontakt, datumRegistracije) {
    return `INSERT INTO licniPodaci (userID, ime, imeRoditelja, prezime, datumRodjenja, prebivalisteDrzavaID, prebivalisteGradID, prebivalisteAdresa, boravisteDrzavaID, boravisteGradID, boravisteAdresa, telefon, linkedIn, datumAzuriranja)
    SELECT (SELECT userID FROM user WHERE email = '${email}'), '${ime}', '${imeRoditelja}', '${prezime}', Convert('${datumRodjenja}', DATE), (SELECT drzavaID FROM drzava WHERE naziv = '${prebivaliste.drzava}'), (SELECT gradID FROM grad WHERE naziv = '${prebivaliste.grad}'), '${prebivaliste.adresa}', (SELECT drzavaID FROM drzava WHERE naziv = '${boraviste.drzava}'), (SELECT gradID FROM grad WHERE naziv = '${boraviste.grad}'), '${boraviste.adresa}', '${kontakt.telefon}', '${kontakt.linkedIn}', Convert('${datumAzuriranja}', DATETIME)`
}


const GET_USERS = `SELECT userID, ime, prezime FROM licniPodaci`;
function GET_USER (email) {
    return `SELECT userID, email FROM user WHERE email = '${email}'`;
}
const GET_LICNI_PODACI_BY_USERID = `SELECT * FROM licniPodaci WHERE userID = `;
const GET_GRAD = `SELECT * FROM grad where gradID = `;
const GET_DRZAVA = `SELECT * FROM drzava where drzavaID = `;
function GET_SREDNJA_SKOLA(userID) {
    return `SELECT
                ideUSrednju.ID,
                ideUSrednju.srednjaID,
                ideUSrednju.godinaZavrsetka,
                srednjaSkola.naziv as nazivSrednje,
                grad.naziv as nazivGrada,
                drzava.naziv as nazivDrzave
            FROM ideUSrednju
            INNER JOIN srednjaSkola ON ideUSrednju.srednjaID = srednjaSkola.srednjaSkolaID
            INNER JOIN grad ON srednjaSkola.gradID = grad.gradID
            INNER JOIN drzava ON srednjaSkola.drzavaID = drzava.drzavaID
            WHERE userID = ${userID}`;
}
function GET_FAKULTET(userID) {
    return `SELECT 
                studira.ID,
                studira.userID,
                studira.smerID,
                studira.fakultetID,
                studira.godinaUpisa,
                studira.brojISpitaDoKraja,
                studira.prosek,
                studira.status,
                fakultetSmer.naziv as smerNaziv,
                fakultet.naziv as fakultetNaziv,
                univerzitet.naziv as univerzitetNaziv, 
                grad.naziv as gradNaziv
            FROM studira
            INNER JOIN fakultetSmer ON studira.smerID = fakultetSmer.smerID
            INNER JOIN fakultet ON fakultetSmer.fakultetID = fakultet.fakultetID
            INNER JOIN univerzitet ON fakultet.univerzitetID = univerzitet.univerzitetID
            INNER JOIN grad ON univerzitet.gradID = grad.gradID
            WHERE studira.userID = ${userID}`;
}
function GET_RADNO_ISKUSTVO(userID) {
    return `SELECT
                radnoIskustvo.radnoIskustvoID,
                radnoIskustvo.datumPocetka,
                radnoIskustvo.datumZavrsetka,
                radnoIskustvo.pozicija,
                radnoIskustvo.opisPosla,
                organizacija.imeOrganizacije
            FROM radnoIskustvo
            INNER JOIN organizacija ON radnoIskustvo.organizacijaID = organizacija.organizacijaID
            WHERE userID = ${userID}`;
}
function GET_STRUCNO_USAVRSAVANJE(userID) {
    return `SELECT
                strucnoUsavrsavanje.strucnoUsavrsavanjeID,
                strucnoUsavrsavanje.naziv,
                organizacija.imeOrganizacije,
                strucnoUsavrsavanje.datumPocetka,
                strucnoUsavrsavanje.datumZavrsetka,
                strucnoUsavrsavanje.opis,
                strucnoUsavrsavanje.sertifikat
            FROM strucnoUsavrsavanje
            INNER JOIN organizacija ON strucnoUsavrsavanje.organizacijaID = organizacija.organizacijaID
            WHERE strucnoUsavrsavanje.strucnoUsavrsavanjeID = ${userID}`;
}
function GET_RAD_NA_RACUNARU(userID) {
    return `SELECT
                radNaRacunaruID,
                naziv,
                nivo,
                sertifikat
            FROM radNaRacunaru
            WHERE userID = ${userID}`;
}
function GET_RAD_NA_PROJEKTU(userID) {
    return `SELECT
                projekatID,
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
                jezik.imeJezika,
                govori.jezikID,
                govori.citanje,
                govori.pisanje,
                govori.razumevanje,
                govori.govor,
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
                    SET
                        ime =  ${payload.ime},
                        prezime = ${payload.prezime},
                        imeRoditelja = ${payload.imeRoditelja},
                        datumRodjenja = ${payload.datumRodjenja},
                        cv = payload.cv,
                        profilnaSlika = payload.profilnaSlika
                    WHERE `
}

/* KOMPANIJA */
function LOGIN_KOMPANIJA(payload) {
    return `SELECT kompanijaID, username FROM kompanija WHERE username = '${payload.username}' AND password = '${payload.password}';`;
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
    REGISTER_USER_LICNI_PODACI

}
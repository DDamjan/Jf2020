/* USERS */
function CHECK_USER(payload) {
    return `SELECT userID, username FROM user WHERE username = '${payload.username}' AND password = '${payload.password}';`;
}

function REGISTER_USER(payload) {
    return `DECLARE @prebivalisteDrzava_id INT(11),
                    @prebivalisteGrad_id INT (11),
                    @boravisteDrzava_id INT (11),
                    @boravisteGrad_id INT (11),
                    @user_id INT (11)

            SELECT @prebivalisteDrzava_id = NULL
            SELECT @prebivalisteGrad_id = NULL
            SELECT @boravisteDrzava_id = NULL
            SELECT @boravisteGrad_id = NULL
            SELECT @user_id = NULL

            SELECT @prebivalisteDrzava_id = drzavaID FROM drzava WHERE naziv = ${payload.prebivaliste.drzava}
            IF @prebivalisteDrzava_id IS NULL THEN
                INSERT INTO drzava (naziv) VALUES ('${payload.prebivaliste.drzava}')
                SELECT @prebivalisteDrzava_id = Max(drzavaID) FROM drzava
            END IF

            SELECT @prebivalisteGrad_id = gradID FROM grad WHERE naziv = ${payload.prebivaliste.grad}
            IF @prebivalisteGrad_id IS NULL THEN
                INSERT INTO grad (naziv) VALUES ('${payload.prebivaliste.grad}')
                SELECT @prebivalisteGrad_id = Max(gradID) FROM grad
            END IF

            SELECT @boravisteDrzava_id = drzavaID FROM drzava WHERE naziv = ${payload.boraviste.drzava}
            IF @boravisteDrzava_id IS NULL THEN
                INSERT INTO drzava (naziv) VALUES ('${payload.boraviste.drzava}')
                SELECT @boravisteDrzava_id = Max(drzavaID) FROM drzava
            END IF

            SELECT @boravisteGrad_id = gradID FROM grad WHERE naziv = ${payload.boraviste.grad}
            IF @boravisteGrad_id IS NULL THEN
                INSERT INTO grad (naziv) VALUES ('${payload.boraviste.grad}')
                SELECT @boravisteGrad_id = Max(gradID) FROM grad
            END IF

            INSERT INTO user (username, password) VALUES ('${payload.username}', '${payload.password}');
            SELECT @user_id = Max(userID) FROM user
            INSERT INTO licniPodaci (userID, ime, imeRoditelja, prezime, datumRodjenja, prebivalisteDrzavaID, prebivalisteGradID, prebivalisteAdresa, boravisteDrzavaID, boravisteGradID, boravisteAdresa, telefon, linkedIn)
            VALUES (@user_id, '${payload.licniPodaci.ime}', '${payload.licniPodaci.imeRoditelja}', '${payload.licniPodaci.prezime}', ${payload.licniPodaci.datumRodjenja}, @prebivalisteDrzava_id, @prebivalisteGrad_id, '${payload.prebivaliste.adresa}', @boravisteDrzava_id, @boravisteGrad_id, '${payload.boraviste.adresa}', '${payload.licniPodaci.kontakt.telefon}', '${payload.licniPodaci.kontakt.linkedIn}')`
}
const GET_USERS = `SELECT userID, ime, prezime FROM licniPodaci`;
const GET_USER = `SELECT userID, email FROM user WHERE email = `;
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
            INNER JOIN grad ON ideUSrednju.gradID = grad.gradID
            INNER JOIN drzava ON ideUSrednju.drzavaID = drzava.drzavaID
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
function GET_RADNO_ISKUSTVO (userID){
    return `SELECT
                radnoIskustvo.radnoIskustvoID,
                radnoIskustvo.datumPocetka,
                radnoIskustvo.datumZavrsetka,
                radnoiskustvo.pozicija,
                radnoIskustvo.opisPosla,
                organizacija.imeOrganizacije
            FROM radnoIskustvo
            INNER JOIN organizacija ON radnoIskustvo.organizacijaID = organizacija.organizacijaID
            WHERE userID = ${userID}`;
}
function GET_STRUCNO_USAVRSAVANJE (userID) {
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
function GET_RAD_NA_RACUNARU (userID) {
    return `SELECT
                radNaRacunaruID,
                naziv,
                nivo,
                sertifikat
            FROM radNaRacunaru
            WHERE userID = ${userID}`;
}
function GET_RAD_NA_PROJEKTU (userID) {
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
function GET_POZNAVANJE_JEZIKA (userID) {
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
function GET_OSTALE_VESTINE (userID) {
    return `SELECT
                ostaleVestineID,
                vozackeDozvole,
                vestine,
                osobine,
                interesovanja
            FROM ostaleVestine
            WHERE userID = ${userID}`;
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
    GET_OSTALE_VESTINE
}
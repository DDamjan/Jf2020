/* USERS */
function REGISTER_USER (payload) {
    return `INSERT INTO user (username, password) VALUES ('${payload.username}', '${payload.password}');
            INSERT INTO licniPodaci (userID, ime, imeRoditelja, prezime, datumRodjenja, prebivaliste, boraviste,)`
}
const GET_USERS = `SELECT userID, ime, prezime FROM licniPodaci`;
const GET_USER = `SELECT userID, email FROM users WHERE email = `;
const GET_LICNI_PODACI_BY_USERID = `SELECT * FROM licniPodaci WHERE userID = `;
function GET_JEZICI(userID){
    return `(SELECT * FROM govori WHERE userID = ${userID}) as t1 INNER JOIN jezik on t1.jezikID = jezik.jezikID`;
}
const GET_GRAD = `SELECT * FROM grad where gradID = `;
const GET_DRZAVA = `SELECT * FROM drzava where drzavaID = `;

/* KOMPANIJA */
function LOGIN_KOMPANIJA (payload) {
    return `SELECT kompanijaID, username FROM kompanija WHERE username = '${payload.username}' AND password = '${payload.password}';`;
}

module.exports = {
    LOGIN_KOMPANIJA,
    GET_USERS,
    GET_USER,
    GET_LICNI_PODACI_BY_USERID,
    GET_JEZICI,
    GET_GRAD,
    GET_DRZAVA
}
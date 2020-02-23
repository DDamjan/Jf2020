/* USERS */
function REGISTER_USER (payload) {
    return `INSERT INTO user (username, password) VALUES ('${payload.username}', '${payload.password}');
            INSERT INTO licniPodaci (userID, ime, imeRoditelja, prezime, datumRodjenja, prebivaliste, boraviste,)`
}
const GET_USERS = `SELECT userID, ime, prezime FROM licniPodaci`;

/* KOMPANIJA */
function LOGIN_KOMPANIJA (payload) {
    return `SELECT kompanijaID, username FROM kompanija WHERE username = '${payload.username}' AND password = '${payload.password}';`;
}

module.exports = {
    LOGIN_KOMPANIJA,
    GET_USERS
}
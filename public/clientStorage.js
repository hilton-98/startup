export default class ClientStorage {

    static USERNAME_KEY = 'username';
    static SCHOOLS_KEY = 'schools';

    static getUsername() {

        const username = localStorage.getItem(ClientStorage.USERNAME_KEY);

        if (!username) {
            return '';
        } else {
            return username;
        }
    }

    static setUsername(username) {
        localStorage.setItem(ClientStorage.USERNAME_KEY, username);
    }

    static getSchools() {

        const schoolsJSON = localStorage.getItem(ClientStorage.SCHOOLS_KEY);

        if (!schoolsJSON) {
            return {};
        } else {
            return JSON.parse(schoolsJSON);
        }
    }

    static setSchools(schools) {
        localStorage.setItem(ClientStorage.SCHOOLS_KEY, JSON.stringify(schools));
    }

    static clear() {
        localStorage.clear();
    }
}
export default class ServerInterface {

    static BASE_URL = '/api';
    static LOGIN_URL = '/auth/login';
    static CREATE_USER_URL = '/auth/create';
    static LOGOUT_URL = '/auth/logout';
    static GET_SCHOOLS_URL = '/schools';
    static GET_EVENTS_URL = '/events'
    static UPDATE_SCHOOLS = '/schools/update'
    static REMOVE_SCHOOLS_URL = '/schools/delete';

    static HEADERS = { 'content-type': 'application/json; charset=UTF-8' };


    static getRes(obj, status) {
        return { obj: obj, status: status };
    }

    static async get(urlExtension) {

        try {
            const response = await fetch(ServerInterface.BASE_URL + urlExtension, {
                method: 'GET',
                headers: ServerInterface.HEADERS,
            });

            return ServerInterface.getRes(await response.json(), response.status);
    
        } catch(e) {
            console.log(e.message);
            return null;
        }
    }

    static async post(urlExtension, body) {

        try {
            const response = await fetch(ServerInterface.BASE_URL + urlExtension, {
                method: 'POST',
                headers: ServerInterface.HEADERS,
                body: body,
            });
    
            return ServerInterface.getRes(await response.json(), response.status);
        
        } catch(e) {
            console.log(e.message);
            return null;
        }
    }

    static async delete(urlExtension) {

        try {
            const response = await fetch(ServerInterface.BASE_URL + urlExtension, {
                method: 'DELETE',
            });

            return ServerInterface.getRes(await response.json(), response.status);

        } catch(e) {
            console.log(e.message);
        }
    }

    static async createUser(username, password) {

        const body = { username: username, password: password };

        const response = await ServerInterface.post(ServerInterface.CREATE_USER_URL, JSON.stringify(body))
        return response;
    }

    static async login(username, password) {

        console.log("login");
    
        const body = { username: username, password: password };

        const response = await ServerInterface.post(ServerInterface.LOGIN_URL, JSON.stringify(body));
        return response;
    }

    static async logout() {
        await ServerInterface.delete(ServerInterface.LOGOUT_URL);
    }

    static getResponseObj(response) {
        if (response) {
            return response.obj;
        } else {
            return null;
        }
    }

    static async getSchools() {

        const response = await ServerInterface.get(ServerInterface.GET_SCHOOLS_URL);
        return ServerInterface.getResponseObj(response);
    }

    static async getEvents() {

        const response = await(ServerInterface.get(ServerInterface.GET_EVENTS_URL));
        return ServerInterface.getResponseObj(response);
    }

    static async updateSchools(schools) {

        const response = await ServerInterface.post(ServerInterface.UPDATE_SCHOOLS, JSON.stringify(schools));
        return ServerInterface.getResponseObj(response);  
    }

    static async removeSchool(school) {

        const response = await ServerInterface.post(ServerInterface.REMOVE_SCHOOLS_URL, JSON.stringify(school));
        return ServerInterface.getResponseObj(response);  
    }
}
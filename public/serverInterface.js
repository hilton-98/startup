export default class ServerInterface {

    static BASE_URL = '/api';
    static GET_SCHOOLS_URL = '/schools';
    static GET_EVENTS_URL = '/events'
    static UPDATE_SCHOOLS = '/schools/update'
    static REMOVE_SCHOOLS_URL = '/schools/delete';

    static APPLICATION_JSON_HEADERS = { 'content-type': 'application/json' };


    static async get(urlExtension) {

        try {
            const responseJSON = await fetch(ServerInterface.BASE_URL + urlExtension, {
                method: 'GET',
                headers: ServerInterface.APPLICATION_JSON_HEADERS,
            });

            return (await responseJSON.json());
    
        } catch {
            console.log(e.message);
            return null;
        }
    }

    static async post(urlExtension, body) {

        try {
            const responseJSON = await fetch(ServerInterface.BASE_URL + urlExtension, {
                method: 'POST',
                headers: ServerInterface.APPLICATION_JSON_HEADERS,
                body: body,
            });
    
            return (await responseJSON.json());
        } catch(e) {
            console.log(e.message);
            return null;
        }
    }

    static async getSchools() {

        const response = await ServerInterface.get(ServerInterface.GET_SCHOOLS_URL);
        return response;
    }

    static async getEvents() {

        const response = await(ServerInterface.get(ServerInterface.GET_EVENTS_URL));
        return response;
    }

    static async updateSchools(schools) {

        const response = await ServerInterface.post(ServerInterface.UPDATE_SCHOOLS, JSON.stringify(schools));
        return response;

        // try {
        //     const response = await fetch('/api/schools/update', {
        //       method: 'POST',
        //       headers: { 'content-type': 'application/json' },
        //       body: JSON.stringify(schools),
        //     });
    
        //     ClientStorage.setSchools(await response.json());
    
        // } catch(e) {
    
        //     console.log(e.message);
        //     ClientStorage.setSchools(schools);
        // }
    }

    static async removeSchool(school) {

        const response = await ServerInterface.post(ServerInterface.REMOVE_SCHOOLS_URL, JSON.stringify(school));
        return response;
    }
}
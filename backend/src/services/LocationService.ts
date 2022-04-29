import axios from "axios";

class LocationService {
    token: string;
    filteredLocations: Array<any>;

    async getByParentId(locationParentID: string, token: string) {
        this.token = token;

        try {
            // Gets all locations
            const allLocations = await axios({
                method: 'get',
                url: process.env.API_ADDRESS + `/locations${token}`
            });

            // Gets all locations where parent id is locationParentId
            const filteredLocations = await allLocations.data.filter((obj) => {
                return obj.parentLocationId === locationParentID;
            });

            this.filteredLocations = filteredLocations;
        } catch (error) {
            return error.response.data;
        }
    }

    async getAllUbs(token: string) {
        this.token = '?access_token=' + token;

        // The 'filter' param gets all locations where name starts with "UBS" or "GSAP".
        const headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': "*",
            'filter': "{\"where\": {\"or\": [{\"name\": {\"regexp\": \"/^UBS/i\"}}, {\"name\": {\"regexp\": \"/^GSAP/i\"}}] }}"
        }

        try {
            const allUbs = await axios.get(
                process.env.API_ADDRESS + `/locations${this.token}`,
                { headers }
            );
            
            return allUbs.data;
            
        } catch (error) {
            console.log(error);
            return error.response.data;
        }
    }

    getByName(locationName: string) {
        try {
            // Gets the location by name
            const location: any = this.filteredLocations.filter((obj) => {
                return obj.name === locationName;
            })[0];
    
            if(location === undefined) {
                return '';
            } else {
                return location.id;
            }

        } catch(error) {
            console.error(error);
            throw new Error(error);
        }
    }
}

export { LocationService };

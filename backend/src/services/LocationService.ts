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
}

export { LocationService };
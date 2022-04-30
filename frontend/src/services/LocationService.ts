import axios from "axios";

class LocationService {
    async execute() {

        const apiUrl = process.env.REACT_APP_API_URL;
        const route = `/location/getAllUbs`;
        const token = localStorage.getItem("token");

        const headers = {
            Authorization: `Bearer ${token}`
        }

        try {
            const data = await axios({
                method: 'get',
                url: apiUrl + route,
                headers
            });
            console.log(data.data);
            return data.data;
        } catch(error) {
            console.error(error);
        }

    }
}

export { LocationService };

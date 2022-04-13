import axios from "axios";

class OutbreakService {
    async execute(outbreakId: string) {
        const apiUrl = process.env.REACT_APP_API_URL;
        const route = `/outbreak/${outbreakId}`;
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
    
            return data.data;
        } catch(error) {
            console.error(error);
        }

    }
}

export { OutbreakService };

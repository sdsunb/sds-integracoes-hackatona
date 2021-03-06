import axios from "axios";

class CasesService {
    async execute(origin: string) {
        
        const apiUrl = process.env.REACT_APP_API_URL;
        const route = `/addCases/${origin}`;
        const token = localStorage.getItem("token");

        const headers = {
            Authorization: `Bearer ${token}`
        }

        try {
            const data = await axios({
                method: 'post',
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

export { CasesService };

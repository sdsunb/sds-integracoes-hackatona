import axios from "axios";

class CasesService {
    async execute(outbreakId: string) {
        const apiUrl = process.env.REACT_APP_API_URL;
        const route = `/addCases/${outbreakId}`;
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

            return data.data;
        } catch(error) {
            console.error(error);
        }

    }
}

export { CasesService };

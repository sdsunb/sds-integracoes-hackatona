import axios from "axios";

class OutbreakService {
    async execute(outbreakId: string, authToken: string) {
        const apiAddress = process.env.API_ADDRESS;
        const route = `/outbreaks/${outbreakId}?access_token=${authToken}`;

        try {
            const data = await axios({
                method: 'get',
                url: apiAddress + route
            })

            return data.data;
        } catch(error) {
            error.response.data.error.message;
        }
    }

}

export { OutbreakService };

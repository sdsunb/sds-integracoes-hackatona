import axios from "axios";

class UserService {

    async execute(userId: string, authToken: string) {
        const apiAddress = process.env.API_ADDRESS;
        const route = `/users/${userId}`;
        const token = `?access_token=${authToken}`;

        try {
            const data = await axios({
                method: 'get',
                url: apiAddress + route + token,
            });

            return data.data;
        } catch (error) {
            return error.response.data;
        }

    }
}

export { UserService };

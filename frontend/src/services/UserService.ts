import axios from "axios";

class UserService {
    async execute(userId: string) {
        const apiUrl = process.env.REACT_APP_API_URL;
        const route = '/user';
        const token = localStorage.getItem('token');
        const headers = { 
            Authorization: `Bearer ${token}`,
            userId
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

export { UserService };

import axios from "axios";

interface ILoginRequest {
    username: string;
    password: string;
}

class LoginService { 
    async execute({username, password}: ILoginRequest) {
        const apiUrl = process.env.REACT_APP_API_URL;
        const route = '/login';
        
        try {
            const data = await axios({
                method: 'post',
                url: apiUrl + route,
                data: {
                    username,
                    password
                }
            });
    
            return data;
            
        } catch(error) {
            console.error(error);
        }
    }
}

export { LoginService };

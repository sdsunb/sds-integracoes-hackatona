import axios from "axios";

interface ILoginRequest { 
    username: string;
    password: string;
}

class LoginService {
    async execute({username, password}: ILoginRequest) {

        const apiAddress = process.env.API_ADDRESS;
        const authRoute = '/oauth/token';
        const loginRoute = '/users/login?access_token=';
        var token = '';

        try {
            const authData = await axios({
                method: 'post',
                url: apiAddress + authRoute,
                data: {
                    username,
                    password
                }
            });

            token = authData.data.access_token;

            const loginData = await axios({
                method: 'post',
                url: apiAddress + loginRoute + token,
                data: {
                    email: username,
                    password
                }
            })

            return loginData.data;
    
        } catch(error) {
            return error.response.data.error.message;
        }


    }
}

export { LoginService };

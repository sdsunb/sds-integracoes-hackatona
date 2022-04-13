import axios from "axios";

class VersionService {
    async execute() {
        const environment = process.env.REACT_APP_API_URL;
        const route = '/version';

        const version = await axios({
            method: 'get',
            url: environment + route,
        });

        return version;
    }
}

export { VersionService }

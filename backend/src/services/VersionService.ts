import axios from "axios";

class VersionService {
    async execute() {
        const apiAddress = process.env.API_ADDRESS;
        const route = '/system-settings/version';

        const data = await axios({
            method: 'get',
            url: apiAddress + route
        });

        const version = data.data.version;
        
        return version;
    }
}

export { VersionService }

import { AddEsusCaseService } from "./AddEsusCaseService";
import { AddCievsCaseService } from "./AddCievsCaseService";

class AddCasesService {
    async execute(outbreakId: string, authToken: string, origin: string) {
        
        const requestData = {
            apiAddress: process.env.API_ADDRESS,
            route: `/outbreaks/${outbreakId}/cases?access_token=${authToken}`
        }

        let response: Object;

        if(origin === 'esus') {
            const addEsusCaseService = new AddEsusCaseService();
            response = await addEsusCaseService.execute(requestData);
        } else if(origin === 'cievs') {
            const addCievsCaseService = new AddCievsCaseService();
            response = await addCievsCaseService.execute(requestData);
        }
        
        return response;
    }
}

function getDocumentType(documentType: string) {}

export { AddCasesService };

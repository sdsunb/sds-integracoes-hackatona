// import { AddEsusCaseService } from "./AddEsusCaseService";
import { AddCievsCaseService } from "./AddCievsCaseService";
import { AddEsusCaseService } from "./AddEsusCaseService";

class AddCasesService {
    async execute(outbreakId: string, authToken: string, origin: string, locationId?: string) {
        
        const requestData = {
            apiAddress: process.env.API_ADDRESS,
            route: `/outbreaks/${outbreakId}/cases`,
            token: `?access_token=${authToken}`
        }

        let response: Object;

        if(origin === 'cievs') {
            const addCievsCaseService = new AddCievsCaseService();
            response = await addCievsCaseService.execute(requestData);
        } 
        else if(origin === 'esus') {
            const addEsusCaseService = new AddEsusCaseService();
            response = await addEsusCaseService.execute(requestData, locationId);
        }
        
        return response;
    }
}

function getDocumentType(documentType: string) {}

export { AddCasesService };

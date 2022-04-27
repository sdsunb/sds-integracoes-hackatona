import { ValidateEsusService } from "./ValidateEsusService";
import { ValidateCievsService } from "./ValidateCievsService";
import path from "path";

enum Origin {
    Esus = 'esus',
    Cievs = 'cievs'
}

interface IValidation {
    caseNumbers: number;
    errors: Array<Object>;
}

class SpreadsheetService {
    async execute(origin: string, fileName:string) {


        const filePath = path.resolve(__dirname, '..', 'uploads', fileName);
        console.log("DIR NAME + filename:", filePath);

        // Checks if the string received existis on Origin enum, if not, returns error
        if(!(<any>Object).values(Origin).includes(origin)) {
            return ({ error: `O tipo de Origem da Planilha enviado (${origin}) não corresponde aos tipos correspondentes no sistema.` });
        }

        let validation: IValidation;

        if(origin === 'esus') {
            const esusValidateService = new ValidateEsusService();
            validation = await esusValidateService.execute(filePath);
        }

        if(origin === 'cievs') {
            const cievsService = new ValidateCievsService();
            validation = await cievsService.execute(filePath);
        }

        return validation;
    }

}

export { SpreadsheetService };

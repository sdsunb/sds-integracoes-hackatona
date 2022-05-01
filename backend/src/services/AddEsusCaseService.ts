import axios from "axios";
import readXlsxFile from "read-excel-file/node";
import { ICievsCase, defaultCase, Gender, OutcomeId, Classification, DocumentType, RacaCor } from "../interfaces/CievsCaseInterface";
import { getSpreadsheetPath } from "../utils/GetSpreadsheetPath";
import { getDate } from "../utils/StringToDate";

interface IRequestData {
    apiAddress: string,
    route: string,
    token: string
}

interface IResult {
    status: string;
    casesAdded: number;
    casesFail: {
        quantity: number,
        row?: number
    };
}

/* The schema below works in this model:
'Spreadsheet column name': {
    prop: 'name of the variable that we'll call (usually Go.Data variable name)',
    type: TS Type,
    required: boolean
} */

const schema = {
    'Nome Completo': {
        prop: 'firstName',
        type: String,
        required: true
    },
    'Sexo': {
        prop: 'gender',
        type: String
    },
    'Classificação Final': {
        prop: 'classification',
        type: String,
        // required: true
    },
    'CPF': {
        prop: 'number',
        type: String
    },
    // Addresses
    'Telefone de Contato': {
        prop: 'phoneNumber',
        type: String
    },
    'CEP': {
        prop: 'postalCode',
        type: String
    },

    // Addresses Line 1
    'Bairro': {
        prop: 'bairro',
        type: String
    },
    'Logradouro( Endereço)': {
        prop: 'logradouro',
        type: String
    },
    'Número (ou SN para Sem Número)': {
        prop: 'numero',
        type: String
    },
    'Complemento': {
        prop: 'complemento',
        type: String
    },

    // Dates
    'Data de Nascimento': {
        prop: 'dob',
        type: Date
    },
    'Data da Notificação': {
        prop: 'dateOfReporting',
        type: Date,
        required: true
    },
    'Data do início dos sintomas': {
        prop: 'dateOfOnset',
        type: Date
    },
    'Data de encerramento': {
        prop: 'dateOfOutcome',
        type: Date
    },

    // Questionnaire Answers
    'Raça/Cor': {
        prop: 'raca_cor',
        type: String
    },
    'CNS': {
        prop: 'cns',
        type: String
    },
    'Sintoma- Dor de Garganta': {
        prop: 'dorDeGarganta',
        type: String
    },
    'Sintoma- Dispneia': {
        prop: 'dispneia',
        type: String
    },
    'Sintoma- Febre': {
        prop: 'febre',
        type: String
    },
    'Sintoma- Tosse': {
        prop: 'tosse',
        type: String
    },
    'Sintoma- Outros': {
        prop: 'outros',
        type: String
    },
    'Sintoma- Dor de Cabeça': {
        prop: 'dorDecabeca',
        type: String
    },
    'Sintoma- Distúrbios Gustativos': {
        prop: 'disturbiosGustativos',
        type: String
    },
    'Sintoma- Distúrbios Olfativos': {
        prop: 'disturbiosOlfativos',
        type: String
    },
    'Sintoma- Coriza': {
        prop: 'coriza',
        type: String
    },
    'Sintoma- Assintomático': {
        prop: 'assintomatico',
        type: String
    },
}

class AddEsusCaseService {
    async execute(requestData: IRequestData, locationId: String) {
        const headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': "*"
        }

        let newCase: ICievsCase = defaultCase;
        let requestResult: IResult = {
            status: 'SUCESSO',
            casesAdded: 0,
            casesFail: {
                quantity:0
            }
        }

        try {
            const file = await getSpreadsheetPath();
            await readXlsxFile(file, { schema }).then(async ({rows, errors}) => {

                rows.map(async (col: any) => {
                    // Basic information
                    newCase = defaultCase;
                    // newCase.visualId = col.visualId
                    newCase.firstName = col.firstName;
                    newCase.gender = getGender(col.gender);
                    // newCase.outcomeId = getOutcome(col.outcomeId);  // Temporarily Disabled
                    newCase.dob = getDate(col.dob);

                    newCase.outbreakId = process.env.OUTBREAK_ID;
                    newCase.dateOfReporting = getDate(col.dateOfReporting);
                    newCase.dateOfOnset = getDate(col.dateOfOnset);

                    // if has CPF, fills document type and document number
                    if(col.number) {
                        newCase.documents[0].type = DocumentType.Cpf;
                        newCase.documents[0].number = col.number;
                    }

                    newCase.classification = getClassification(col.classification);

                    // addresses
                    newCase.addresses[0].phoneNumber = col.phoneNumber;
                    newCase.addresses[0].addressLine1 = col.bairro + ' ' + col.logradouro + ' ' + col.numero + ' ' + col.complemento;
                    newCase.addresses[0].postalCode = col.postalCode;

                    newCase.addresses[0].locationId = locationId;
                    newCase.dateOfOutcome = getDate(col.dateOfOutcome);

                    // Questionnaire Answers
                    newCase.questionnaireAnswers.cns[0].value = col.cns;
                    newCase.questionnaireAnswers.raca_cor[0].value = getRacaCor(col.raca_cor);
                    newCase.questionnaireAnswers.sintomas[0].value = getSintomas(col);

                    try {
                        axios.post(requestData.apiAddress + requestData.route + requestData.token, newCase, { headers });
                        requestResult.casesAdded = requestResult.casesAdded + 1;
                    } catch(error) {
                        requestResult.casesFail.quantity = requestResult.casesFail.quantity + 1;
                        console.error(error);
                        throw new Error(error);
                    }
                    
                    // at the end of the process, clean the directory again
                });
            });
    
            return requestResult;
    
        } catch(error) {
            console.log(error);
            throw new Error(error);
        }
    }
}

function getGender(gender: string) {
    if(gender === 'Feminino') {
        return Gender.Feminine;
    } else if(gender === 'Masculino') {
        return Gender.Male;
    } else {
        return Gender.Empty;
    }
}

function getRacaCor(racaCor: string) {
    if(racaCor === 'Branca') {
        return RacaCor.Branca;
    } else if(racaCor === 'Preta') {
        return RacaCor.Preta;
    } else if(racaCor === 'Amarela') { 
        return RacaCor.Amarela;
    } else if(racaCor === 'Parda') {
        return RacaCor.Parda;
    } else if(racaCor === 'Indígena') {
        return RacaCor.Indigena;
    } else if(racaCor === 'Sem declaração') {
        return RacaCor.SemDeclaracao;
    } else { 
        return RacaCor.Empty;
    }
}

function getOutcome(outcome: string) {
    if(outcome === 'Cura') {
        return OutcomeId.Recovered;
    } else if(outcome === 'Óbito') {
        return OutcomeId.Deceased;
    } else {
        return OutcomeId.Empty;
    }
}

function getClassification(classification: string) {
    if(classification === ''
        || classification === 'Síndrome Gripal Não Especificada' 
        || !classification) {
        return Classification.Suspect;
    } else if(classification === 'Descartado') {
        return Classification.Discarded;
    } else if(classification === 'Confirmado' 
        || classification === 'Confirmado Por Critério Clínico'
        || classification === 'Confirmado clínico epidemiológico' 
        || classification === 'Confirmado Clínico Imagem' 
        || classification === 'Confirmado laboratorial') {
        return Classification.Confirmed;
    } else {
        return Classification.Suspect;
    }
}

function getSintomas(row) {
    console.log(row);
    let sintomas: Array<string> = [];
    if(row.dorDeGarganta === 'Sim') {
        sintomas.push("1");
    }

    if(row.dispneia === 'Sim') {
        sintomas.push("2");
    }

    if(row.febre === 'Sim') {
        sintomas.push("3");
    }

    if(row.tosse === 'Sim') {
        sintomas.push("4");
    }

    if(row.outros === 'Sim') {
        sintomas.push("5");
    }

    if(row.dorDecabeca === 'Sim') {
        sintomas.push("6");
    }

    if(row.disturbiosGustativos === 'Sim') {
        sintomas.push("7");
    }

    if(row.disturbiosOlfativos === 'Sim') {
        sintomas.push("8");
    }

    if(row.coriza === 'Sim') {
        sintomas.push("9");
    }

    if(row.assintomatico === 'Sim') {
        sintomas.push("10");
    }

    return sintomas;
}

export { AddEsusCaseService };
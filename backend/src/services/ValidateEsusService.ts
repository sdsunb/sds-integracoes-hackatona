import readXlsxFile from "read-excel-file/node";

interface IValidation {
    caseNumbers: number;
    amountOfErrors: number;
    errors: Array<Object>;
}

//  FIELDS

// COL NUMBER  COL NAME                  COL TYPE               REQUIRED              GD FIELD
// // col[4]  --> PhoneNumber               Type: Number           Not Required          phoneNumber
// // col[6]  --> PublicPlace (Logradouro)  Type: String           Not Required          addresses: { addressLine1 }
// col[7]  --> CaseEvolution             Type: String           Temporarily Disabled  outcomeId
// // col[10] --> Number                    Type: Number           Not Required          addresses: { addressLine1 }
// // col[12] --> NotificationDate          Type: Date (Object)    Required              dateOfReporting
// // col[25] --> PostalCode                Type: String           Not Required          postalCode
// col[27] --> Result (PCR/Rápidos)      Type: String           Temporarily Disabled              
// // col[28] --> Breed                     Type: String           Not Required          questionnaireAnswers: { raca_cor[{ value: "" }] }
// // col[30] --> Gender                    Type: String           Not Required          gender
// // col[37] --> CNS                       Type: Number           Not Required          questionnaireAnswers: { cns[{ value: "" }] }
// // col[47] --> District                  Type: String           Not Required          addresses: { addressLine1 }
// // col[50] --> Date of Outcome           Type: Date (Object)    Not Required          dateOfOutcome
// // col[51] --> DateOfBirth               Type: Date (Object)    Not Required          dob
// // col[52] --> FinalClassification       Type: String           Required              classification
// // col[54] --> Complement                Type: String           Not Required          addresses: { addressLine1 }
// // col[56] --> CPF                       Type: String           Not Required          documents: { number }
// // col[57] --> Name                      Type: String           Required              firstName
// // col[59] --> Date Of Onset             Type: Date (Object)    Not Required          dateOfOnset

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

class ValidateEsusService {
    async execute(filePath: string) {

        let validation: IValidation = {
            caseNumbers: 0,
            amountOfErrors: 0,
            errors: []
        }

        await readXlsxFile(filePath, { schema }).then(({ rows, errors }) => {
            errors.length === 0;

            console.log(rows);

            validation.errors = errors;
            validation.amountOfErrors = errors.length;
        });

        return validation;
    }
}

export { ValidateEsusService };

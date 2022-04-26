import readXlsxFile from "read-excel-file/node";

interface IValidation {
    caseNumbers: number;
    amountOfErrors: number;
    errors: Array<Object>;
}

const schema = {
    'Record_Id': {
        prop: 'visualId',
        type: String
    },
    'nomecompletoPaciente': {
        prop: 'firstName',
        type: String,
        required: true
    },
    'sexo': {
        prop: 'gender',
        type: String
    },
    'classificacaoFinal': {
        prop: 'outcomeId',
        type: String,
    },
    'classificacao_descricao': {
        prop: 'classification',
        type: String,
        required: true
    },
    'dataNascimentoFull': {
        prop: 'dob',
        type: String
    },
    'gestante': {
        prop: 'pregnancyStatus',
        type: String
    },
    'cpf': {
        prop: 'number',
        type: String
    },
    'telefoneCelular': {
        prop: 'phoneNumber',
        type: String
    },
    'RA': {
        prop: 'locationId',
        type: String
    },
    'enderecoCompleto': {
        prop: 'addressLine1',
        type: String
    },
    'cep': {
        prop: 'postalCode',
        type: String
    },
    'dataCadastro': {
        prop: 'dateOfReporting',
        type: String
    },
    'dataPrimeiroSintomas': {
        prop: 'dateOfOnset',
        type: String
    },
    'dataAltaMedica': {
        prop: 'dataAltaMedica',
        type: String
    },
    'dataObito': {
        prop: 'dataObito',
        type: String
    },

    // Date Ranges (Isolation and Hospitalization)
    'quarentena': {     // Date ranges -> Isolation
        prop: 'quarentena',
        type: String
    },
    'hospitalizacao': {     // Date ranges -> Hospitalization
        prop: 'hospitalizacao',
        type: String
    },
    'nomeHospital': {
        prop: 'comments',
        type: String
    },
    'dataHospitalizacao': {
        prop: 'dataHospitalizacao'
    },
    'dataQuarentena': {
        prop: 'dataQuarentena'
    },

    // Questionnaire Answers
    'telefoneFixo': {
        prop: 'telefone_fixo',
        type: String
    },
    'criterioConfirma': {
        prop: 'criterio_confirmacao',
        type: String
    },
    'formaTransmissao': {
        prop: 'forma_de_transmissao',
        type: String
    },
    'pneumopatia': {
        prop: 'pneumopatia',
        type: String
    },
    'Nefropatia': {
        prop: 'Nefropatia',
        type: String
    },
    'doencaHematologica': {
        prop: 'doencaHematologica',
        type: String
    },
    'disturbiosMetabolicos': {
        prop: 'disturbiosMetabolicos',
        type: String
    },
    'imunopressao': {
        prop: 'imunopressao',
        type: String
    },
    'Obesidade': {
        prop: 'Obesidade',
        type: String
    },
    'cardioVasculopatia': {
        prop: 'cardioVasculopatia',
        type: String
    },
    'outros': {
        prop: 'outros',
        type: String
    },
    'racaCor': {
        prop: 'raca_cor',
        type: String
    },
    'mae': {
        prop: 'nome_da_mae',
        type: String
    }
}

class CievsValidateService {
    // The Dictionary from this business rule is found in the spreadsheet
    async execute(filePath: string) {

        let validation: IValidation = {
            caseNumbers: 0,
            amountOfErrors: 0,
            errors: []
        }

        await readXlsxFile(filePath, { schema }).then(({ rows, errors }) => {
            let visualIds: Array<string> = [];

            errors.length === 0;     
            
            console.log(rows);

            // Checks if doens't exist errors in the row to count
            rows.forEach((row: any, index: number) => {     // 'row: any' cannot be removed, I don't know why.

                // Adds all visualIds in array to check duplicity
                // if(rows[index].visualId) {
                //     visualIds.push(rows[index].visualId);
                // }

                // const count = {};
                // for(const element of visualIds) {
                //     // If element exists in array, adds a error on errors array
                //     if(count[element]) {
                //         count[element] += 1;
                //         errors.push({
                //             error: "Duplicated ID",
                //             column: "Record_Id",
                //             value: element
                //         });
                //     } else {
                //         count[element] = 1;
                //     }
                // }

                if(!errors[index]) {
                    validation.caseNumbers++;
                }

            });

            validation.errors = errors;
            validation.amountOfErrors = errors.length;
        });
        
        return validation;
    }

}

export { CievsValidateService };

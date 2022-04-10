

interface IRequestData {
    apiAddress: string,
    route: string
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
        prop: 'typeId',
        type: String
    },
    'hospitalizacao': {     // Date ranges -> Hospitalization
        prop: 'typeId',
        type: String
    },
    'nomeHospital': {
        prop: 'comments',
        type: String
    },
    'dataHospitalizacao': {
        prop: 'startDate',
        type: String
    },
    'dataQuarentena': {
        prop: 'startDate',
        type: String
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

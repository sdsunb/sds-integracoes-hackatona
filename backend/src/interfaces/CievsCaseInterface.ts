export enum Classification {
    Confirmed = "LNG_REFERENCE_DATA_CATEGORY_CASE_CLASSIFICATION_CONFIRMED",
    Suspect = "LNG_REFERENCE_DATA_CATEGORY_CASE_CLASSIFICATION_SUSPECT",
    Discarded = "LNG_REFERENCE_DATA_CATEGORY_CASE_CLASSIFICATION_NOT_A_CASE_DISCARDED"
}

export enum DocumentType {
    Cpf = "LNG_REFERENCE_DATA_CATEGORY_DOCUMENT_TYPE_CPF",
    Other = "LNG_REFERENCE_DATA_CATEGORY_DOCUMENT_TYPE_OTHER",
    Empty = ""
}

export enum Gender {
    Male = "LNG_REFERENCE_DATA_CATEGORY_GENDER_MALE",
    Feminine = "LNG_REFERENCE_DATA_CATEGORY_GENDER_FEMALE",
    Empty = ""
}

export enum OutcomeId {
    Recovered = "LNG_REFERENCE_DATA_CATEGORY_OUTCOME_RECOVERED",
    Deceased = "LNG_REFERENCE_DATA_CATEGORY_OUTCOME_DECEASED",
    Empty = ""
}

export enum PregnancyStatus {
    None = "LNG_REFERENCE_DATA_CATEGORY_PREGNANCY_STATUS_NONE",
    NotPregnant = "LNG_REFERENCE_DATA_CATEGORY_PREGNANCY_STATUS_NOT_PREGNANT",
    FirstTrimester = "LNG_REFERENCE_DATA_CATEGORY_PREGNANCY_STATUS_YES_FIRST_TRIMESTER",
    SecondTrimester = "LNG_REFERENCE_DATA_CATEGORY_PREGNANCY_STATUS_YES_SECOND_TRIMESTER",
    ThirdTrimester = "LNG_REFERENCE_DATA_CATEGORY_PREGNANCY_STATUS_YES_THIRD_TRIMESTER",
    Unknown = "LNG_REFERENCE_DATA_CATEGORY_PREGNANCY_STATUS_YES_TRIMESTER_UNKNOWN"
}

export enum CriterioConfirmacao {
    ClinicoEpidemiologico = "1",
    ClinicoImagem = "2",
    ConfirmadoCriterioClinico = "3",
    Laboratorial = "4"
}

export enum FormaTransmissao {
    Local = "1",
    Comunitaria = "2",
    Importada = "3",
    Empty = ""
}

export enum RacaCor {
    Branca = "1",
    Preta = "2",
    Amarela = "3",
    Parda = "4",
    Indigena = "5",
    SemDeclaracao = "6",
    Empty = ""
}

export enum Hospitalization {
    Isolation = "LNG_REFERENCE_DATA_CATEGORY_PERSON_DATE_TYPE_ISOLATION",
    Hospitalization = "LNG_REFERENCE_DATA_CATEGORY_PERSON_DATE_TYPE_HOSPITALIZATION"
}

interface DocumentObject {
    type: DocumentType,
    number: String
}

export interface ICievsCase {
    firstName: String,
    middleName?: String,
    lastName?: String,
    gender?: Gender,
    wasContact: boolean,
    outcomeId: OutcomeId,
    safeBurial: false,
    classification: Classification,
    riskLevel: String,
    transferRefused: boolean,
    questionnaireAnswers: {
        outros_telefones?: Array<any>,
        telefone_fixo?: Array<any>,
        criterio_confirmacao?: Array<any>,
        forma_de_transmissao?: Array<any>,
        comorbidades?: Array<any>,
        raca_cor?: Array<any>,
        profissao?: Array<any>,
        nome_da_mae?: Array<any>,
        qual?: Array<any>,
        cns?: Array<any>
        sintomas?: Array<any>
    },
    vaccinesReceived: Array<any>,
    pregnancyStatus: PregnancyStatus,
    outbreakId: String,
    visualId?: String,
    dob: Date,
    age?: {
        years: Number,
        months: Number
    },
    occupation: String,
    documents: Array<any>,
    addresses: [
    {
        typeId: String,
        city?: String,
        addressLine1?: String,
        postalCode?: String,
        locationId: String,
        geoLocationAccurate: boolean,
        date: any,
        phoneNumber?: String,
        geoLocation?: {
            lat: Number,
            lng: Number
        }
    }
    ],
    duplicateKeys: {
        document: Array<any>,
        name: Array<any>
    }
    updatedAt?: Date;
    dateOfReporting: Date,
    isDateOfReportingApproximate?: boolean,
    dateOfOnset: Date,
    dateRanges: Array<any>,
    classificationHistory: Array<any>,
    dateOfOutcome?: Date,
    hasRelationships?: boolean,
    locations?: Array<any>,
    address?: object,
    numberOfContacts?: Number,
    numberOfExposures?: Number
}

let serverHour = new Date();
let actualDate = new Date();
actualDate.setHours(serverHour.getHours() - 3);

export let defaultCase: ICievsCase = {
    firstName: "",
    lastName: "",
    gender: Gender.Empty,
    wasContact: false,
    outcomeId: OutcomeId.Empty,
    safeBurial: false,
    classification: Classification.Confirmed,
    riskLevel: "",
    transferRefused: false,
    questionnaireAnswers: {
        outros_telefones: [
            {
                value: ""
            }
        ],
        telefone_fixo: [
            {
                value: ""
            }
        ],
        criterio_confirmacao: [
            {
                value: ""
            }
        ],
        forma_de_transmissao: [
            {
                value: [""]
            }
        ],
        comorbidades: [
            {
                value: ""
            }
        ],
        raca_cor: [
            {
                value: ""
            }
        ],
        profissao: [
            {
                value: ""
            }
        ],
        nome_da_mae: [
            {
                value: ""
            }
        ],
        qual: [
            {
                value: []
            }
        ],
        cns: [
            {
                value: ""
            }
        ],
        sintomas: [
            {
                value: []
            }
        ]
    },
    vaccinesReceived: [],
    pregnancyStatus: PregnancyStatus.None,
    outbreakId: process.env.OUTBREAK_ID,
    dob: null,
    occupation: "",
    documents: [
        {
            type: "",
            number: ""
        }
    ],
    addresses: [
        {
            typeId: "LNG_REFERENCE_DATA_CATEGORY_ADDRESS_TYPE_USUAL_PLACE_OF_RESIDENCE",
            addressLine1: "",
            locationId: "",
            geoLocationAccurate: false,
            date: null,
        }
    ],
    duplicateKeys: {
        document: [],
        name: []
    },
    dateOfReporting: actualDate,
    dateOfOnset: null,
    dateRanges: [],
    classificationHistory: [],
    // dateOfOutcome: null,
}

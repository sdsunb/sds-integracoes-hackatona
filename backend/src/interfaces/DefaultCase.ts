import { Classification, Gender, OutcomeId, PregnancyStatus } from "./CievsCaseInterface"

class DefaultCase {
    firstName = ""
    lastName = ""
    gender = Gender.Empty
    wasContact = false
    visualId = ""   // qualquer coisa comenta isso
    outcomeId = OutcomeId.Empty
    safeBurial = false
    classification = Classification.Confirmed
    riskLevel = ""
    transferRefused = false
    questionnaireAnswers = {
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
                value: []
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
    }
    vaccinesReceived = []
    pregnancyStatus = PregnancyStatus.None
    outbreakId = process.env.OUTBREAK_ID
    dob = null
    occupation = ""
    documents = [
        {
            type: "",
            number: ""
        }
    ]
    addresses = [
        {
            phoneNumber: "",
            postalCode: "",
            typeId: "LNG_REFERENCE_DATA_CATEGORY_ADDRESS_TYPE_USUAL_PLACE_OF_RESIDENCE",
            addressLine1: "",
            locationId: "",
            geoLocationAccurate: false,
            date: null
        }
    ]
    duplicateKeys = {
        document: [],
        name: []
    }
    dateOfReporting = actualDate
    dateOfOnset = null
    dateRanges = []
    classificationHistory = []
    dateOfOutcome = null
}

let serverHour = new Date();
let actualDate = new Date();
actualDate.setHours(serverHour.getHours() - 3);

export { DefaultCase }

import axios from "axios";
import readXlsxFile from "read-excel-file/node";
import { Classification, Gender, CriterioConfirmacao, defaultCase, DocumentType, FormaTransmissao, Hospitalization, ICievsCase, OutcomeId, PregnancyStatus, RacaCor } from "../interfaces/CievsCaseInterface";
import { getSpreadsheetPath } from "../utils/GetSpreadsheetPath";
import { getDate } from "../utils/StringToDate";
import { LocationService } from "./LocationService";

interface IRequestData {
    apiAddress: string,
    route: string,
    token: string
}

enum Status {
    success = "SUCESSO",
    fail = "FALHA"
}

interface IResult {
    status: Status;
    casesAdded: number;
    errors: Array<Object>;
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
    'RA': {
        prop: 'locationName',
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
        prop: 'dataHospitalizacao',
        type: String
    },
    'dataQuarentena': {
        prop: 'dataQuarentena',
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

class AddCievsCaseService {
    async execute(requestData: IRequestData) {
        const headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': "*"
        }

        const locationService = new LocationService();
        await locationService.setLocationsByParentId(requestData.token);

        let allCases: Array<ICievsCase> = [];

        let requestResult: IResult = {
            status: Status.success,
            casesAdded: 0,
            errors: []
        }

        try {
            const file = await getSpreadsheetPath();
            await readXlsxFile(file, { schema }).then(async ({ rows, errors }) => {
                let newCase: ICievsCase = defaultCase;

                rows.map((col: any) => {
                    newCase = defaultCase;

                    // Basic information
                    newCase.visualId = col.visualId;
                    newCase.firstName = col.firstName;
                    newCase.gender = getGender(col.gender);
                    newCase.outcomeId = getOutcome(col.outcomeId);
                    newCase.dob = getDate(col.dob);
                    
                    newCase.outbreakId = process.env.OUTBREAK_ID;
                    newCase.dateOfReporting = getDate(col.dateOfReporting);
                    newCase.dateOfOnset = getDate(col.dateOfOnset);

                    if(col.pregnancyStatus === 'Sim') {
                        newCase.pregnancyStatus = PregnancyStatus.ThirdTrimester;
                    }

                    // if has CPF, fills document type and document number
                    if(col.number) {
                        newCase.documents[0].type = DocumentType.Cpf;
                        newCase.documents[0].number = col.number;
                    }

                    if(col.dataAltaMedica) {
                        newCase.dateOfOutcome = getDate(col.dataAltaMedica);
                    } else if(col.dataObito) {
                        newCase.dateOfOutcome = getDate(col.dataObito);
                    }

                    // Classification in cievs ALWAYS is CONFIRMED by default
                    // newCase.classification = getClassification(col.classification);
                    
                    // Addresses
                    newCase.addresses[0].phoneNumber = col.phoneNumber;
                    newCase.addresses[0].addressLine1 = col.addressLine1;
                    newCase.addresses[0].postalCode = col.postalCode;

                    newCase.addresses[0].locationId = locationService.getByName(col.locationName);

                    // Date Ranges: Hospitalization/Isolation
                    newCase.dateRanges = [];
                    if(col.quarentena === 'Residência') {
                        newCase.dateRanges.push({
                            typeId: Hospitalization.Isolation,
                            comments: '',
                            startDate: getDate(col.dataQuarentena)
                        });
                    } else if(col.quarentena === 'Hospital') {
                        newCase.dateRanges.push({
                            typeId: Hospitalization.Hospitalization,
                            comments: col.comments,
                            startDate: getDate(col.dataHospitalizacao)
                        });
                    }

                    // newCase.createdBy = fill this, it'll relevant;

                    // questionnaire Answers
                    if(col.telefone_fixo) {
                        newCase.questionnaireAnswers.outros_telefones[0].value = "1";    // "1" is the value to "Sim" in questionnaire answers
                        newCase.questionnaireAnswers.telefone_fixo[0].value = col.telefone_fixo;
                    } else {
                        newCase.questionnaireAnswers.outros_telefones[0].value = "2";   // "2" is the value to "Não" in questionnaire answers
                    }

                    newCase.questionnaireAnswers.criterio_confirmacao[0].value = getCriterioConfirmacao(col.criterio_confirmacao);
                    newCase.questionnaireAnswers.forma_de_transmissao[0].value = getFormaTransmissao(col.forma_de_transmissao);
                    newCase.questionnaireAnswers.raca_cor[0].value = getRacaCor(col.raca_cor);
                    newCase.questionnaireAnswers.nome_da_mae[0].value = col.nome_da_mae;

                    if(col.pneumopatia || col.Nefropatia || col.doencaHematologica || col.disturbiosMetabolicos || col.imunopressao || col.Obesidade || col.cardioVasculopatia || col.outros) {
                        newCase.questionnaireAnswers.comorbidades[0].value = "1"    // "1" is the value to "Sim" in questionnaire answers
                        newCase.questionnaireAnswers.qual[0].value = getComorbidades(col);
                    } else {
                        newCase.questionnaireAnswers.comorbidades[0].value = "2"    // "2" is the value to "Não" in questionnaire answers
                    }

                    allCases.push(newCase);
                });
            });

            var response = await axios.post(requestData.apiAddress + requestData.route + requestData.token, allCases, { headers });
            console.log(response);
            if(response.status === 200) {
                requestResult.casesAdded = allCases.length;
            } else {
                requestResult.casesAdded = 0;
                requestResult.status = Status.fail
                console.log("Deu ruim", requestResult);
            }

            return requestResult;

        } catch(error) {
            console.log(error);
            throw new Error(error);
        }
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
    if(classification === 'Confirmados') {
        return Classification.Confirmed;
    } else {
        return Classification.Suspect;
    }
}

function getGender(gender: string) {
    if(gender === 'Masculino') {
        return Gender.Male;
    } else if (gender === 'Feminino') {
        return Gender.Feminine;
    } else {
        return Gender.Empty;
    }
}

function getCriterioConfirmacao(criterio_confirmacao: string) {
    if(criterio_confirmacao === '1-Clínico Epidemiológico') {
        return CriterioConfirmacao.ClinicoEpidemiologico;
    } else if(criterio_confirmacao === '2-Clínico Imagem') {
        return CriterioConfirmacao.ClinicoImagem;
    } else if(criterio_confirmacao === '3-Confimado Por Critério Clínico') {
        return CriterioConfirmacao.ConfirmadoCriterioClinico;
    } else if(criterio_confirmacao === '4-Laboratorial') {
        return CriterioConfirmacao.Laboratorial;
    } else {
        return "";
    }
}

function getFormaTransmissao(forma_de_transmissao: string) {
    let formaTransmissao: Array<String> = [];
    if(forma_de_transmissao === 'Local') {
        formaTransmissao.push(FormaTransmissao.Local);
    } else if(forma_de_transmissao === 'Comunitária') {
        formaTransmissao.push(FormaTransmissao.Comunitaria);
    } else if(forma_de_transmissao === 'Importada') {
        formaTransmissao.push(FormaTransmissao.Importada);
    } else {
        formaTransmissao.push(FormaTransmissao.Empty);
    }

    return formaTransmissao;
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

function getComorbidades(row) {
    let comorbidades: Array<string> = [];
    if(row.pneumopatia === 'Sim') {
        comorbidades.push("1");
    }

    if(row.Nefropatia === 'Sim') {
        comorbidades.push("2");
    }

    if(row.doencaHematologica === 'Sim') {
        comorbidades.push("3");
    }

    if(row.disturbiosMetabolicos === 'Sim') {
        comorbidades.push("4");
    }

    if(row.imunopressao === 'Sim') {
        comorbidades.push("5");
    }

    if(row.Obesidade === 'Sim') {
        comorbidades.push("6");
    }

    if(row.cardioVasculopatia === 'Sim') {
        comorbidades.push("7");
    }

    return comorbidades;
}

export { AddCievsCaseService };

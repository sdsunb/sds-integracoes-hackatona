import React, { useEffect, useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { Button } from "../components/Button";
import { Base } from "./Base";

import logoSds from '../assets/images/logoSds.png';

import "../styles/stepOne.scss";
import { UserService } from '../services/UserService';
import { OutbreakService } from '../services/OutbreakService';
import { ValidateSpreadsheetService } from '../services/ValidateSpreadsheetService';
import { Footer } from '../components/Footer';
import { LocationService } from '../services/LocationService';

interface IValidateSpreadsheetRequest {
    origin: string,
    file: any
}

export function StepOne() {
    const history = useHistory();

    const [origin, setOrigin] = useState("default");
    const [ubsId, setUbsId] = useState("default");
    const [spreadsheet, setSpreadsheet] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [locations, setLocations ] = useState([]);

    /* 
     executado sempre que a pagina renderiza, pega os dados do usuario
     e salva no local localStorage equivalente ao created()
    */
    useEffect(() => {
        async function getUser() {
            const userService = new UserService();
            const userId = localStorage.getItem('userId');
            
            if(userId) {
                try {
                    const user = await userService.execute(userId);
                    localStorage.setItem("activeOutbreakId", user.activeOutbreakId);

                } catch (error) {
                    console.error(error);
                    alert("Não foi possível buscar as informações do usuário. Verifique a disponibilidade do Go.Data ou entre em contato com o administrador.");
                    history.push('/');
                }
            }

        }


    /* 
     method 
    */
        async function getActiveOutbreak() {
            const outbreakService = new OutbreakService();
            const activeOutbreakId = localStorage.getItem("activeOutbreakId");

            if(activeOutbreakId) {
                try {
                    const outbreak = await outbreakService.execute(activeOutbreakId);
                } catch(error) {
                    console.error(error);
                    alert("Não foi possível buscar as informações do surto. Verifique a disponibilidade do Go.Data ou entre em contato com o administrador.");
                    history.push('/');
                }
            }
        }


        async function getLocation(){

           const locationService = new LocationService();
           try {
               const locations  = await locationService.execute();
               setLocations(locations);
               /*  */
               
           } catch (error) {
            console.error(error);
            alert("Não foi possível buscar as informações das Localizações das UBS's");
            history.push('/');
           }

        }

        getUser();
        getActiveOutbreak();
        getLocation();
        
    }, []);


    /* 
     method - go page One 
    */
    function goToStepOne() {
        history.push('/stepOne');
    }



    /* 
        Method - Validate spreadsheet and go to page two
    */
    async function goToStepTwo(e: React.ChangeEvent<any>) {
        setIsLoading(true);
        e.preventDefault();

        localStorage.setItem("origin", origin);
        localStorage.setItem("ubsId", ubsId);
        
        const validateSpreadsheetService = new ValidateSpreadsheetService();
        const validateSpreadsheetRequest: IValidateSpreadsheetRequest = {
            origin: origin,
            file: spreadsheet
        }

        const emptyFields = hasEmptyFields();
        if(emptyFields) {
            alert("Preencha todos os campos");
        
        } else {
            try {
                const validateSpreadsheet = await validateSpreadsheetService.execute(validateSpreadsheetRequest);

                // Spreadsheet type error validation:
                if(validateSpreadsheet?.data.error) {
                    alert(validateSpreadsheet?.data.error);
        
                // Spreadsheet fields error validation:
                } else if(validateSpreadsheet?.data.errors.length !== 0) {  // ver se ele realmente retorna esse "errors"
                    alert("A planilha possui erros. Verifique-a e tente novamente");
                    console.log("\n------ Erros da planilha ------", validateSpreadsheet?.data.errors, "\n");
        
                // In this case, doesn't exist errors on validation.
                } else {
                    localStorage.setItem("caseNumbers", validateSpreadsheet.data.caseNumbers);
                    setIsLoading(false);
                    history.push('/stepTwo');
                }
            } catch(error) {
                setIsLoading(false);
                console.error(error);
            }
        }
        setIsLoading(false);
    }

    // This function check if exists empty fields and return true if positive.
    function hasEmptyFields() {
        if(!origin || origin === 'default' || !spreadsheet) {
            return true;
        } else if(origin === 'esus') {
            // If origin is equal 'esus', is necessary validate 'ubsId' too.
            if(!ubsId || ubsId === 'default') {
                return true;
            }
        }
        return false
    }

    /* 
    method 
    */
    function handleSpreadsheet(e: any) {
        setSpreadsheet(e.target.files[0]);
    }

    return(
        <Base>
            <div id="step-one">
            <div className="border">
                <div className="main-content">

                     {/* 
                   Logo Unb  
                   */}
                    <div className="header">
                        <img src={logoSds} width="220" height="85" alt="Logo da Sala de Situação da Universidade de Brasília (FS)" />
                    </div>
                        
                        <h2>Siga o passo a passo para integrar os dados.</h2> 
                    
                    <div className="information">
                        <p> Caso tenha alguma dúvida, consulte o <a target="_blank" rel="noreferrer" href="https://github.com/sdsunb/sds-integracoes-hackatona">repositório do projeto</a> ou entre em contato com a equipe de suporte.</p>
                    </div>

                    <div className="step-buttons">
                        <Button onClick={goToStepOne}>Passo 1</Button>
                        <Button disabled >Passo 2</Button>
                        <Button disabled >Resultado</Button>
                    </div>
                    
                    <form id="form" encType="multipart/form-data">
                    
                        <div>
                            <div>
                                <label id="label" htmlFor="origin">Origem dos dados</label>                
                            </div>
                            
                            <select id="origin" value={origin} onChange={e => setOrigin(e.target.value)}>
                                <option value="default" disabled>Escolha</option>
                                <option value="esus">E-SUS Notifica</option>
                                <option value="cievs">CIEVS</option>
                                <option value="sinan" disabled>SINAN (Em breve!)</option>
                                <option value="gal" disabled>GAL (Em breve!)</option>
                            </select>

                        </div>
    
                        {                       
                            origin === "esus" ?
                            <div>
                                <br />
                                <div>
                                    <label id="label" htmlFor="ubs">Selecione a UBS que deseja incluir os dados</label>
                                </div> 
                                    <select id="ubs" value={ubsId} onChange={e => {e.preventDefault(); setUbsId(e.target.value)}}>
                                        <option value="default" disabled>Escolha</option> 
                                        {
                                            locations.map((location: any,  key:number)=>{
                                                return (
                                                    <option value={location.id} key={location.id}>{location.name}</option>
                                                    )
                                                
                                            })
                                        }

                                    </select>      
                            </div>

                            :

                            <div></div>
                        }

                        <div>
                            <div id="label">
                                <label htmlFor="file">Anexe o Arquivo</label>
                            </div>

                            <input name="file" type="file" id="file" accept=".xls,.xlsx" onChange={e => handleSpreadsheet(e)}></input>
                        </div>
                        
                        <Button type="submit" onClick={goToStepTwo} >
                            Próximo Passo
                        </Button>
                    </form>
                    <br/>

                    </div>
                </div>

                <div className="content">
                    <div>
                        <h3> Sobre a Interface Sirius</h3>
                        <p>
                            A Interface Sirius tem como principal objetivo incluir planilhas de casos do e-SUS e CIEVS diretamente no Go.Data
                            com a proposta de melhorar a qualidade de vida e trabalho do profissional de saúde.
                        </p>                        
                    </div>

                    <div>
                        <h3>Sobre o Go.Data</h3>
                        <p>
                            O <a target="_blank" rel="noreferrer" href="https://worldhealthorganization.github.io/godata/">Go.Data</a> é uma um sistema de investigação de surtos para emergências de saúde pública, e inclui funcionalidades como
                            rastreamento de casos e contatos e visualização de cadeias de transmissão de determinado surto. 
                            O sistema foi desenvolvido pela OMS e é disponibilizado de forma gratuita.
                        </p>   

                        <p className="warning">AVISO: Utilizando a Interface Sirius você está inserindo dados no banco de casos do DF.</p>

                        <p>Se precisar de ajuda ou tiver alguma dúvida sobre a Interface Sirius, entre em contato com <a href={`mailto:${process.env.REACT_APP_RESPONSIBLE_EMAIL}`}>{process.env.REACT_APP_RESPONSIBLE}</a></p>
                    </div>
                </div>

                {
                    isLoading ? <div className="loader"></div> : <div></div>
                }
                </div>

                <Footer />
        </Base>
    )
}

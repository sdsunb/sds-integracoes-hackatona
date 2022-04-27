import React, { useEffect, useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { Button } from "../components/Button";
import { Base } from "./Base";

import logoSds from '../assets/images/logoSds.png';
import logoUnb from '../assets/images/logoUnb.png';
import logoGodata from '../assets/images/logoGodata.png'

import "../styles/stepOne.scss";
import { UserService } from '../services/UserService';
import { OutbreakService } from '../services/OutbreakService';
import { ValidateSpreadsheetService } from '../services/ValidateSpreadsheetService';
import { Footer } from '../components/Footer';

interface IValidateSpreadsheetRequest {
    origin: string,
    file: any
}

export function StepOne() {
    const history = useHistory();

    const [origin, setOrigin] = useState("default");
    const [spreadsheet, setSpreadsheet] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);

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

        getUser();
        getActiveOutbreak();
        
    }, []);


    /* 
     method - go page One 
    */
    function goToStepOne() {
        history.push('/stepOne');
    }



    /* 
     method - go page two
    */

    async function goToStepTwo(e: React.ChangeEvent<any>) {
        setIsLoading(true);
        e.preventDefault();
        debugger;

        const validateSpreadsheetService = new ValidateSpreadsheetService();
        const validateSpreadsheetRequest: IValidateSpreadsheetRequest = {
            origin: origin,
            file: spreadsheet
        }

        try {
            //alert("Aguarde enquanto a planilha é validada...");
            const validateSpreadsheet = await validateSpreadsheetService.execute(validateSpreadsheetRequest);
            console.log("VALIDATE SPREAD", validateSpreadsheet?.data);
    

            if(validateSpreadsheet?.data.errors.length !== 0) {
                console.log("\n------ Erros da planilha ------", validateSpreadsheet?.data.errors, "\n");
                alert("A planilha possui erros, consulte os logs do navegador (pressionando 'F12' e clicando na aba CONSOLE) para mais informações.")
            } else {
                localStorage.setItem("caseNumbers", validateSpreadsheet.data.caseNumbers);
                history.push('/stepTwo');
            }
            setIsLoading(false);
        } catch(error) {
            setIsLoading(false);
            console.error(error);
        }
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
                        <p> Caso tenha alguma dúvida, consulte a <Link to="/help">área de ajuda</Link> ou entre em contato com a equipe de suporte.</p>
                    </div>
                    <div className="step-buttons">
                        <Button onClick={goToStepOne}>Passo 1</Button>
                        <Button disabled >Passo 2</Button>
                        <Button disabled >Resultado</Button>
                    </div>


                    <h2></h2>
                    
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
                    <hr/>

                <div className="content">

                    <div>
                        <h3>Sobre o SDS Integrações</h3>
                        <p>
                            O SDS Integrações tem como principal objetivo incluir planilhas de casos do e-SUS e CIEVS diretamente no Go.Data
                            com a proposta de melhorar a qualidade de vida e trabalho do profissional de saúde.
                        </p>                        
                    </div>

                    <div>
                        <h3>Sobre o Go.Data</h3>
                        <p>
                            O <a target="_blank" href="https://worldhealthorganization.github.io/godata/">Go.Data</a> é uma um sistema de investigação de surtos para emergências de saúde pública, e inclui funcionalidades como
                            rastreamento de casos e contatos e visualização de cadeias de transmissão de determinado surto. 
                            O sistema foi desenvolvido pela OMS e é disponibilizado de forma gratuita.
                        </p>   

                        <p className="warning">AVISO: Utilizando o SDS Integrações você está inserindo dados no banco de casos do DF.</p>

                        <p>Se precisar de ajuda ou tiver alguma dúvida sobre o SDS Integrações, entre em contato com <a href={`mailto:${process.env.REACT_APP_RESPONSIBLE_EMAIL}`}>{process.env.REACT_APP_RESPONSIBLE}</a></p>
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

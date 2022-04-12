import React, { useEffect, useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { Button } from "../components/Button";
import { Base } from "./Base";
import { UserService } from '../services/UserService';
import { OutbreakService } from '../services/OutbreakService';
import { CasesService } from '../services/CasesService';

import logoSds from '../assets/images/logoSds.png';

import "../styles/stepTwo.scss";
import { Footer } from '../components/Footer';

export function StepTwo() {
    const history = useHistory();

    const [activeOutbreak, setActiveOutbreak] = useState({});
    const [user, setUser] = useState({});
    const [caseNumbers] = useState(localStorage.getItem("caseNumbers"));
    const [firstName, setFirstName] = useState("");
    const [outbreak, setOutbreak] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function getUserId() {
            const userService = new UserService();
            const userId = localStorage.getItem('userId');
            
            if(userId) {
                //setIsLoading(true);
                const user = await userService.execute(userId);
                setFirstName(user.firstName);
                // setUser(user);
                localStorage.setItem("activeOutbreakId", user.activeOutbreakId);
                //setIsLoading(false);
                //console.log(isLoading)

            } else {
                alert("Não foi possível buscar as informações do usuário. Verifique a disponibilidade do Go.Data ou entre em contato com o administrador.");
            }

        }

        async function getActiveOutbreak() {
            const outbreakService = new OutbreakService();
            const activeOutbreakId = localStorage.getItem("activeOutbreakId");

            if(activeOutbreakId) {
                try {
                    const outbreak = await outbreakService.execute(activeOutbreakId);
                    setOutbreak(outbreak.name);
                    // setActiveOutbreak(outbreak);
                } catch(error) {
                    console.error(error);
                    alert("Não foi possível buscar as informações do surto. Verifique a disponibilidade do Go.Data ou entre em contato com o administrador.");
                }
            }
        }

        getUserId();
        getActiveOutbreak();

    });

    async function goToResult(e: React.ChangeEvent<any>) {
        setIsLoading(true);
        e.preventDefault();

        const casesService = new CasesService();
        const activeOutbreakId = localStorage.getItem("activeOutbreakId");
        //alert("Aguarde enquanto a planilha é carregada e os dados são incluídos...");
        
        if(activeOutbreakId) {
            const data = await casesService.execute(activeOutbreakId);
            console.log("Result", data);
            localStorage.setItem("status", data.status);
            localStorage.setItem("casesAdded", data.casesAdded);
        }

        history.push('/result');
        setIsLoading(false);
    }

    function goToStepOne() {
        history.push('/stepOne');
    }

    function goToStepTwo() {
        history.push('/stepTwo');
    }

    return(
        <Base>
            <div id="step-two">
                <div className="border">
                    <div className="main-content">


                    <div className="header">
                        <img src={logoSds} width="220" height="85" alt="Logo da Sala de Situação da Universidade de Brasília (FS)" />
                    </div>

                    <div className="information">
                        <p>Siga o passo a passo para integrar os dados.<br/> 
                        Caso tenha alguma dúvida, consulte a <Link to="/help">área de ajuda</Link> ou entre em contato com a equipe de suporte.</p>
                    </div>

                    <div className="step-buttons">
                        <Button disabled onClick={goToStepOne}>Passo 1</Button>
                        <Button onClick={goToStepTwo}>Passo 2</Button>
                        <Button disabled >Resultado</Button>
                    </div>

                    <h2>Passo 2</h2>
                    <p>Conferir a entrada de dados</p>
                    
                    <div className="data-input">
                        <div className="data-content">
                            <p>Serão incluídos</p>
                            <p className="data">{caseNumbers}</p>
                            <p>novos casos</p>
                        </div>

                        <div className="data-content">
                            <p>No surto</p>
                            <p className="data">{outbreak}</p>
                            <p>do Go.Data</p>
                        </div>

                        <div className="data-content">
                            <p>Pelo usuário</p>
                            <p className="data">{firstName}</p>
                            <p>do Go.Data</p>
                        </div>
                    </div>

                    <p>Tem certeza que deseja integrar estes dados?</p>
                    <div className="confirm-button-container">
                        <Button type="submit" onClick={goToResult} >
                            Sim, confirmar
                        </Button>
                    </div>
                    <br />

                </div>
            </div>
                    <hr />

                    
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

            <Footer/>           
        </Base>
    )
}

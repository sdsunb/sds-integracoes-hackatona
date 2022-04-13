import React, { useEffect, useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { Button } from "../components/Button";
import { Base } from "./Base";
import { Footer } from "../components/Footer";

import logoSds from '../assets/images/logoSds.png';
import logoUnb from '../assets/images/logoUnb.png';
import logoGodata from '../assets/images/logoGodata.png'

import "../styles/result.scss";

export function Result() {
    const [casesAdded, setCasesAdded] = useState(localStorage.getItem("casesAdded") ? localStorage.getItem("casesAdded") : "0");
    const [status, setStatus] = useState(localStorage.getItem("status"));
    const [casesFail, setCasesFail] = useState(localStorage.getItem("casesFail") ? localStorage.getItem("casesFail") : "0");

    useEffect(() => {


        if(status !== "SUCESSO") {
            setStatus("FALHA");
        }
    })

    const history = useHistory();

    function goToStepOne() {
        history.push('/stepOne');
    }

    function goToStepTwo() {
        history.push('/stepTwo');
    }

    function goToResult() {
        history.push('/result');
    }

    return(
        <Base>
            <div id="result">
            <div className="border">

                <div className="content">
                    <div className="header">
                        <img className="main-logo" src={logoSds} width="220" height="85" alt="Logo da Sala de Situação da Universidade de Brasília (FS)" />
                    </div>

{/*                     <div className="information">
                        <p>Siga o passo a passo para integrar os dados.<br/> 
                        Caso tenha alguma dúvida, consulte a <Link to="/help">área de ajuda</Link> ou entre em contato com a equipe de suporte.</p>
                    </div> */}


{/* 
                    <div className="step-buttons">
                        <Button onClick={goToStepOne}>Passo 1</Button>
                        <Button onClick={goToStepTwo}>Passo 2</Button>
                        <Button onClick={goToResult}>Resultado</Button>
                    </div> */}

                    <h2>Resultado</h2>
                    <p>Veja o resultado da integração:</p>
                    
                    <div className="data-input">
                    
                        <div className="data-content">
                            <p>Status da integração</p>
                            {
                                status === "SUCESSO" ?
                                <p className="data-sucess">{status}</p>
                                :
                                <p className="data-fail">{status}</p>
                            }
                        </div>

                        <div className="data-content">
                            <p>Quantidade de registros incluídos</p>
                            <p className="data">{casesAdded}</p>
                        </div>

                        <div className="data-content">
                            <p>Quantidade de falhas</p>
                            <p className="data">0</p>
                        </div>
                    
                    </div>

                    
                    <p>Confira os dados detalhadamente no Go.Data</p>
                    <div className="confirm-button-container">
                        <a target="_blank" href="https://gd.sds.unb.br" rel="noreferrer" >
                            Ir para o Go.Data!
                        </a>
                    </div>

                    <div className="information">
                        <p>
                            Qualquer divergência de dados ou problema com o sistema entre em contato com a equipe de desenvolvimento pelo <a href="https://github.com/sdsunb/sds-integracoes-frontend" target="_blank" rel="noreferrer">repositório do projeto.</a> 
                        </p>
                    </div>
                    </div>
                </div>
                <Footer />
            </div>
        </Base>
    );
}

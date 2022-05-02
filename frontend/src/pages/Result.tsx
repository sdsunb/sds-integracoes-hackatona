import { useEffect, useState } from 'react';
import { Base } from "./Base";
import { Footer } from "../components/Footer";

import logoSds from '../assets/images/logoSds.png';

import "../styles/result.scss";

export function Result() {
    const [casesAdded, setCasesAdded] = useState(localStorage.getItem("casesAdded") ? localStorage.getItem("casesAdded") : "0");
    const [status, setStatus] = useState(localStorage.getItem("status"));
    const [errors, setErrors] = useState(localStorage.getItem("errors") ? localStorage.getItem("errors") : "0");

    useEffect(() => {
        if(status !== "SUCESSO") {
            setStatus("FALHA");
        }
    })

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
                            <p className="data">{errors}</p>
                        </div>
                    
                    </div>

                    <p>Confira os dados detalhadamente no Go.Data</p>
                    <div className="confirm-button-container">
                        <a target="_blank" href={process.env.REACT_APP_GODATA_URL} rel="noreferrer" >
                            Ir para o Go.Data!
                        </a>
                    </div>

                    <div className="information">
                        <p>
                            Qualquer divergência de dados ou problema com o sistema entre em contato com a equipe de desenvolvimento pelo <a href="https://github.com/sdsunb/sds-integracoes-hackatona" target="_blank" rel="noreferrer">repositório do projeto.</a> 
                        </p>
                    </div>
                    </div>
                </div>
                <Footer />
            </div>
        </Base>
    );
}

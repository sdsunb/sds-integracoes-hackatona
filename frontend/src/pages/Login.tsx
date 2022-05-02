import React, { useState } from 'react';
// import { Footer } from '../components/Footer';
import { Button } from '../components/Button';
import { useHistory } from 'react-router';
import { LoginService } from '../services/LoginService';
import { VersionService } from '../services/VersionService';

import { Base } from './Base';
import { Footer } from '../components/Footer';

import logoSds from '../assets/images/logoSds.png';

import '../styles/login.scss';
import '../styles/button.scss';
import { useEffect } from 'react';


// interface ILogin {
//     username: string;
//     password: string;
// }

// type ContextType = {

// }

export function Login() {
    const history = useHistory();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [version, setVersion] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function getVersion() {
            const versionService = new VersionService();
            const version = await versionService.execute();
            setVersion(version);
        }

        getVersion();
    }, []);

    async function login(e: React.ChangeEvent<any>) {
        setIsLoading(true);
        
        e.preventDefault();

        const loginService = new LoginService();
        let login = await loginService.execute({username, password});

        if(login?.data.login?.id) {
            localStorage.setItem('token', login.data.login.id);
            localStorage.setItem('userId', login.data.login.userId);
            history.push('/stepOne');
        } else {
            alert('Credenciais Inválidas!');
        }
        setIsLoading(false);
    }


    return(
        <Base>
            <div id="page-login">
                <div className="border">
                <div className="main-content">

                   {/* 
                   Logo Unb  
                   */}
                    <div className="header">
                        <img src={logoSds} className="img-logo" width="440" height="170" alt="Logo da Sala de Situação da Universidade de Brasília (FS)" />
                        <h1>BEM-VINDO(A) AO SIRIUS</h1>
                    </div>
                    
                    <div>
                        <h2>Área restrita</h2>
                        <p> Acesse com suas credenciais do Go.Data ou entre em contato com a <a href="https://sds.unb.br/" target="_blank" rel="noreferrer">Sala de Situação</a> da Universidade de Brasília para mais informações</p>

                        <form>
                            <input type="text" value={username} name="username" onChange={e => setUsername(e.target.value)} placeholder="E-mail"/>
                            <input type="password"value={password} onChange={e => setPassword(e.target.value)} name="password"  placeholder="Senha" />
                            <br />
                            <Button type="submit" onClick={login}>Login</Button>
                        </form>

                    </div>
                </div>
             
            </div>
                
                <hr />
                
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

                <div className="version">
                    <p>Versão 1.0.0</p>
                    <p>{version ? `Versão do Go.Data ${version}` : ""} </p>
                </div>
                
                   
                {
                    isLoading ? <div className="loader"></div> : <div></div>
                }




            </div>
                

            <Footer />
        </Base>
        
    )
}

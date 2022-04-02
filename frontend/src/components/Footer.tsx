import "../styles/footer.scss";

import logoGodata from "../assets/images/logoGodata.png";
import logoSds from "../assets/images/logoSds.png";
import logoUnb from "../assets/images/logoUnb.png";
import "../styles/footer.scss";

type FooterProps = {
}

export function Footer(props: FooterProps) {
    return(
        <div className="footer">
            <a href="https://community-godata.who.int/login" target="_blank" rel="noreferrer" id="image">
                <img src={logoGodata} width="120" height="26,5" alt="Logo do Go.Data OMS" />
            </a>
            <a href="https://sds.unb.br/" target="_blank" rel="noreferrer" id="image">
                <img src={logoSds} width="100" height="36,5" alt="Logo da Sala de Situação da Universidade de Brasília (FS)" />
            </a>
            <a href="https://www.unb.br/" target="_blank" rel="noreferrer" id="image">
                <img src={logoUnb} width="40" height="36" alt="Logo da Universidade de Brasília" />
            </a>
    </div>
    );
}

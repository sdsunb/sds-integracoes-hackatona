import { ReactNode } from "react";
// import { Footer } from "../components/Footer";

import "../styles/footer.scss";

type BaseProps = {
    children: ReactNode;
}

export function Base(props: BaseProps) {
    return(
        <div>
            {props.children}
        </div>
    );
}
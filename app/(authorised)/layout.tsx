import styles from "./layout.module.css";
import { ReactNode } from "react";


type Props = {
    children: ReactNode
}

const AuthLayout = (props: Props) => {
    return (
        <div className={styles.children}>
            {props.children}
        </div>

    )
};

export default AuthLayout
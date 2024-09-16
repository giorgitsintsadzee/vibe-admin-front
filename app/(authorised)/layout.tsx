import Headers from "../Components/Headers/Headers";
import NavBarMenu from "../Components/NavBarMenu/NavBarMenu";
import styles from "./layout.module.css";
import { ReactNode } from "react";


type Props = {
    children: ReactNode
}

const AuthLayout = (props: Props) => {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.headerContainer}>
                    <Headers />
                </div>
                <div className={styles.pages}>
                    <div className={styles.navMenuContainer}>
                        <NavBarMenu isBurgerMenu={true} />
                    </div>
                    <div className={styles.children}>
                        {props.children}
                    </div>
                </div>
            </div>
        </>
    )
};

export default AuthLayout
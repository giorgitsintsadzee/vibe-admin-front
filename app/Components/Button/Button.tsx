import styles from './Button.module.scss'

type Props = {
    title: string;
    type: "primary" | "secondary";
    width?: string;
    showIcon: boolean;
    onClick?: () => boolean
}

const Button = (props: Props) => {

    const classes = [styles.button]

    if (props.type == 'secondary') classes.push(styles.secondary)
    else classes.push(styles.primary)

    return (
        <button
            style={{ width: `${props.width}` }} className={classes.join(' ').trim()}>
            <div className={styles.icon}>
                {props.showIcon ? '' : <img src="/addmusic.svg" alt="icon" />}
                {props.title}
            </div>
        </button>
    )
}

export default Button
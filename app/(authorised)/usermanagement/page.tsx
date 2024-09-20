import styles from './page.module.css'
import UserManagmentTable from '@/app/Components/UserManagmentTable/UserManagmentTable'

const usermanagementPage = () => {
    return (
        <>
            <h3 className={styles.users}>
                Users
            </h3>
            <UserManagmentTable />
        </>
    )
}

export default usermanagementPage
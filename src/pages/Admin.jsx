import Navbar from "../components/Navbar.jsx";
import {useEffect} from "react";
import AdminTable from "../components/AdminTable.jsx";

import styles from "../page-styles/Admin.module.css";

function CountDownToNewYear({ pageTitle }) {

    useEffect(() => {
        document.title = pageTitle;
    })

    return (
        <div className={styles.wrapper}>
            <Navbar/>
            <AdminTable />
        </div>
    )
}

export default CountDownToNewYear

import Navbar from "../components/Navbar.jsx";
import {useEffect} from "react";
import AdminTable from "../components/AdminTable.jsx";

import styles from "../page-styles/Admin.module.css";
import {crudReadMany} from "../utils/crud.js";

function CountDownToNewYear({ pageTitle }) {

    useEffect(() => {
        document.title = pageTitle;
    })

    const BASE_URL = "http://localhost:8080/backend-jakarta-ee-1.0-SNAPSHOT/api/admin";

    return (
        <div className={styles.wrapper}>
            <Navbar/>
            <AdminTable
                fetchData={crudReadMany}
                readManyUrl={`${BASE_URL}/users`}
                deleteOneUrl={`${BASE_URL}/user`}
            />
        </div>
    )
}

export default CountDownToNewYear

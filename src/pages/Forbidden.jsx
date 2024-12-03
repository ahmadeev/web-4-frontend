import {useEffect, useState} from "react";
import Navbar from "../components/Navbar/Navbar.jsx";
import styles from "../page-styles/Forbidden.module.css";

function Forbidden({ pageTitle }) {
    useEffect(() => {
        document.title = pageTitle;
    })

    return (
        <>
            <Navbar/>
            <div className={styles.wrapper}>
                <h1>custom forbidden</h1>
            </div>
        </>
    )
}

export default Forbidden

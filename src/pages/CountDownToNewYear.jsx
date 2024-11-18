import Timer from "../components/Timer.jsx";
import Snow from "../components/Snow.jsx";

import styles from "../page-styles/CountDownToNewYear.module.css";
import Navbar from "../components/Navbar.jsx";
import {useEffect} from "react";

function CountDownToNewYear({ pageTitle }) {

    useEffect(() => {
        document.title = pageTitle;
    })

    return (
        <div className={styles.wrapper}>
            <Navbar/>
            <Snow/>
            <Timer
                event={"до Нового года осталось:"}
                date_of_event_string={`${new Date().getFullYear() + 1}-01-01T00:00:00.000Z`}/>
        </div>
    )
}

export default CountDownToNewYear

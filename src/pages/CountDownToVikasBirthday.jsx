import Timer from "../components/Timer/Timer.jsx";

import styles from "../page-styles/CountDownToVikasBirthday.module.css";
import Navbar from "../components/Navbar/Navbar.jsx";
import {useEffect} from "react";

function CountDownToVikasBirthday({ pageTitle }) {

    useEffect(() => {
        document.title = pageTitle;
    })

    return (
        <div className={styles.wrapper}>
            <Navbar/>
            <Timer
                event={"до дня рождения Вики осталось:"}
                date_of_event_string={`${new Date().getFullYear()}-12-20T00:00:00.000Z`}/>
        </div>
    )
}

export default CountDownToVikasBirthday

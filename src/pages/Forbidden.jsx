import {useEffect} from "react";
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
                <h3>403: Упс, доступ запрещён!</h3>
                <p>
                    К сожалению, у вас нет разрешения на просмотр этой страницы. <br/>
                    Если вы считаете, что это ошибка, свяжитесь с нашей поддержкой.
                </p>
            </div>
        </>
    )
}

export default Forbidden

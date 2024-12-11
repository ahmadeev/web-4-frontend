import Navbar from "../components/Navbar/Navbar.jsx";
import styles from "../page-styles/Home.module.css";
import {useEffect} from "react";

function Home({ pageTitle }) {
    const SAMPLE_TEXT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

    useEffect(() => {
        document.title = pageTitle;
    })

    return (
        <>
            <Navbar/>
            <div className={styles.wrapper}>
                <h1>
                    ДОМАШКА
                </h1>
                <p>{SAMPLE_TEXT}</p>
                <p>{SAMPLE_TEXT}</p>
                <p>{SAMPLE_TEXT}</p>
                <p>{SAMPLE_TEXT}</p>
            </div>
        </>
    )
}

export default Home
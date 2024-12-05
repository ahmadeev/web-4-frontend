import Navbar from "../components/Navbar/Navbar.jsx";
import styles from "../page-styles/Home.module.css";
import {useEffect, useState} from "react";
import Modal from "../components/Modal/Modal.jsx";
import {crudCreate, crudRead, crudUpdate, crudDelete, crudReadMany, crudDeleteMany} from "../utils/crud.js";
import ShotTable from "../components/ShotTable.jsx";
import CreateShot from "../components/CreateShot.jsx";
import Alert from "../components/Alert/Alert.jsx";

function Home({ pageTitle }) {

    const [modalActive, setModalActive] = useState(false);
    const [createShotModalActive, setCreateShotModalActive] = useState(false);

    const [alertActive, setAlertActive] = useState(false);

    const showAlert = () => {
        setAlertActive(true);
    };


    useEffect(() => {
        document.title = pageTitle;
    })

    const BASE_URL = "http://localhost:8080/backend-jakarta-ee-1.0-SNAPSHOT/api/user";
    const SAMPLE_TEXT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

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

                <button onClick={() => setCreateShotModalActive(true)}>CREATE POPUP</button>
                <button onClick={() => setModalActive(true)}>Открыть модальное окно</button>
                <button onClick={showAlert}>ALERT</button>

                <ShotTable
                    fetchData={crudReadMany}
                    readManyUrl={`${BASE_URL}/shots`}
                    deleteOneUrl={`${BASE_URL}/shot`}
                />
            </div>

            <Modal active={createShotModalActive} setActive={setCreateShotModalActive}>
                <CreateShot />
            </Modal>

            <Modal active={modalActive} setActive={setModalActive}>
                <p>hello world бубум бам бам</p>
            </Modal>

            <Alert
                message="This is a custom alert!"
                isActive={alertActive}
                onClose={() => setAlertActive(false)}
            />
        </>
    )
}

export default Home

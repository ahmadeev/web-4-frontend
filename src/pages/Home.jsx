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

    return (
        <>
            <Navbar/>
            <div className={styles.wrapper}>
                <h2>
                    ПРОВЕРКА ПОПАДАНИЯ В ОБЛАСТЬ
                </h2>

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

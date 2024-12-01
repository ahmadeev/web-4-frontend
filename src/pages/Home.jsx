import Navbar from "../components/Navbar.jsx";
import styles from "../page-styles/Home.module.css";
import {useEffect, useState} from "react";
import DataTable from "../components/DataTable.jsx";
import Modal from "../components/Modal.jsx";
import {crudCreate, crudRead, crudUpdate, crudDelete, crudReadMany, crudDeleteMany} from "../utils/crud.js";
import Table from "../components/Table.jsx";
import CreateDragon from "../components/CreateDragon.jsx";

function Home({ pageTitle }) {

    const [modalActive, setModalActive] = useState(false);

    const [createDragonModalActive, setCreateDragonModalActive] = useState(false);

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

                <button onClick={() => setCreateDragonModalActive(true)}>CREATE POPUP</button>
                <button onClick={() => setModalActive(true)}>Открыть модальное окно</button>

                <Table fetchData={crudReadMany} readManyUrl={`${BASE_URL}/dragons`}
                       deleteOneUrl={`${BASE_URL}/dragon`}/>
            </div>

            <Modal active={createDragonModalActive} setActive={setCreateDragonModalActive}>
                <CreateDragon />
            </Modal>

            <Modal active={modalActive} setActive={setModalActive}>
                <DataTable/>
            </Modal>
        </>
    )
}

export default Home

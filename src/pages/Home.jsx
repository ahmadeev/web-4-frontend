import Navbar from "../components/Navbar.jsx";
import styles from "../page-styles/Home.module.css";
import {useEffect, useState} from "react";
import DataTable from "../components/DataTable.jsx";
import Modal from "../components/Modal.jsx";
import {DragonDTO, DragonCaveDTO, CoordinatesDTO, DragonHeadDTO, PersonDTO, LocationDTO } from "../utils/model.js"

function Home({ pageTitle }) {

    const [modalActive, setModalActive] = useState(false);

    useEffect(() => {
        document.title = pageTitle;
    })

    const BASE_URL = "http://localhost:8080/backend-jakarta-ee-1.0-SNAPSHOT/api/user";
    const id = 2;

    function crudCreate(url, object) {
        fetch(`${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(object),
        })
            .then(response => response.json())
            .then(data => console.log('Created item:', data))
            .catch(error => console.error('Error:', error));
    }

    function crudRead(url, id) {
        fetch(`${url}/${id}`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => console.log('Item data:', data))
            .catch(error => console.error('Error:', error));
    }

    function crudUpdate(url, id) {
        fetch(`${url}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: 'Updated Item',
                description: 'Updated description of the item',
            }),
        })
            .then(response => response.json())
            .then(data => console.log('Updated item:', data))
            .catch(error => console.error('Error:', error));
    }

    function crudDelete(url, id) {
        fetch(`${url}/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    console.log('Item deleted');
                } else {
                    console.log('Failed to delete item');
                }
            })
            .catch(error => console.error('Error:', error));
    }

    // Пример создания экземпляра
    const coordinates = new CoordinatesDTO(50, 30);
    const cave = new DragonCaveDTO(15);
    const killer = new PersonDTO("killer", "WHITE", "WHITE", new LocationDTO(1, 1, 1), new Date().toISOString().split('T')[0], 200);
    const head = new DragonHeadDTO(200, 100500);
    const dragon = new DragonDTO(
        "Fire Dragon",
        coordinates,
        cave,
        killer,
        200,  // Age,
        "A fierce and powerful dragon", // Description
        150,  // Wingspan
        null, // No character
        head, // Dragon head
    );

    console.log(dragon);

    return (
        <>
            <Navbar/>
            <div className={styles.wrapper}>

                <h1>
                    ДОМАШКА
                </h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                </p>

                <button onClick={() => setModalActive(true)}>Открыть модальное окно</button>

                <button onClick={() => crudCreate(`${BASE_URL}/dragon`, dragon)}>CREATE</button>
                <button onClick={() => crudRead(`${BASE_URL}/dragon`, id)}>READ</button>
                <button onClick={() => crudUpdate(`${BASE_URL}/dragon`, id)}>UPDATE</button>
                <button onClick={() => crudDelete(`${BASE_URL}/dragon`, id)}>DELETE</button>

                <DataTable/>
            </div>
            <Modal active={modalActive} setActive={setModalActive}>
            <DataTable/>
            </Modal>
        </>
    )
}

export default Home

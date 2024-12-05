import Navbar from "../components/Navbar/Navbar.jsx";
import styles from "../page-styles/Home.module.css";
import {useEffect, useState} from "react";
import Modal from "../components/Modal/Modal.jsx";
import {crudCreate, crudRead, crudUpdate, crudDelete, crudReadMany, crudDeleteMany} from "../utils/crud.js";
import ShotTable from "../components/ShotTable.jsx";
import CreateShot from "../components/CreateShot.jsx";
import Alert from "../components/Alert/Alert.jsx";
import {
    R,
    CENTER,
    draw_graph,
    form_path_string,
    form_polygon_string, X_HALF_R,
    X_MINUS_HALF_R,
    X_MINUS_R,
    Y_HALF_R,
    Y_MINUS_R
} from "../utils/drawGraph.js";
import {useAuth} from "../components/utils/AuthProvider.jsx";

function Home({ pageTitle }) {
    const [isNeedReload, setNeedReload] = useState(false)
    const { logout } = useAuth()

    const [modalActive, setModalActive] = useState(false);
    const [createShotModalActive, setCreateShotModalActive] = useState(false);

    const [alertActive, setAlertActive] = useState(false);

    const showAlert = () => {
        setAlertActive(true);
    };

    const loadDataWrapper = async (func, args) => {
        try {
            const response = await func(...args);

            if (!response.ok) {
                if (response.status === 401)  {
                    console.log("401 Error processing table refresh")
                    logout();
                }
                throw new Error();
            }

            let responseData;
            try {
                responseData = await response.json();
            } catch (error) {
                console.error("Error reading response body", error);
            }
            console.log(responseData)
            return responseData;
            // раньше setReload(true) был тут
        } catch (error) {
            console.error("Error proccessing CRUD:", error);
            return null;
        } finally {
            setNeedReload(true);
        }
    }


    useEffect(() => {
        document.title = pageTitle;

        const svg = document.querySelector("svg");

        let polygon_points = {
            2: form_polygon_string([
                `${CENTER}, ${CENTER}`,
                `${X_MINUS_R}, ${CENTER}`,
                `${CENTER}, ${Y_HALF_R}`
            ]),
            3: form_polygon_string([
                `${CENTER}, ${CENTER}`,
                `${CENTER}, ${Y_MINUS_R}`,
                `${X_MINUS_HALF_R}, ${Y_MINUS_R}`,
                `${X_MINUS_HALF_R}, ${CENTER}`,
            ]),
        }

        let path_points = {
            1: form_path_string({
                "L"     : `${X_HALF_R}, ${CENTER}`,
                "A"     : `${R / 2}, ${R / 2}`,
                "ANGLE" : "0",
                "END"   : `${CENTER}, ${Y_HALF_R}`
            }),
        }

        draw_graph(svg, polygon_points, path_points)
    }, [])

    const BASE_URL = "http://localhost:8080/backend-jakarta-ee-1.0-SNAPSHOT/api/user";

    const svgStyle = {
        height: "250px",
        width: "250px",
    }

    return (
        <>
            <Navbar/>
            <div className={styles.wrapper}>
                <h2>
                    ПРОВЕРКА ПОПАДАНИЯ В ОБЛАСТЬ
                </h2>

                <div className="main_content">
                    <div className={styles.content_left}>
                        <h2>ГРАФИК</h2>
                        <svg style={svgStyle}></svg>
                    </div>
                    <div className={styles.content_right}>
                        <CreateShot
                            loadDataWrapper={loadDataWrapper}
                            setNeedReload={setNeedReload}
                        />
                    </div>
                    <div className="content_center">
                        <ShotTable
                            loadDataWrapper={loadDataWrapper}
                            isNeedReload={isNeedReload}
                            fetchData={crudReadMany}
                            readManyUrl={`${BASE_URL}/shots`}
                            deleteOneUrl={`${BASE_URL}/shot`}
                        />
                    </div>
                </div>


                <button onClick={() => setCreateShotModalActive(true)}>CREATE POPUP</button>
                <button onClick={() => setModalActive(true)}>Открыть модальное окно</button>
                <button onClick={showAlert}>ALERT</button>


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

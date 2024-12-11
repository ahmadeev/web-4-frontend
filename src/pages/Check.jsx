import Navbar from "../components/Navbar/Navbar.jsx";
import styles from "../page-styles/Check.module.css";
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
import {ShotRequestDTO} from "../utils/object.model.js";

function Check({ pageTitle }) {
    const { logout } = useAuth()

    const [isNeedReload, setNeedReload] = useState(false)

    const [modalActive, setModalActive] = useState(false);
    const [createShotModalActive, setCreateShotModalActive] = useState(false);

    const [alertActive, setAlertActive] = useState(false);

    const [rFormCheckboxes, setRFormCheckboxes] = useState({});
    const [lastRChecked, setLastRChecked] = useState("");

    const showAlert = () => {
        setAlertActive(true);
    };

    const loadDataWrapper = async (func, args) => {
        try {
            const response = await func(...args);

            if (!response.ok) {
                let message = "Неизвестная ошибка";
                if (response.status === 401)  {
                    message = "401 Error processing table refresh";
                    logout();
                }
                throw new Error(message);
            }

            let responseData;
            try {
                responseData = await response.json();
            } catch (error) {
                console.error("Error reading response body", error);
            }
            return responseData;
            // раньше setReload(true) был тут
        } catch (error) {
            console.error("Error proccessing CRUD:", error);
            return null;
        } finally {
            setNeedReload((prev) => !prev);
        }
    }

    const handleCheckboxRequest = (checkboxes) => {
        const result = []
        for(const [k, v] of Object.entries(checkboxes)) {
            if (v === true) {
                result.push(Number(k));
            }
        }
        return result;
    }

    const handleSvgClick = (e) => {
        const svg = document.querySelector("svg");
        const rect = svg.getBoundingClientRect();

        const svgOffsetTop = rect.top;
        const svgOffsetLeft = rect.left

        const svgWidth = rect.width;
        const svgHeight = rect.height;

        const { clientX, clientY } = e;

        const svgClickOffsetTop = clientY - svgOffsetTop;
        const svgClickOffsetLeft = clientX - svgOffsetLeft;

        const svgX = svgClickOffsetLeft - svgWidth / 2;
        const svgY = -(svgClickOffsetTop - svgHeight / 2);

        const x = svgX / R * lastRChecked;
        const y = svgY / R * lastRChecked;

        console.log("Смещения:", svgOffsetLeft, svgOffsetTop);
        console.log("Размеры:", svgWidth, svgHeight);
        console.log("Координаты клика:", clientX, clientY);
        console.log("Разница клика:", svgClickOffsetLeft, svgClickOffsetTop);
        console.log("Новая разница клика:", svgX, svgY);
        console.log(`R_CONST: ${R}, last R: ${lastRChecked}`)
        console.log("Координаты:", x, y)
        console.log("R:", rFormCheckboxes);

        const shot = new ShotRequestDTO(
            [x],
            y,
            handleCheckboxRequest(rFormCheckboxes)
        );

        loadDataWrapper(crudCreate, [`${BASE_URL}/shot`, shot])
            .then((res) => {
                console.log(res);
                for(let index = 0; index < res.data.length; index++) {
                    drawDot(res.data[index].x, res.data[index].y, res.data[index].r, res.data[index].hit)
                }

            });
    }

    const drawDot = (x, y, r, isHit) => {
        const svg = document.querySelector('svg')
        const CENTER_CONST = svg.getBoundingClientRect().height / 2;
        const R_CONST = 80

        x += R_CONST * x / r + CENTER_CONST
        y += -R_CONST * y / r + CENTER_CONST

        console.log(`x: ${x}, y: ${y}, r: ${r}, isHit: ${isHit}`);

        const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
        dot.setAttributeNS(null, 'cx', x);
        dot.setAttributeNS(null, 'cy', y);
        dot.setAttributeNS(null, 'class', 'target-dot');
        dot.setAttributeNS(null, 'r', '3');

        let dotColor;
        console.log(`r: ${r}, last r: ${lastRChecked}`);
        if (r === parseFloat(lastRChecked)) {
            dotColor = (isHit ? 'fill: green; stroke: black;' : 'fill: red; stroke: black;')
        } else {
            dotColor = 'fill: white; stroke: black;'
        }

        dot.setAttributeNS(null, 'style', dotColor);
        svg.appendChild(dot);
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

                <div className={styles.main_content}>
                    <div className={styles.content_left}>
                        {/*<h2>ГРАФИК</h2>*/}
                        <svg
                            onClick={(e) => {handleSvgClick(e)}}
                            style={svgStyle}
                        ></svg>
                    </div>
                    <div className={styles.content_right}>
                        <CreateShot
                            loadDataWrapper={loadDataWrapper}
                            setNeedReload={setNeedReload}
                            setRCheckboxesParentState={setRFormCheckboxes}
                            setLastRCheckedParentState={setLastRChecked}
                            drawDot={drawDot}
                        />
                    </div>
                    <div className={styles.content_center}>
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

export default Check

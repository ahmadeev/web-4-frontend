import Navbar from "../components/Navbar/Navbar.jsx";
import styles from "../page-styles/Check.module.css";
import {useEffect, useState} from "react";
import Modal from "../components/Modal/Modal.jsx";
import {crudCreate, crudRead, crudUpdate, crudDelete, crudReadMany, crudDeleteMany} from "../utils/crud.js";
import ShotTable from "../components/ShotTable.jsx";
import CreateShot from "../components/CreateShot.jsx";
import Alert from "../components/Alert/Alert.jsx";
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
    }, [pageTitle])

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
                            onClick={(e) => {
                                handleSvgClick(e)
                            }}
                            style={svgStyle}
                        >
                            <g className="x-grid">
                                <line stroke="black" x1="0" x2="250" y1="125" y2="125"></line>
                            </g>
                            <g className="y-grid">
                                <line stroke="black" x1="125" x2="125" y1="0" y2="250"></line>
                            </g>

                            <g className="grid-labels">
                                <text x="135" y="15">Y</text>
                                <text x="235" y="105">X</text>
                            </g>

                            <polygon fill="black" points="125, 0 130, 10 120, 10" stroke="black"></polygon>
                            <polygon fill="black" points="250, 125 240, 120 240, 130" stroke="black"></polygon>

                            <polygon fill="white" fillOpacity="0.7" stroke="black"
                                     points="125, 125 125, 165 85, 125"></polygon>
                            <polygon fill="white" fillOpacity="0.7" stroke="black"
                                     points="125, 125 125, 45 85, 45 85, 125"></polygon>
                            <path fill="white" fillOpacity="0.7" stroke="black"
                                  d="M 125, 125 L 125, 85 A 40, 40 90 0, 1 165, 125"></path>

                            <g className="labels x-labels">
                                <text x="45" y="115" className="min_R">{lastRChecked ? -lastRChecked : "-R"}</text>
                                <text x="90" y="115" className="min_half_R">{lastRChecked ? -lastRChecked / 2 : "-R/2"}</text>
                                <text x="165" y="140" className="half_R">{lastRChecked ? lastRChecked / 2 : "R/2"}</text>
                                <text x="205" y="140" className="R">{lastRChecked ? lastRChecked : "R"}</text>
                            </g>
                            <g className="labels y-labels">
                                <text x="130" y="205" className="min_R">{lastRChecked ? -lastRChecked : "-R"}</text>
                                <text x="130" y="165" className="min_half_R">{lastRChecked ? -lastRChecked / 2 : "-R/2"}</text>
                                <text x="130" y="80" className="half_R">{lastRChecked ? lastRChecked / 2 : "R/2"}</text>
                                <text x="130" y="40" className="R">{lastRChecked ? lastRChecked : "R"}</text>
                            </g>
                            <g className="pridumaupozhe">
                                <line stroke="black" x1="122" x2="128" y1="205" y2="205"></line>
                                <line stroke="black" x1="122" x2="128" y1="165" y2="165"></line>
                                <line stroke="black" x1="122" x2="128" y1="85" y2="85"></line>
                                <line stroke="black" x1="122" x2="128" y1="45" y2="45"></line>

                                <line stroke="black" y1="122" y2="128" x1="205" x2="205"></line>
                                <line stroke="black" y1="122" y2="128" x1="165" x2="165"></line>
                                <line stroke="black" y1="122" y2="128" x1="85" x2="85"></line>
                                <line stroke="black" y1="122" y2="128" x1="45" x2="45"></line>
                            </g>
                        </svg>

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
                <CreateShot/>
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

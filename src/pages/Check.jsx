import Navbar from "../components/Navbar/Navbar.jsx";
import styles from "../page-styles/Check.module.css";
import React, {useEffect, useState} from "react";
import {
    crudCreate,
    crudRead,
    crudUpdate,
    crudDelete,
    crudReadMany,
    crudDeleteMany,
    crudReadAll
} from "../utils/crud.js";
import ShotTable from "../components/ShotTable/ShotTable.jsx";
import CreateShot from "../components/CreateShot/CreateShot.jsx";
import Alert from "../components/Alert/Alert.jsx";
import {useAuth} from "../components/utils/AuthProvider.jsx";
import {ShotRequestDTO} from "../utils/object.model.js";
import {drawDot, drawDots} from "../utils/graph.js";

function Check({ pageTitle }) {
    const { logout } = useAuth()

    const [isNeedReload, setNeedReload] = useState(false)

    const [alertActive, setAlertActive] = useState(false);

    const [rFormCheckboxes, setRFormCheckboxes] = useState({});
    const [lastRChecked, setLastRChecked] = useState("");

    const R_TO_PIXEL = 80;
    const BASE_URL = "http://localhost:8080/backend-jakarta-ee-1.0-SNAPSHOT/api/user";

    const svgStyle = {
        height: "250px",
        width: "250px",
    }

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
        const checkboxes = handleCheckboxRequest(rFormCheckboxes);
        if (!(checkboxes.length > 0)) {
            showAlert();
            return;
        }

        const svg = document.querySelector("svg");
        const rect = svg.getBoundingClientRect();

        const svgOffsetLeft = rect.left
        const svgOffsetTop = rect.top;

        const svgWidth = rect.width;
        const svgHeight = rect.height;

        const { clientX, clientY } = e;

        const svgClickOffsetLeft = clientX - svgOffsetLeft;
        const svgClickOffsetTop = clientY - svgOffsetTop;

        const svgX = svgClickOffsetLeft - svgWidth / 2;
        const svgY = -(svgClickOffsetTop - svgHeight / 2);

        const x = svgX / R_TO_PIXEL * lastRChecked;
        const y = svgY / R_TO_PIXEL * lastRChecked;

        const shot = new ShotRequestDTO(
            [x],
            y,
            checkboxes
        );

        loadDataWrapper(crudCreate, [`${BASE_URL}/shot`, shot])
            .then((responseData) => {
                setNeedReload((prev) => (!prev));
                return responseData;
            })
            .then((res) => {
                for(let index = 0; index < res.data.length; index++) {
                    drawDot(res.data[index].x, res.data[index].y, res.data[index].r, res.data[index].hit, lastRChecked)
                }
            });
    }

    useEffect(() => {
        document.title = pageTitle;
    }, [pageTitle])

    // отмена выбора R
    useEffect(() => {
        if (!(handleCheckboxRequest(rFormCheckboxes).length > 0)) {
            setLastRChecked("");
        }
    }, [rFormCheckboxes])

    useEffect(() => {
        if (lastRChecked === "") {
            return () => {
                document.querySelectorAll('circle').forEach(el => {el.remove()});
            };
        }
        loadDataWrapper(crudReadAll, [`${BASE_URL}/all-shots`])
            .then((res) => {
                drawDots(lastRChecked, res.data);
            })

        return () => {
            document.querySelectorAll('circle').forEach(el => {el.remove()});
        };
    }, [lastRChecked]);

    return (
        <>
            <Navbar/>
            <div className={styles.wrapper}>
                <h2>
                    ПРОВЕРКА ПОПАДАНИЯ В ОБЛАСТЬ
                </h2>

                <div className={styles.main_content}>

                    <div className={styles.content_top_center}>
                        <div className={styles.content_left}>
                            <svg
                                id="graph"
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

                                {lastRChecked > 0 && (
                                    <>
                                        <polygon fill="white" fillOpacity="0.7" stroke="black"
                                                 points="125, 125 125, 165 85, 125"></polygon>
                                        <polygon fill="white" fillOpacity="0.7" stroke="black"
                                                 points="125, 125 125, 45 85, 45 85, 125"></polygon>
                                        <path fill="white" fillOpacity="0.7" stroke="black"
                                              d="M 125, 125 L 125, 85 A 40, 40 90 0, 1 165, 125"></path>
                                    </>
                                )}

                                {lastRChecked < 0 && (
                                    <>
                                        <polygon fill="white" fillOpacity="0.7" stroke="black"
                                                 points="125,125 125,85 165,125"></polygon>
                                        <polygon fill="white" fillOpacity="0.7" stroke="black"
                                                 points="125,125 125,205 165,205 165,125"></polygon>
                                        <path fill="white" fillOpacity="0.7" stroke="black"
                                              d="M 125,125 L 125,165 A 40,40 90 0,1 85,125"></path>
                                    </>
                                )}

                                {parseFloat(lastRChecked) === 0 && (
                                    <></>
                                )}

                                <g className="labels x-labels">
                                    <text x="45" y="115"
                                          className="min_R">{lastRChecked ? -Math.abs(lastRChecked) : "-R"}</text>
                                    <text x="90" y="115"
                                          className="min_half_R">{lastRChecked ? -Math.abs(lastRChecked) / 2 : "-R/2"}</text>
                                    <text x="165" y="140"
                                          className="half_R">{lastRChecked ? Math.abs(lastRChecked) / 2 : "R/2"}</text>
                                    <text x="205" y="140"
                                          className="R">{lastRChecked ? Math.abs(lastRChecked) : "R"}</text>
                                </g>
                                <g className="labels y-labels">
                                    <text x="130" y="205"
                                          className="min_R">{lastRChecked ? -Math.abs(lastRChecked) : "-R"}</text>
                                    <text x="130" y="165"
                                          className="min_half_R">{lastRChecked ? -Math.abs(lastRChecked) / 2 : "-R/2"}</text>
                                    <text x="130" y="80"
                                          className="half_R">{lastRChecked ? Math.abs(lastRChecked) / 2 : "R/2"}</text>
                                    <text x="130" y="40"
                                          className="R">{lastRChecked ? Math.abs(lastRChecked) : "R"}</text>
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
                                lastRCheckedParentState={lastRChecked}
                                setLastRCheckedParentState={setLastRChecked}
                            />
                        </div>
                    </div>

                    <div className={styles.content_bottom_center}>
                        <div className={styles.content_center}>
                            <ShotTable
                                loadDataWrapper={loadDataWrapper}
                                isNeedReload={isNeedReload}
                                setNeedReload={setNeedReload}
                                readAllUrl={`${BASE_URL}/all-shots`}
                                readManyUrl={`${BASE_URL}/shots`}
                                deleteOneUrl={`${BASE_URL}/shot`}
                                lastRCheckedParentState={lastRChecked}
                            />
                        </div>
                    </div>
                </div>

            </div>

            <Alert
                message="Для проверки выберите R!"
                isActive={alertActive}
                onClose={() => setAlertActive(false)}
            />
        </>
    )
}

export default Check

import React, {useEffect, useState} from "react";
import {ShotRequestDTO} from "../../utils/object.model.js";
import {crudCreate, crudDeleteMany} from "../../utils/crud.js";
import {drawDot} from "../../utils/graph.js";
import styles from "./CreateShot.module.css";

function CreateShot({ loadDataWrapper, setNeedReload, setRCheckboxesParentState, lastRCheckedParentState, setLastRCheckedParentState, setPageParentState }) {
    const BASE_URL = "http://localhost:8080/backend-jakarta-ee-1.0-SNAPSHOT/api/user";
    const values = [
        "-2.0", "-1.5", "-1.0",
        "-0.5", "0.0", "0.5",
        "1.0", "1.5", "2.0"
    ]

    const [y, setY] = useState("");

    const [xCheckboxes, setXCheckboxes] = useState(
        values.reduce((acc, value) => ({ ...acc, [value]: false }), {})
    );

    const [rCheckboxes, setRCheckboxes] = useState(
        values.reduce((acc, value) => ({ ...acc, [value]: false }), {})
    );

    const [submitButtonState, setSubmitButtonState] = useState(false);

    const isCheckboxesValid = (checkboxes) => {
        return Object.values(checkboxes).includes(true);
    }

    useEffect(() => {
        {/* TODO: прикольный костыль. Компонент рендерится без пропса: при одном if все работает, с else и без блока вообще -- перестает */}
        if (typeof setRCheckboxesParentState === "function") {
            setRCheckboxesParentState(rCheckboxes);
        }
    }, [rCheckboxes]);

    useEffect(() => {
        setSubmitButtonState(
            y !== "" &&
            y.match(/^-?\d+(?:[.,]\d{1,15})?$/) &&
            parseFloat(y.replace(",", ".")) >= -5 &&
            parseFloat(y.replace(",", ".")) <= 3 &&
            isCheckboxesValid(xCheckboxes) &&
            isCheckboxesValid(rCheckboxes)
        );
    }, [xCheckboxes, y, rCheckboxes]);

    const handleYChange = (e) => {
        setY(e.target.value);
    }

    const handleCheckboxChange = (event, setCheckboxes) => {
        const { name, checked } = event.target;
        setCheckboxes((prev) => ({
            ...prev,
            [name]: checked,
        }));
    };

    const handleCheckboxRequest = (checkboxes) => {
        const result = []
        for(const [k, v] of Object.entries(checkboxes)) {
            if (v === true) {
                result.push(Number(k));
            }
        }
        return result;
    }

    const handleRequest = () => {
        const dto = new ShotRequestDTO(
            handleCheckboxRequest(xCheckboxes),
            y,
            handleCheckboxRequest(rCheckboxes)
        )

        loadDataWrapper(crudCreate, [`${BASE_URL}/shot`, dto])
            .then((responseData) => {
                setNeedReload((prev) => (!prev));
                return responseData;
            })
            .then((res) => {
                console.log(res);
                for(let index = 0; index < res.data.length; index++) {
                    console.log("одиночка",res.data[index].r, lastRCheckedParentState)
                    drawDot(res.data[index].x, res.data[index].y, res.data[index].r, res.data[index].hit, lastRCheckedParentState)
                }
            });
    }

    return (
        <form style={{
            textAlign: "left",
            // width: "60%",
            paddingLeft: "30px",
            paddingRight: "30px",
            boxSizing: "border-box"
        }}>
            {/*<h2>ФОРМА ДЛЯ ТОЧКИ</h2>*/}
            <div className="form-section">
                <div className={styles.form_group}>
                    <label>CHOOSE X:</label><br/>
                    <div className={styles.form_checkbox_input_group}>
                        {values && values.map((value, index) => (
                            <>
                                <label
                                    className={styles.form_checkbox_input_label}
                                    key={index}
                                >
                                    <input
                                        type="checkbox"
                                        name={value}
                                        checked={xCheckboxes[value]}
                                        onChange={(e) => {
                                            handleCheckboxChange(e, setXCheckboxes)
                                        }}
                                    />
                                    {value}
                                </label>
                            </>
                        ))}
                    </div>
                </div>

                <div className={styles.form_group}>
                    <label>CHOOSE Y:</label><br/>
                    <input
                        value={y}
                        className={styles.form_text_input}
                        onChange={(e) => {
                            handleYChange(e)
                        }}
                        type="text"
                        placeholder="from -5 to 3"
                    /><br/>
                </div>

                <div className={styles.form_group}>
                    <label>CHOOSE R:</label><br/>
                    <div className={styles.form_checkbox_input_group}>
                        {values && values.map((value, index) => (
                            <>
                                <label
                                    key={index}
                                    className={styles.form_checkbox_input_label}
                                >
                                    <input
                                        type="checkbox"
                                        name={value}
                                        checked={rCheckboxes[value]}
                                        onChange={(e) => {
                                            handleCheckboxChange(e, setRCheckboxes)
                                            if (e.target.checked) {
                                                setLastRCheckedParentState(e.target.name);
                                            } else {
                                                let checked = handleCheckboxRequest(rCheckboxes);
                                                if (checked.length > 0) {
                                                    for (let i = 0; i < checked.length; i++) {
                                                        if (checked[i] !== parseFloat(e.target.name)) {
                                                            setLastRCheckedParentState(checked[i]);
                                                            return;
                                                        }
                                                    }
                                                }
                                                setLastRCheckedParentState("");
                                            }
                                        }}
                                    />
                                    {value}
                                </label>
                            </>
                        ))}
                    </div>
                </div>
            </div>

            <div className={styles.form_button_block}>
                <button disabled={(!submitButtonState)} onClick={() => {
                    event.preventDefault();
                    handleRequest();
                }}>CREATE
                </button>
                <button onClick={(e) => {
                    e.preventDefault();
                    loadDataWrapper(crudDeleteMany, [`${BASE_URL}/shots`])
                        .then((responseData) => {
                            setNeedReload((prev) => (!prev));
                            setPageParentState((prev) => (!prev));
                            setLastRCheckedParentState("");

                            document.querySelectorAll('circle').forEach(el => {el.remove()})

                            Object.keys(xCheckboxes).forEach(key => {
                                xCheckboxes[key] = false;
                            });

                            setY("");

                            Object.keys(rCheckboxes).forEach(key => {
                                rCheckboxes[key] = false;
                            });

                            return responseData;
                        })
                        .catch((error) => {
                            console.error("Error sending DELETE request:", error);
                        });
                }}>RESET
                </button>
            </div>

        </form>
    )
}

export default CreateShot

import React, {useEffect, useState} from "react";
import {ShotRequestDTO} from "../utils/object.model.js";
import {crudCreate, crudDeleteMany} from "../utils/crud.js";

function CreateShot({ loadDataWrapper, setNeedReload, setRCheckboxesParentState, setLastRCheckedParentState, drawDot }) {
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
        setLastRCheckedParentState(name);
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
            .then((res) => {
                console.log(res);
                for(let index = 0; index < res.data.length; index++) {
                    drawDot(res.data[index].x, res.data[index].y, res.data[index].r, res.data[index].isHit)
                }

            });
    }

    return (
        <div>
            <form>
                {/*<h2>ФОРМА ДЛЯ ТОЧКИ</h2>*/}
                <div className="form-section">
                    <div className="form-group">
                        <label>x:</label><br/>
                        {values && values.map((value, index) => (
                            <>
                                <label key={index}>
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
                                {(index + 1) % 3 === 0 && <br/>}
                            </>
                        ))}

                        <label>y:</label>
                        <input
                            value={y}
                            onChange={(e) => {
                                handleYChange(e)
                            }}
                            type="text"
                            placeholder="from -5 to 3"
                        /><br/>

                        <label>r:</label><br/>
                        {values && values.map((value, index) => (
                            <>
                                <label key={index}>
                                    <input
                                        type="checkbox"
                                        name={value}
                                        checked={rCheckboxes[value]}
                                        onChange={(e) => {
                                            handleCheckboxChange(e, setRCheckboxes)
                                        }}
                                    />
                                    {value}
                                </label>
                                {(index + 1) % 3 === 0 && <br/>}
                            </>
                        ))}
                    </div>
                </div>

                <button disabled={(!submitButtonState)} onClick={() => {
                    event.preventDefault();
                    handleRequest();
                }}>CREATE
                </button>
                <button onClick={() => {
                    loadDataWrapper(crudDeleteMany, [`${BASE_URL}/shots`]);
                }}>RESET
                </button>
            </form>
        </div>
    )
}

export default CreateShot

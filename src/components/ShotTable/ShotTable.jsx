import React, { useState, useEffect } from 'react';
import {crudCreate, crudDelete, crudDeleteMany, crudRead, crudReadAll, crudReadMany, crudUpdate} from "../../utils/crud.js";
import {ShotRequestDTO} from "../../utils/object.model.js";
import {useAuth} from "../utils/AuthProvider.jsx";
import "./ShotTable.module.css"

const ShotTable = ({ loadDataWrapper, isNeedReload, setNeedReload, readManyUrl, deleteOneUrl, lastRCheckedParentState, pageParentState, setPageParentState }) => {
    const { logout } = useAuth();

    const [data, setData] = useState([]);

    const [size, setSize] = useState(10);

    const [isLoading, setIsLoading] = useState(true);

    const [maxPageIncreaseButtonState, setMaxPageIncrease] = useState(true);

    const handlePageChange = (direction) => {
        setPageParentState((prevPage) => prevPage + direction);
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await crudReadMany(readManyUrl, pageParentState, size); // асинхронно грузим страницу данных из БД

                if (!response.ok) {
                    if (response.status === 401)  {
                        console.log("Ошибка 401 при загрузке ShotTable")
                        logout();
                    }
                    throw new Error();
                }

                const responseData = await response.json();
                setData(responseData.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();

    }, [isNeedReload, readManyUrl, pageParentState, size]); // пустой -- один раз. data не добавляем, иначе луп

    const BASE_URL = "http://localhost:8080/backend-jakarta-ee-1.0-SNAPSHOT/api/user";

    const DIV_STYLE = {
        display: "flex",
        justifyContent: "space-between",
        gap: "0.5rem"
    }

    // Пример создания экземпляра
    const shot = new ShotRequestDTO(
        [1],
        2,
        [2]
    );

    return (
        <>
            <h2>ТАБЛИЦА ПРОВЕРОК</h2>
            <div style={{
                maxWidth: "100%",
                display: "flex",
                alignItems: "center",
                overflowX: "auto"
            }}>
                <table border="1">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>x</th>
                        <th>y</th>
                        <th>r</th>
                        <th>hit</th>
                        <th>shot time</th>
                        <th>script time</th>
                        <th>REMOVE</th>
                    </tr>
                    </thead>
                    <tbody>
                    {isLoading && (
                        <tr>
                            <td colSpan="8" style={{textAlign: "center"}}>Загрузка данных...</td>
                        </tr>
                    )}
                    {!isLoading && (!data || !data.length) && (
                        <tr>
                            <td colSpan="8" style={{textAlign: "center"}}>Данные отсутствуют</td>
                        </tr>
                    )}
                    {data && data.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{(item.x).toFixed(3)}</td>
                            <td>{(item.y).toFixed(3)}</td>
                            <td>{item.r}</td>
                            <td>{item.hit ? <span style={{color: "green", fontWeight: 700}}>hit</span> :
                                <span style={{color: "red", fontWeight: 700}}>miss</span>}</td>
                            <td>{item.currentTime}</td>
                            <td>{item.scriptTime}</td>
                            <td>
                                <button onClick={() => {
                                    loadDataWrapper(crudDelete, [deleteOneUrl, item.id])
                                        .then((responseData) => {
                                            setNeedReload((prev) => (!prev));
                                            return responseData;
                                        });
                                }}>
                                    X
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>


            <div style={DIV_STYLE}>
                <button id="decrease-page-min" onClick={() => {
                    setPageParentState(0);
                    setMaxPageIncrease(true);
                }} disabled={pageParentState === 0}>&lt;&lt;</button>
                <button id="decrease-page" onClick={() => {
                    handlePageChange(-1);
                    setMaxPageIncrease(true);
                }} disabled={pageParentState === 0}>&lt;</button>
                <p>{pageParentState + 1}</p>
                <button id="increase-page" onClick={() => {
                    handlePageChange(1);
                    setMaxPageIncrease(true);
                }} disabled={data.length < 10 || !maxPageIncreaseButtonState}>&gt;</button>
                <button id="increase-page-max" onClick={() => {
                    let count;
                    const loadCount = async () => {
                        try {
                            const response = await fetch(`${BASE_URL}/shots-count`, {
                                method: 'GET',
                                headers: {
                                    'Authorization': `Bearer ${sessionStorage.getItem('session-token')}`,
                                },
                            });

                            if (!response.ok) {
                                if (response.status === 401) {
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
                            count = await responseData.data;
                            handlePageChange(Math.ceil((count - (pageParentState + 1) * size) / size));
                            setMaxPageIncrease(false)
                            return responseData;
                        } catch (error) {
                            console.error("Error proccessing CRUD:", error);
                            return null;
                        }
                    }

                    loadCount();

                }} disabled={data.length < 10 || !maxPageIncreaseButtonState}>&gt;&gt;</button>
            </div>
        </>
    );
};

export default ShotTable;

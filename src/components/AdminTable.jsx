import React, { useState, useEffect } from 'react';
import {crudDelete, crudUpdate} from "../utils/crud.js";
import {useAuth} from "./AuthProvider.jsx";

const AdminTable = ({ fetchData, readManyUrl, deleteOneUrl }) => {
    const { logout } = useAuth();

    const [data, setData] = useState([]);  // состояние для данных

    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);

    const [reload, setReload] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const loadDataWrapper = async (func, args) => {
        try {
            const response = await func(...args);

            if (!response.ok) {
                if (response.status === 401) logout();
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
            setReload(true);
        }
    }

    // эмуляция получения данных (или вы можете использовать fetch, axios и т.д.)
    useEffect(() => {
        if (page === 0) document.getElementById("decrease-page").setAttribute("disabled", "")
        // if (!data || !data.length) document.getElementById("increase-page").setAttribute("disabled", "")
        // console.log(data, data.length)

        const loadData = async () => {
            try {
                const response = await fetchData(readManyUrl, page, size); // асинхронно грузим страницу данных из БД

                if (!response.ok) {
                    if (response.status === 401) logout();
                    throw new Error();
                }

                const responseData = await response.json();
                setData(responseData.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setReload(false);
                setIsLoading(false);
            }
        };

        loadData();

        // setData(loadDataWrapper(fetchData, [page, size]));
        // setIsLoading(false);

        // console.log(data, data.length)
        // if (data && data.length) document.getElementById("increase-page").removeAttribute("disabled");

    }, [fetchData, readManyUrl, page, size, reload]); // пустой массив зависимостей — значит, запрос выполняется только один раз при монтировании компонента

    const BASE_URL = "http://localhost:8080/backend-jakarta-ee-1.0-SNAPSHOT/api/admin";

    return (
        <>
            <h1>Таблица данных</h1>
            <table border="1">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Approve</th>
                    <th>Remove</th>
                </tr>
                </thead>
                <tbody>
                {isLoading && (
                    <tr>
                        <td colSpan="4" style={{textAlign: "center"}}>Загрузка данных...</td>
                    </tr>
                )}
                {!isLoading && (!data || !data.length) && (
                    <tr>
                        <td colSpan="4" style={{textAlign: "center"}}>Данные отсутствуют</td>
                    </tr>
                )}
                {data && data.map(item => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>
                            <button onClick={() => {
                                loadDataWrapper(crudUpdate, [`${BASE_URL}/user`, item.id])
                            }}>
                                +
                            </button>
                        </td>
                        <td>
                            <button onClick={() => {
                                loadDataWrapper(crudDelete, [deleteOneUrl, item.id])
                            }}>
                                X
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div>
                <button id="decrease-page" onClick={async () => {
                    await setPage(page - 1);
                }}>left
                </button>
                <p>{page + 1}</p>
                <button id="increase-page" onClick={async () => {
                    await setPage(page + 1);
                    document.getElementById("decrease-page").removeAttribute("disabled");
                }}>right
                </button>
            </div>
        </>
    );
};

export default AdminTable;

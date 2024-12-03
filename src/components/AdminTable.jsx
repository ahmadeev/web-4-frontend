import React, {useEffect, useState} from 'react';
import {crudDelete, crudUpdate} from "../utils/crud.js";
import {useAuth} from "./AuthProvider.jsx";

const AdminTable = ({ fetchData, readManyUrl, deleteOneUrl }) => {
    const { logout } = useAuth();

    const [data, setData] = useState([]);

    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);

    const [reload, setReload] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const loadDataWrapper = async (func, args) => {
        try {
            const response = await func(...args);

            if (!response.ok) {
                if (response.status === 401) {
                    console.log("Ошибка 401 при обновлении AdminTable")
                    logout();
                }
                throw new Error();
            }

            return await response.json();
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

        const loadData = async () => {
            try {
                const response = await fetchData(readManyUrl, page, size); // асинхронно грузим страницу данных из БД

                if (!response.ok) {
                    if (response.status === 401)  {
                        console.log("Ошибка 401 при загрузке AdminTable")
                        logout();
                    }
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

    }, [fetchData, readManyUrl, page, size, reload]); // пустой -- один раз. data не добавляем, иначе луп

    const handlePageChange = (direction) => {
        setPage((prevPage) => prevPage + direction);
    };

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
                <button id="decrease-page" onClick={() => handlePageChange(-1)} disabled={page === 0}>left</button>
                <p>{page + 1}</p>
                <button id="increase-page" onClick={() => handlePageChange(1)}>right</button>
            </div>
        </>
    );
};

export default AdminTable;

import React, { useState, useEffect } from 'react';
import {crudDelete} from "../utils/crud.js";

const Table = ({ fetchData, readManyUrl, deleteOneUrl }) => {
    const [data, setData] = useState([]);  // Состояние для данных
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [reload, setReload] = useState(false);

    // Эмуляция получения данных (или вы можете использовать fetch, axios и т.д.)
    useEffect(() => {
        if (page === 0) document.getElementById("decrease-page").setAttribute("disabled", "")
        // if (!data || !data.length) document.getElementById("increase-page").setAttribute("disabled", "")
        // console.log(data, data.length)

        const loadData = async () => {
            try {
                const response = await fetchData(readManyUrl, page, size); // Ожидаем результат функции
                setData(response ? response.data : []); // Обрабатываем результат
                console.log(data)

            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setReload(false);
            }
        };

        loadData()
        // console.log(data, data.length)
        // if (data && data.length) document.getElementById("increase-page").removeAttribute("disabled");

    }, [fetchData, readManyUrl, page, size, reload]); // Пустой массив зависимостей — значит, запрос выполняется только один раз при монтировании компонента

    return (
        <>
            <h1>Таблица данных</h1>
            <table border="1">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Coordinates</th>
                    <th>Cave</th>
                    <th>Killer</th>
                    <th>Age</th>
                    <th>Description</th>
                    <th>Wingspan</th>
                    <th>Character</th>
                    <th>Head</th>
                    <th>Edit</th>
                    <th>Remove</th>
                </tr>
                </thead>
                <tbody>
                {(!data || !data.length) && (
                    <tr><td colSpan="12" style={{ textAlign: "center" }}>Данные отсутствуют</td></tr>
                )}
                {data && data.map(item => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.coordinates.toString()}</td>
                        <td>{item.cave.toString()}</td>
                        <td>{item.killer.toString()}</td>
                        <td>{item.age}</td>
                        <td>{item.description}</td>
                        <td>{item.wingspan}</td>
                        <td>{item.character}</td>
                        <td>{item.head.toString()}</td>
                        <td>E</td>
                        <td><button onClick={() => {
                            crudDelete(deleteOneUrl, item.id)
                            setReload(true);
                        }}>X</button></td>
                    </tr>
                ))}

                {
                    console.log(data)
                }
                </tbody>
            </table>
            <button id="decrease-page" onClick={async () => {
                await setPage(page - 1);
            }}>left</button>
            <button id="increase-page" onClick={async () => {
                await setPage(page + 1);
                document.getElementById("decrease-page").removeAttribute("disabled");
            }}>right</button>
        </>
    );
};

export default Table;

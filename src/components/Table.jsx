import React, { useState, useEffect } from 'react';
import {crudCreate, crudDelete, crudDeleteMany, crudRead, crudReadMany, crudUpdate} from "../utils/crud.js";
import {
    CoordinatesDTO,
    DragonCaveDTO,
    DragonDTO,
    DragonHeadDTO,
    LocationDTO,
    PersonDTO
} from "../utils/object.model.js";
import {useAuth} from "./AuthProvider.jsx";

const Table = ({ fetchData, readManyUrl, deleteOneUrl }) => {
    const { logout } = useAuth();

    const [data, setData] = useState([]);  // Состояние для данных

    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);

    const [reload, setReload] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

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
                setIsLoading(false);
            }
        };

        loadData()
        // console.log(data, data.length)
        // if (data && data.length) document.getElementById("increase-page").removeAttribute("disabled");

    }, [fetchData, readManyUrl, page, size, reload]); // пустой -- один раз. data не добавляем, иначе луп

    const BASE_URL = "http://localhost:8080/backend-jakarta-ee-1.0-SNAPSHOT/api/user";
    const id = 2;

    // Пример создания экземпляра
    const coordinates = new CoordinatesDTO(50, 30);
    const cave = new DragonCaveDTO(15);
    const killer = new PersonDTO("killer", "WHITE", "WHITE", new LocationDTO(1, 1, 1), new Date().toISOString().split('T')[0], 200);
    const head = new DragonHeadDTO(200, 100500);
    const dragon = new DragonDTO(
        "Fire Dragon",
        coordinates,
        cave,
        killer,
        200,  // Age,
        "A fierce and powerful dragon", // Description
        150,  // Wingspan
        null, // No character
        head, // Dragon head
    );

    console.log(dragon);

    return (
        <>
            <button onClick={() => {
                crudCreate(`${BASE_URL}/dragon`, dragon)
                    .then(response => {
                        if (!response.ok) {
                            if (response.status === 401) logout();
                            throw new Error();
                        }
                        return response.json();
                    })
                    .catch(error => {
                        console.error("Error occurred!", error);
                    })
                setReload(true);
            }}>CREATE</button>
            <button onClick={() => crudRead(`${BASE_URL}/dragon`, id)}>READ</button>
            <button onClick={() => crudUpdate(`${BASE_URL}/dragon`, id)}>UPDATE</button>
            <button onClick={() => crudDelete(`${BASE_URL}/dragon`, id)}>DELETE</button>

            <button onClick={() => crudReadMany(`${BASE_URL}/dragons`)}>READ MANY</button>
            <button onClick={() => crudDeleteMany(`${BASE_URL}/dragons`)}>DELETE MANY</button>

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
                {isLoading && (
                    <tr>
                        <td colSpan="12" style={{textAlign: "center"}}>Загрузка данных...</td>
                    </tr>
                )}
                {!isLoading && (!data || !data.length) && (
                    <tr>
                        <td colSpan="12" style={{textAlign: "center"}}>Данные отсутствуют</td>
                    </tr>
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
                        <td>
                            <button>
                                /
                            </button>
                        </td>
                        <td>
                            <button onClick={() => {
                                crudDelete(deleteOneUrl, item.id)
                                setReload(true);
                            }}>X
                            </button>
                        </td>
                    </tr>
                ))}

                {
                    console.log(data)
                }
                </tbody>
            </table>
            <button id="decrease-page" onClick={async () => {
                await setPage(page - 1);
            }}>left
            </button>
            <button id="increase-page" onClick={async () => {
                await setPage(page + 1);
                document.getElementById("decrease-page").removeAttribute("disabled");
            }}>right
            </button>
        </>
    );
};

export default Table;

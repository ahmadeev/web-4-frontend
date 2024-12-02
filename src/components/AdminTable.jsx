import React, { useState, useEffect } from 'react';

const AdminTable = () => {
    const [data, setData] = useState([]);  // состояние для данных

    const [isLoading, setIsLoading] = useState(true);

    // эмуляция получения данных (или вы можете использовать fetch, axios и т.д.)
    useEffect(() => {
        const fetchData = async () => {
            // пример с локальными данными (можно заменить на fetch() или axios для загрузки из API)
            try {
                const jsonData = [
                    {id: 1, name: "John"},
                    {id: 2, name: "Jane"},
                    {id: 3, name: "Mike"},
                    {id: 4, name: "Sara"},
                    {id: 5, name: "Tom"}
                ];
                setData(jsonData);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();

    }, []); // пустой массив зависимостей — значит, запрос выполняется только один раз при монтировании компонента

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
                                // crudUpdate(`${BASE_URL}/dragon`, id);
                                // setReload(true);
                            }}>
                                +
                            </button>
                        </td>
                        <td>
                            <button onClick={() => {
                                // loadDataWrapper(crudDelete, [deleteOneUrl, item.id])
                            }}>
                                X
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
};

export default AdminTable;

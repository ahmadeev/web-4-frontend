import React, { useState, useEffect } from 'react';

const DataTable = () => {
    const [data, setData] = useState([]);  // Состояние для данных

    // Эмуляция получения данных (или вы можете использовать fetch, axios и т.д.)
    useEffect(() => {
        const fetchData = async () => {
            // Пример с локальными данными (можно заменить на fetch() или axios для загрузки из API)
            const jsonData = [
                { id: 1, name: "John", age: 28 },
                { id: 2, name: "Jane", age: 32 },
                { id: 3, name: "Mike", age: 24 },
                { id: 4, name: "Sara", age: 26 },
                { id: 5, name: "Tom", age: 22 }
            ];
            setData(jsonData);
        };

        fetchData();
    }, []); // Пустой массив зависимостей — значит, запрос выполняется только один раз при монтировании компонента

    return (
        <>
            <h1>Таблица данных</h1>
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Age</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.age}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default DataTable;

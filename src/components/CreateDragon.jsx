
function CreateDragon() {

    return (
        <div>
            <form>
                <h2>Информация о драконе</h2>
                <div className="form-section">
                    <div className="form-group">
                        <label>Имя дракона:</label>
                        <input type="text"/>
                    </div>
                </div>

                <h2>Координаты</h2>
                <div className="form-section">
                    <div className="form-group">
                        <label>Координаты: x:</label>
                        <input type="text"/>
                    </div>
                    <div className="form-group">
                        <label>Координаты: y:</label>
                        <input type="text"/>
                    </div>
                </div>

                <h2>Пещера</h2>
                <div className="form-section">
                    <div className="form-group">
                        <label>Количество сокровищ:</label>
                        <input type="text"/>
                    </div>
                </div>

                <h2>Убийца дракона</h2>
                <div className="form-section">
                    <div className="form-group">
                        <label>Имя:</label>
                        <input type="text"/>
                    </div>
                    <div className="form-group">
                        <label>Цвет глаз:</label>
                        <input type="text"/>
                    </div>
                    <div className="form-group">
                        <label>Цвет волос:</label>
                        <input type="text"/>
                    </div>
                    <div className="form-group">
                        <label>Координаты: x:</label>
                        <input type="text"/>
                    </div>
                    <div className="form-group">
                        <label>Координаты: y:</label>
                        <input type="text"/>
                    </div>
                    <div className="form-group">
                        <label>Координаты: z:</label>
                        <input type="text"/>
                    </div>
                    <div className="form-group">
                        <label>День рождения:</label>
                        <input type="text"/>
                    </div>
                    <div className="form-group">
                        <label>Рост:</label>
                        <input type="text"/>
                    </div>
                </div>

                <h2>Детали о драконе</h2>
                <div className="form-section">
                    <div className="form-group">
                        <label>Возраст:</label>
                        <input type="text"/>
                    </div>
                    <div className="form-group">
                        <label>Описание:</label>
                        <input type="text"/>
                    </div>
                    <div className="form-group">
                        <label>Размах крыльев:</label>
                        <input type="text"/>
                    </div>
                    <div className="form-group">
                        <label>Характер:</label>
                        <input type="text"/>
                    </div>
                </div>

                <h2>Голова дракона</h2>
                <div className="form-section">
                    <div className="form-group">
                        <label>Количество глаз:</label>
                        <input type="text"/>
                    </div>
                    <div className="form-group">
                        <label>Количество зубов:</label>
                        <input type="text"/>
                    </div>
                </div>

                <button onClick={() => {
                    event.preventDefault();
                }}>CREATE
                </button>
            </form>
        </div>
    )
}

export default CreateDragon

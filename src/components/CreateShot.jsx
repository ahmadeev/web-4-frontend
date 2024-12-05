
function CreateShot() {

    return (
        <div>
            <form>
                <h2>Информация о драконе</h2>
                <div className="form-section">
                    <div className="form-group">
                        <label>x:</label>
                        <input type="text"/><br/>
                        <label>y:</label>
                        <input type="text"/><br/>
                        <label>r:</label>
                        <input type="text"/><br/>
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

export default CreateShot

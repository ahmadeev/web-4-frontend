import {useState} from "react";

function CreateShot() {
    const [x, setX] = useState("");
    const [y, setY] = useState("");
    const [r, setR] = useState("");

    const values = [
        "-2.0", "-1.5", "-1.0",
        "-0.5", "0.0", "0.5",
        "1.0", "1.5", "2.0"
    ]

    const [checkboxes, setCheckboxes] = useState(
        values.reduce((acc, value) => ({ ...acc, [value]: false }), {})
    );

    const handleXChange = (e) => {
        setX(e.target.value);
    }

    const handleYChange = (e) => {
        setY(e.target.value);
    }

    const handleRChange = (e) => {
        setR(e.target.value);
    }

    const handleCheckboxChange = (event, setCheckboxes) => {
        const { name, checked } = event.target;
        setCheckboxes((prev) => ({
            ...prev,
            [name]: checked,
        }));
    };

    const handleCheckboxRequest = () => {
        const result = []
        for(const [k, v] of Object.entries(checkboxes)) {
            if (v === true) {
                result.push(Number(k));
            }
        }
        console.log(result);
        return result;
    }

    return (
        <div>
            <form>
                <h2>ФОРМА ДЛЯ ТОЧКИ</h2>
                <div className="form-section">
                    <div className="form-group">
                        <label>x:</label>
                        <input
                            value={x}
                            onChange={(e) => {
                                handleXChange(e)
                            }}
                            type="text"
                        /><br/>
                        <label>y:</label>
                        <input
                            value={y}
                            onChange={(e) => {
                                handleYChange(e)
                            }}
                            type="text"
                            placeholder="from -5 to 3"
                        /><br/>
                        <label>r:</label>
                        <input
                            value={r}
                            onChange={(e) => {
                                handleRChange(e)
                            }}
                            type="text"
                        /><br/>

                        {values && values.map((value, index) => (
                            <>
                                <label key={index}>
                                    <input
                                        type="checkbox"
                                        name={value}
                                        checked={checkboxes[value]}
                                        onChange={handleCheckboxChange}
                                    />
                                    {value}
                                </label>
                                {(index + 1) % 3 === 0 && <br/>}
                            </>
                        ))}

                        {handleCheckboxRequest()}


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

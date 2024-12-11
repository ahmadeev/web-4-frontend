import {useAuth} from "../utils/AuthProvider.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

function SignInForm({ from, isSignedUp, setIsSignedUp }) {
    const { signIn } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [submitButtonState, setSubmitButtonState] = useState(false);

    // ошибки клиентской валидации
    const [invalidUsernameError, setInvalidUsernameError] = useState(false);

    // ошибки, пришедшие в ответе с сервера
    const [responseError, setResponseError] = useState("");

    useEffect(() => {
        const isUsernameValid = checkIsValidUsername(username);

        if (username !== "" && !isUsernameValid) setInvalidUsernameError(true);
        else setInvalidUsernameError(false);

        if (isUsernameValid) {
            setSubmitButtonState(true);
        } else {
            setSubmitButtonState(false);
        }
    },[username])

    const checkIsValidUsername = (username) => {
        return username && username.match(/^[a-zA-Z0-9]{4,}$/g);
    }

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    return (
        <div>
            <form>
                <label>
                    Введите имя пользователя:<br/>
                    <input
                        value={username}
                        onChange={handleUsernameChange}
                        className="login-input"
                        type="text"
                    />
                </label><br/>
                <label>
                    Введите пароль:<br/>
                    <input
                        value={password}
                        onChange={handlePasswordChange}
                        className="password-input"
                        type="password"
                    />
                </label><br/>

                {
                    invalidUsernameError && <h5>Неверное имя пользователя.</h5>
                }

                {
                    responseError !== "" && <h5>{responseError}</h5>
                }

                <button disabled={(!submitButtonState)} onClick={() => {
                    event.preventDefault();

                    signIn(
                        username,
                        password
                    )
                        .then(responseData => {
                            if (responseData.status === "SUCCESS") {
                                navigate(from, {replace: true});
                            } else {
                                setResponseError(responseData.details);
                            }
                            console.log("Успешный вход, SignInForm")
                        })
                }}>Sign In
                </button>
            </form>
            <br/>
            <a onClick={() => {
                setIsSignedUp(!isSignedUp);
            }}>{isSignedUp ? "Sign Up" : "Sign In"}</a>
        </div>
    )
}

export default SignInForm
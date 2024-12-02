import {useAuth} from "./AuthProvider.jsx";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

function SignInForm({ from, isSignedUp, setIsSignedUp }) {
    const { signIn } = useAuth();
    const navigate = useNavigate();

    // ошибки, пришедшие в ответе с сервера
    const [responseError, setResponseError] = useState("");

    return (
        <div>
            <form>
                <label>
                    Введите имя пользователя:<br/>
                    <input id="login-input" className="login-input" type="text"/>
                </label><br/>
                <label>
                    Введите пароль:<br/>
                    <input id="password-input" className="password-input" type="password"/>
                </label><br/>

                {
                    responseError !== "" && <h5>{responseError}</h5>
                }

                <button onClick={() => {
                    event.preventDefault();

                    signIn(
                        document.getElementById("login-input").value,
                        document.getElementById("password-input").value
                    )
                        .then(responseData => {
                            if (responseData.status === "SUCCESS") {
                                console.log("адрес перед navigate", from)
                                navigate(from, {replace: true});
                            } else {
                                setResponseError(responseData.details);
                            }
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
import {useAuth} from "./AuthProvider.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

function SignUpForm({ from, isSignedUp, setIsSignedUp }) {
    const { signUp } = useAuth();
    const navigate = useNavigate();

    const [isCorrect, setIsCorrect] = useState(true);

    useEffect(() => {
        const passwordInputOne = document.getElementById("password-input-1")
        const passwordInputTwo = document.getElementById("password-input-2")

        passwordInputOne.addEventListener("focusout", e => {
            if (passwordInputTwo.value !== "" && passwordInputTwo.value !== passwordInputOne.value) {
                setIsCorrect(false);
            } else {
                setIsCorrect(true)
            }
        })

        passwordInputTwo.addEventListener("focusout", e => {
            if (passwordInputOne.value !== "" && passwordInputTwo.value !== passwordInputOne.value) {
                setIsCorrect(false);
            } else {
                setIsCorrect(true)
            }
        })

        passwordInputOne.addEventListener("input", e => {
            setIsCorrect(true);
        })

        passwordInputTwo.addEventListener("input", e => {
            setIsCorrect(true);
        })
    }, [])

    return (
        <div>
            <form>
                <label>
                    Введите имя пользователя или электронную почту:<br/>
                    <input id="login-input" className="login-input" type="text"/>
                </label><br/>
                <label>
                Введите пароль:<br/>
                    <input id="password-input-1" className="password-input" type="password"/>
                </label><br/>
                <label>
                    Повторите пароль:<br/>
                    <input id="password-input-2" className="password-input" type="password"/>
                </label><br/>
                {
                    !isCorrect && <h5>Пароли не совпадают!</h5>
                }
                <button onClick={() => {
                    event.preventDefault();

                    if (
                        document.getElementById("password-input-1").value !==
                        document.getElementById("password-input-2").value
                    ) {
                        setIsCorrect(false);
                        return;
                    }
                    setIsCorrect(true)

                    let isSignedUp = signUp(
                        document.getElementById("login-input").value,
                        document.getElementById("password-input-1").value
                    );

                    if (isSignedUp) {
                        console.log("адрес перед navigate", from)
                        navigate(from, {replace: true});
                    }
                }}>Sign Up
                </button>
            </form>
            <br/>
            <a onClick={() => {
                setIsSignedUp(!isSignedUp);
            }}>{isSignedUp ? "Sign In" : "Sign Up"}</a>
        </div>
    )
}

export default SignUpForm

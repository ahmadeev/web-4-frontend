import {useAuth} from "./AuthProvider.jsx";
import {useNavigate} from "react-router-dom";

function SignInForm({ from, isSignedUp, setIsSignedUp }) {
    const { signIn } = useAuth();
    const navigate = useNavigate();

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
                <button onClick={() => {
                    event.preventDefault();

                    signIn(
                        document.getElementById("login-input").value,
                        document.getElementById("password-input").value
                    )
                        .then(isSignedIn => {
                            if (isSignedIn) {
                                console.log("адрес перед navigate", from)
                                navigate(from, {replace: true});
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
import {useAuth} from "./AuthProvider.jsx";
import {useNavigate} from "react-router-dom";

function SignInForm({ from, isSignedUp, setIsSignedUp }) {
    const { login } = useAuth();
    const navigate = useNavigate();

    return (
        <div>
            <form>
                <label>
                    Введите имя пользователя или электронную почту:<br/>
                    <input className="login-input" type="text"/>
                </label><br/>
                <label>
                    Введите пароль:<br/>
                    <input className="password-input" type="password"/>
                </label><br/>
                <button onClick={() => {
                    event.preventDefault();
                    login();
                    console.log("адрес перед navigate", from)
                    navigate(from, {replace: true});
                }}>Sign In
                </button>
            </form>
            <br/>
            <a onClick={() => {
                setIsSignedUp(!isSignedUp);
            }}>{isSignedUp ? "Sign In" : "Sign Up"}</a>
        </div>
    )
}

export default SignInForm
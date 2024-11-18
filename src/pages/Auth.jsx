import Navbar from "../components/Navbar.jsx";
import {useEffect, useState} from "react";
import SignInForm from "../components/SignInForm.jsx";
import SignUpForm from "../components/SignUpForm.jsx";
import styles from "../page-styles/CountDownToVikasBirthday.module.css";
import {useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../components/AuthProvider.jsx";

function Auth({ pageTitle, isSignedUp }) {
    const [isSignedUpHook, setIsSignedUpHook] = useState(isSignedUp);
    const location = useLocation();

    const [from, setFrom] = useState(location.state?.from?.pathname || "/");
    console.log(from)

    useEffect(() => {
        document.title = pageTitle;
    })

    return (
        <div className={styles.wrapper}>
            <Navbar/>
            {isSignedUpHook ? (<SignInForm from={from} />) : (<SignUpForm from={from} />)}
            <a onClick={() => {
                setIsSignedUpHook(!isSignedUpHook);
            }}>{isSignedUpHook ? "Sign In" : "Sign Up"}</a>
        </div>
    )
}

export default Auth

import Navbar from "../components/Navbar/Navbar.jsx";
import {useEffect, useState} from "react";
import SignInForm from "../components/AuthForm/SignInForm.jsx";
import SignUpForm from "../components/AuthForm/SignUpForm.jsx";
import styles from "../page-styles/Auth.module.css";
import {useLocation} from "react-router-dom";

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
            {
                isSignedUpHook ?
                (<SignInForm from={from} isSignedUp={isSignedUpHook} setIsSignedUp={setIsSignedUpHook} />) :
                (<SignUpForm from={from} isSignedUp={isSignedUpHook} setIsSignedUp={setIsSignedUpHook} />)
            }
        </div>
    )
}

export default Auth

import Navbar from "../components/Navbar.jsx";
import {useEffect, useState} from "react";
import SignInForm from "../components/SignInForm.jsx";
import SignUpForm from "../components/SignUpForm.jsx";
import styles from "../page-styles/CountDownToVikasBirthday.module.css";
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

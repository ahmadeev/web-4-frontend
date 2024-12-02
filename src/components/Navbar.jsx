import '../component-styles/Navbar.module.css'
import styles from '../component-styles/Navbar.module.css'
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "./AuthProvider.jsx";

function Navbar() {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.pathname || "/"
    console.log("извне: ", from);

    const div_style = {
        height: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "10px"
    }

    return (
        <>
            <nav className={styles.navbar}> {/* можно оставить без className, но в css правило для блока nav */}
                <NavLink className={({isActive}) => isActive ? styles.active : ""} to="/">home</NavLink>
                <NavLink className={({isActive}) => isActive ? styles.active : ""} to="/admin">admin</NavLink>
                <NavLink className={({isActive}) => isActive ? styles.active : ""} to="/ny">новый год</NavLink>
                <NavLink className={({isActive}) => isActive ? styles.active : ""} to="/vbd">др вики</NavLink>

                <div style={div_style}>
                    {
                        (!isAuthenticated || sessionStorage.getItem("sessionToken") === null) &&
                        <button onClick={() => navigate("/auth")}>
                            Log In
                        </button>
                        // было бы удобнее:
                        // <p><span>Sign In</span> / <span>Sign In</span></p>
                    }

                    {
                        (isAuthenticated  && sessionStorage.getItem("sessionToken") !== null) &&
                        <>
                            <h3>Твоё Имя</h3>
                            <button onClick={() => {
                                console.log(from)
                                logout();
                                navigate(from);
                            }}>
                                Log Out
                            </button>
                        </>
                    }
                </div>



            </nav>
        </>
    )
}

export default Navbar

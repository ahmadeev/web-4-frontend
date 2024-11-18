import '../component-styles/Navbar.module.css'
import styles from '../component-styles/Navbar.module.css'
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "./AuthProvider.jsx";

function Navbar() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.pathname || "/"
    console.log("извне: ", from)

    return (
        <>
            <nav className={styles.navbar}> {/* можно оставить без className, но в css правило для блока nav */}
                <NavLink className={({isActive}) => isActive ? styles.active : ""} to="/">home</NavLink>
                <NavLink className={({isActive}) => isActive ? styles.active : ""} to="/ny">новый год</NavLink>
                <NavLink className={({isActive}) => isActive ? styles.active : ""} to="/vbd">др вики</NavLink>
                <button onClick={() => {
                    console.log(from)
                    logout();
                    navigate(from);
                }}>Log Out</button>
            </nav>
        </>
    )
}

export default Navbar

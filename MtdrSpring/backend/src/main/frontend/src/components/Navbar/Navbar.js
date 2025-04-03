import './Navbar.css';
import O_Oracle_Icon from "../../assets/OdeOracle.png";

export default function Navbar() {
    return (
        <div className="navbar-container">
            {/* Logo Container */}
            <div className="navbar-logo-container">
                <img src={O_Oracle_Icon} alt="Logo" className="navbar-logo-icon" />
                <span className="navbar-logo-text">| Oracle Manager</span>
            </div>

            {/* User Container */}
        </div>
    );
}
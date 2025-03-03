import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useLayoutEffect } from "react";
import SignoutButton from "./SignoutButton";
import "../styles/Navbar.css";

const Navbar = () => {
    const user = useSelector((state) => state.auth.user);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useLayoutEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <nav className="navbar">
            <Link to="/" className="logo">GoalGetter</Link>
            <div className="hamburger" onClick={() => setMenuOpen(true)}>
                ☰
            </div>
            {menuOpen && <div className="menu-overlay" onClick={() => setMenuOpen(false)}></div>}
            <div className={`nav-links ${menuOpen ? "open" : ""}`}>
                {isMobile && <button className="close-btn" onClick={() => setMenuOpen(false)}>✖</button>}

                <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
                {user ? (
                    <>
                        <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
                        <SignoutButton />
                    </>
                ) : (
                    <>
                        <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
                        <Link to="/signup" onClick={() => setMenuOpen(false)}>Sign Up</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
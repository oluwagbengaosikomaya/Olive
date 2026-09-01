import React, { useState } from 'react';

const path = window.location.pathname;

export default function Navbar({ user, onLogout }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const link = (href, label, cls = '') => (
        <li>
            <a
                href={href}
                className={`${cls} ${path === href ? 'nav-active' : ''}`.trim()}
            >
                {label}
            </a>
        </li>
    );

    return (
        <nav className="navbar">
            <div className="navbar-inner">
                <a href="/" className="logo">
                    <img src="/olive.jpeg" alt="olivedine" className="logo-img" />
                </a>

                <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
                    <span></span><span></span><span></span>
                </button>

                <ul className={`nav-links ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(false)}>
                    {link('/', 'Home')}
                    {link('/menu', 'Menu')}
                    {link('/meal-plan', 'Meal Plan')}
                    {link('/about', 'About')}
                    {user && link('/place-order', 'Place Order', 'nav-order')}
                    <li className="divider">|</li>
                    {user ? (
                        <>
                            <li className="nav-user">👤 {user.name.split(' ')[0]}</li>
                            <li><button className="nav-logout" onClick={onLogout}>Logout</button></li>
                        </>
                    ) : (
                        <>
                            {link('/login', 'Login', 'nav-login')}
                            {link('/register', 'Sign Up', 'nav-signup')}
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}

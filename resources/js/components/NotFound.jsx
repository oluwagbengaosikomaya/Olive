import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useAuth } from './AuthContext';

export default function NotFound() {
    const { user, logout } = useAuth();
    return (
        <div className="main-meals-page">
            <Navbar user={user} onLogout={logout} />
            <div className="notfound-wrap">
                <div className="notfound-code">404</div>
                <h1>Page Not Found</h1>
                <p>The page you're looking for doesn't exist or has been moved.</p>
                <div className="notfound-links">
                    <a href="/" className="notfound-btn">Go Home</a>
                    <a href="/menu" className="notfound-btn outline">Browse Menu</a>
                </div>
            </div>
            <Footer />
        </div>
    );
}

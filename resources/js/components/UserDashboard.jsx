import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { navigate } from './navigate';

export default function UserDashboard() {
    const { user, logout } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const quickLinks = [
        { icon: '🍽️', label: 'Browse Menu', href: '/menu', color: '#e05c2a', desc: 'Explore all our dishes and categories' },
        { icon: '📋', label: 'Meal Plans', href: '/meal-plan', color: '#3aaa6e', desc: 'Find the perfect plan for your goals' },
        { icon: '🛒', label: 'Place Order', href: '/place-order', color: '#c9a227', desc: 'Order your favourite meals now' },
        { icon: '🌿', label: 'About Us', href: '/about', color: '#4a90d9', desc: 'Learn more about Olive Dine' },
    ];

    return (
        <div className="usr-layout">
            {sidebarOpen && <div className="usr-sidebar-backdrop" onClick={() => setSidebarOpen(false)} />}

            {/* Sidebar */}
            <aside className={`usr-sidebar${sidebarOpen ? ' open' : ''}`}>
                <div className="usr-sidebar-logo">Olive<span>Dine</span></div>
                <nav className="usr-nav">
                    <a href="/dashboard" className="usr-nav-item active" onClick={(e) => { e.preventDefault(); navigate('/dashboard'); setSidebarOpen(false); }}>🏠 Dashboard</a>
                    <a href="/menu" className="usr-nav-item" onClick={(e) => { e.preventDefault(); navigate('/menu'); setSidebarOpen(false); }}>🍽️ Menu</a>
                    <a href="/meal-plan" className="usr-nav-item" onClick={(e) => { e.preventDefault(); navigate('/meal-plan'); setSidebarOpen(false); }}>📋 Meal Plan</a>
                    <a href="/place-order" className="usr-nav-item" onClick={(e) => { e.preventDefault(); navigate('/place-order'); setSidebarOpen(false); }}>🛒 Place Order</a>
                </nav>
                <div className="usr-sidebar-footer">
                    <button className="usr-nav-item" onClick={logout}>🚪 Logout</button>
                </div>
            </aside>

            {/* Main */}
            <div className="usr-main">
                <header className="usr-topbar">
                    <button className="usr-hamburger" onClick={() => setSidebarOpen(o => !o)} aria-label="Toggle menu">
                        <span /><span /><span />
                    </button>
                    <div>
                        <h2>Welcome back, {user.name.split(' ')[0]} 👋</h2>
                        <p>Here's what's available for you today.</p>
                    </div>
                    <div className="usr-topbar-avatar">
                        {user.name.charAt(0).toUpperCase()}
                    </div>
                </header>

                <div className="usr-content">
                    {/* Account Card */}
                    <div className="usr-account-card">
                        <div className="usr-account-avatar">{user.name.charAt(0).toUpperCase()}</div>
                        <div>
                            <div className="usr-account-name">{user.name}</div>
                            <div className="usr-account-email">{user.email}</div>
                            <span className="adm-badge user">Member</span>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="usr-section-title">Quick Access</div>
                    <div className="usr-quick-grid">
                        {quickLinks.map((link, i) => (
                            <a key={i} href={link.href} className="usr-quick-card" style={{ borderTopColor: link.color }}
                               onClick={(e) => { e.preventDefault(); navigate(link.href); }}>
                                <div className="usr-quick-icon">{link.icon}</div>
                                <div className="usr-quick-label">{link.label}</div>
                                <div className="usr-quick-desc">{link.desc}</div>
                                <div className="usr-quick-arrow" style={{ color: link.color }}>→</div>
                            </a>
                        ))}
                    </div>

                    {/* Info Banner */}
                    <div className="usr-banner">
                        <div className="usr-banner-icon">🌿</div>
                        <div>
                            <strong>Eating well starts here.</strong>
                            <p>Browse our curated menu or pick a meal plan tailored to your health goals.</p>
                        </div>
                        <a href="/menu" className="usr-banner-btn" onClick={(e) => { e.preventDefault(); navigate('/menu'); }}>Explore Now</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

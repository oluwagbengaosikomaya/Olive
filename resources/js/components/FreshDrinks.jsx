import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useAuth } from './AuthContext';

const items = [
    { name: 'Natural Retinol', price: '₦10,000', description: 'Carrot, orange & ginger juice.', tag: 'Popular' },
    { name: 'Green Juice', price: '₦10,000', description: 'Apple, spinach, pineapple, cucumber, lemon & ginger.', tag: null },
    { name: 'Pineapple Ginger Juice', price: '₦10,000', description: '', tag: null },
    { name: 'Watermelon Refresher', price: '₦10,000', description: '', tag: null },
    { name: 'Immunity Booster', price: '₦10,000', description: 'Lemon, lime, turmeric, cucumber, ginger & pineapple.', tag: 'Healthy' },
    { name: 'Sweet Sunshine', price: '₦10,000', description: 'Oranges, clementines & strawberry juice.', tag: null },
];

export default function FreshDrinks() {
    const { user, logout } = useAuth();
    const [search, setSearch] = useState('');

    const filtered = items.filter(m => m.name.toLowerCase().includes(search.toLowerCase()));

    const handleOrder = () => {
        if (!user) { sessionStorage.setItem('olive_intended', '/place-order'); window.location.href = '/login'; return; }
        window.location.href = '/place-order';
    };

    return (
        <div className="main-meals-page">
            <Navbar user={user} onLogout={logout} />

            <div className="mm-hero">
                <div className="mm-hero-overlay" />
                <div className="mm-hero-content">
                    <span className="mm-hero-eyebrow">EXPLORE</span>
                    <h1>Fresh Drinks</h1>
                    <p>Raw, cold-pressed juices bursting with natural vitamins and goodness.</p>
                    <div className="mm-search-wrap">
                        <svg className="mm-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                        <input
                            className="mm-search"
                            type="text"
                            placeholder="Search drinks…"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                        {search && <button className="mm-search-clear" onClick={() => setSearch('')}>✕</button>}
                    </div>
                </div>
            </div>

            <div className="mm-sections">
                <div className="mm-section">
                    <div className="mm-section-header">
                        <h2>Raw Cold-Pressed Juices</h2>
                        <div className="mm-section-line" />
                    </div>
                    <div className="mm-list">
                        {filtered.length === 0 ? (
                            <div className="mm-empty">No items match your search.</div>
                        ) : (
                            filtered.map((meal, i) => (
                                <div key={i} className="mm-row">
                                    <div className="mm-row-info">
                                        <div className="mm-row-name">
                                            {meal.name}
                                            {meal.tag && <span className="mm-tag">{meal.tag}</span>}
                                        </div>
                                        {meal.description && <p className="mm-row-desc">{meal.description}</p>}
                                    </div>
                                    <div className="mm-row-actions">
                                        <span className="mm-price">{meal.price}</span>
                                    </div>
                                </div>
                            ))
                        )}
                        {filtered.length > 0 && (
                            <div className="mm-group-footer">
                                <p className="mm-group-hint">Select your drink and place your order.</p>
                                <button className="mm-order-btn mm-order-btn-group" onClick={handleOrder}>
                                    Place Order
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

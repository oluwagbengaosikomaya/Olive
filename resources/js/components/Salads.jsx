import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useAuth } from './AuthContext';

const items = [
    { name: 'Mixed Veggies Salad', price: '₦13,000', description: 'Cabbage, lettuce, raisins, carrot, corn, garlic croutons & chicken breast.', tag: 'Popular' },
    { name: 'Prawn Salad', price: '₦17,000', description: 'Grilled prawn and shrimp, cherry tomatoes, lettuce, cabbage & nuts finished with dressing.', tag: 'Premium' },
    { name: 'Fruit Salad', price: '₦13,000', description: 'Pineapples, strawberries, blueberries, grapes, kiwi, clementines with honey and lemon dressing.', tag: null },
    { name: 'Potato and Chicken Salad', price: '₦11,000', description: 'Mixed with veggies and beetroot.', tag: null },
    { name: 'Cucumber & Avocado Salad', price: '₦7,500', description: 'Mixed with eggs & chicken.', tag: null },
];

export default function Salads() {
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
                    <h1>Salads</h1>
                    <p>Colorful, nutrient-rich salads made with the freshest ingredients.</p>
                    <div className="mm-search-wrap">
                        <svg className="mm-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                        <input
                            className="mm-search"
                            type="text"
                            placeholder="Search salads…"
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
                        <h2>Salads</h2>
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
                                <p className="mm-group-hint">Select your salad and place your order.</p>
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

import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useAuth } from './AuthContext';

function SkeletonList() {
    return (
        <div className="mm-list">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="skeleton-row">
                    <div className="skeleton skeleton-text" style={{ width: `${140 + i * 20}px` }} />
                    <div className="skeleton skeleton-price" />
                </div>
            ))}
        </div>
    );
}

const sections = [
    {
        title: 'Stews & Soups',
        grouped: true,
        items: [
            { name: 'Efo Riro Soup', price: '₦4,500', description: '', tag: null },
            { name: 'Egusi Soup', price: '₦5,500', description: '', tag: null },
            { name: 'Ogbono Soup', price: '₦4,500', description: '', tag: null },
            { name: 'Okro Soup', price: '₦4,500', description: '', tag: null },
            { name: 'Ewedu Soup', price: '₦600', description: '', tag: null },
            { name: 'Obe (Yoruba Red Stew)', price: '₦4,500', description: 'Selected meat or fish sautéed in a stew of slow cooked tomato, onion, and pepper mix. Served with a side of choice.', tag: 'Popular' },
            { name: 'Home Made Peppersoup', price: '₦9,000', description: 'Spicy broth infused in herbs and spices served with your choice of fish, chicken, goat or assorted offals.', tag: 'Spicy' },
            { name: 'Ofada Sauce (Ayamase)', price: '₦6,500', description: '', tag: null },
            { name: 'Bukka Stew (Naija Style)', price: '₦6,500', description: '', tag: null },
        ],
    },
    {
        title: 'Proteins',
        grouped: true,
        items: [
            { name: 'Grilled Tiger Prawns', price: '₦25,000', description: '', tag: 'Premium' },
            { name: 'Salmon Fillet', price: '₦23,000', description: '', tag: 'Premium' },
            { name: 'Honey Glazed Spicy Chicken Wings', price: '₦10,000', description: '', tag: "Chef's Pick" },
            { name: 'Peppered Snail', price: '₦15,000', description: '', tag: null },
            { name: 'Grilled Chicken Breast', price: '₦10,000', description: '', tag: null },
            { name: 'Turkey Fingers', price: '₦9,000', description: '', tag: null },
            { name: 'Turkey Wings', price: '₦9,000', description: '', tag: null },
            { name: 'Spicy Chicken Wings', price: '₦8,000', description: '', tag: 'Spicy' },
        ],
    },
    {
        title: 'Swallow',
        grouped: true,
        items: [
            { name: '1 Wrap of Eba', price: '₦600', description: '', tag: null },
            { name: '1 Wrap of Wheat', price: '₦950', description: '', tag: null },
            { name: '1 Wrap of Oats Swallow', price: '₦950', description: '', tag: null },
            { name: '1 Wrap of Semo', price: '₦950', description: '', tag: null },
            { name: '1 Wrap of Amala', price: '₦600', description: '', tag: null },
            { name: '1 Wrap of Poundo', price: '₦800', description: '', tag: null },
        ],
    },
];

export default function MainMeals() {
    const { user, logout } = useAuth();
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const t = setTimeout(() => setLoading(false), 400);
        return () => clearTimeout(t);
    }, []);

    const handleGroupOrder = () => {
        if (!user) { sessionStorage.setItem('olive_intended', '/place-order'); window.location.href = '/login'; return; }
        window.location.href = '/place-order';
    };

    const filtered = sections.map((s, si) => ({
        ...s,
        si,
        items: s.items.filter(m => m.name.toLowerCase().includes(search.toLowerCase())),
    })).filter(s => s.items.length > 0);

    return (
        <div className="main-meals-page">
            <Navbar user={user} onLogout={logout} />

            <div className="mm-hero">
                <div className="mm-hero-overlay" />
                <div className="mm-hero-content">
                    <span className="mm-hero-eyebrow">EXPLORE</span>
                    <h1>Main Meals</h1>
                    <p>Hearty, satisfying dishes crafted with rich flavors and balanced nutrition.</p>
                    <div className="mm-search-wrap">
                        <svg className="mm-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                        <input
                            className="mm-search"
                            type="text"
                            placeholder="Search meals…"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                        {search && <button className="mm-search-clear" onClick={() => setSearch('')}>✕</button>}
                    </div>
                </div>
            </div>

            <div className="mm-sections">
                {loading ? (
                    <div className="mm-section"><SkeletonList /></div>
                ) : filtered.length === 0 ? (
                    <div className="mm-empty">No meals match your search.</div>
                ) : (
                    filtered.map((section) => (
                        <div key={section.si} className="mm-section">
                            <div className="mm-section-header">
                                <h2>{section.title}</h2>
                                <div className="mm-section-line" />
                            </div>

                            <div className="mm-list">
                                {section.items.map((meal, i) => {
                                    const key = `${section.si}-${i}`;
                                    return (
                                        <div key={key} className="mm-row">
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
                                    );
                                })}

                                {section.grouped && (
                                    <div className="mm-group-footer">
                                        <p className="mm-group-hint">Set quantities above, then place your order.</p>
                                        <button className="mm-order-btn mm-order-btn-group" onClick={handleGroupOrder}>
                                            Place Order
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            <Footer />
        </div>
    );
}

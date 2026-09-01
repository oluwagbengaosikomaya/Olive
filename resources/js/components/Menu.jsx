import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useAuth } from './AuthContext';

const menuCategories = [
    {
        title: 'MAIN MEALS',
        description: 'Hearty, satisfying dishes made for your biggest cravings, crafted with rich flavors and balanced nutrition.',
        btnText: 'Explore Main Meal',
        link: '/main-meals',
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop',
        reverse: false,
    },
    {
        title: "CHEF'S SPECIAL",
        description: "Signature dishes you won't find anywhere else: chef-crafted, exclusive, and packed with unforgettable taste.",
        btnText: "Try the Chef's Special",
        link: '/chefs-special',
        image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=400&fit=crop',
        reverse: true,
    },
    {
        title: 'BREAKFAST',
        description: 'Fresh, energizing breakfasts to start your day right, from light bites to full, power-packed plates.',
        btnText: 'Order Breakfast',
        link: '/breakfast',
        image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400&h=400&fit=crop',
        reverse: false,
    },
    {
        title: 'SIDES',
        description: 'Perfect add-ons to complete your meal, crunchy, creamy, or savory sides that elevates every plates.',
        btnText: 'Add a Side',
        link: '/sides',
        image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=400&fit=crop',
        reverse: true,
    },
    {
        title: 'SAUCE',
        description: 'Rich, flavorful sauces prepared to elevate every meal. From spicy to creamy, each one adds the perfect finishing touch.',
        btnText: 'See Sauces',
        link: '/sauces',
        image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&h=400&fit=crop',
        reverse: false,
    },
    {
        title: 'SALADS',
        description: 'Colorful, nutrient-rich salads made with fresh ingredients. Light, refreshing, and deliciously healthy.',
        btnText: 'View Salads',
        link: '/salads',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=400&fit=crop',
        reverse: true,
    },
    {
        title: 'YOGHURT BOWLS',
        description: 'Whether you crave a cool, creamy yoghurt bowl or a warm, cozy oatmeal blend, these bowls deliver, comfort flavor and nourishment in every bite.',
        btnText: 'Browse Yoghurt Bowls',
        link: '/yoghurt-bowls',
        image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop',
        reverse: false,
    },
    {
        title: 'FRESH DRINKS',
        description: 'Refreshing beverages and natural juices to cool, energize, and complement your meal perfectly.',
        btnText: 'See Drinks & Juices',
        link: '/fresh-drinks',
        image: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=400&h=400&fit=crop',
        reverse: true,
    },
    {
        title: 'OAT MEAL BOWLS',
        description: 'Whether you crave a cool, creamy yoghurt bowl or a warm, cozy oatmeal blend, these bowls deliver, comfort flavor and nourishment in every bite.',
        btnText: 'Browse Healthy Bowls',
        link: '/oat-meal-bowls',
        image: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=400&h=400&fit=crop',
        reverse: false,
    },
];

export default function Menu() {
    const { user, logout } = useAuth();

    const handleCategoryClick = () => {
        if (!user) {
            sessionStorage.setItem('olive_intended', '/menu');
            window.location.href = '/login';
        }
    };

    return (
        <div className="menu-page">
            <Navbar user={user} onLogout={logout} />
            <div className="menu-hero">
                <div className="menu-hero-overlay"></div>
                <div className="menu-hero-content">
                    <p className="menu-discover">DISCOVER</p>
                    <h1>OUR MENU</h1>
                    <p className="menu-subtitle">Explore a curated selection of meals, drinks, and treats made to satisfy every craving.</p>
                </div>
            </div>

            <div className="menu-categories">
                {menuCategories.map((cat, i) => (
                    <div key={i} className={`menu-category-card ${cat.reverse ? 'reverse' : ''}`}>
                        <img src={cat.image} alt={cat.title} className="menu-category-img" />
                        <div className="menu-category-text">
                            <h2>{cat.title}</h2>
                            <p>{cat.description}</p>
                            <button className="menu-category-btn" onClick={() => user ? window.location.href = cat.link || '#' : handleCategoryClick()}>
                                {user ? cat.btnText : '🔒 Login to Explore'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {!user && (
                <div className="public-cta-banner">
                    <span>🔒 Sign in to explore full menu categories and place orders</span>
                    <a href="/login" className="public-cta-btn">Login</a>
                    <a href="/register" className="public-cta-btn outline">Sign Up Free</a>
                </div>
            )}

            <Footer />
        </div>
    );
}

import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useAuth } from './AuthContext';

const categories = [
    {
        icon: '🍲',
        title: 'Main Meals',
        description: 'Hearty stews, soups, proteins and swallows crafted with rich flavors and balanced nutrition.',
        href: '/main-meals',
        accent: '#e05c2a',
    },
    {
        icon: '👨‍🍳',
        title: "Chef's Special",
        description: 'Exclusive dishes curated by our chef — bold, creative, and unforgettable.',
        href: '/chefs-special',
        accent: '#c9a227',
    },
    {
        icon: '🌅',
        title: 'Breakfast',
        description: 'Start your day right with wholesome, energizing breakfast options.',
        href: '/breakfast',
        accent: '#3aaa6e',
    },
    {
        icon: '🥗',
        title: 'Salads',
        description: 'Fresh, crisp salads packed with nutrients and vibrant flavors.',
        href: '/salads',
        accent: '#4a90d9',
    },
    {
        icon: '🥣',
        title: 'Yoghurt Bowls',
        description: 'Creamy yoghurt bowls topped with fruits, granola and superfoods.',
        href: '/yoghurt-bowls',
        accent: '#9b59b6',
    },
    {
        icon: '🌾',
        title: 'Oatmeal Bowls',
        description: 'Warm and nourishing oat bowls — perfect for a clean, filling meal.',
        href: '/oat-meal-bowls',
        accent: '#e67e22',
    },
    {
        icon: '🥤',
        title: 'Fresh Drinks',
        description: 'Cold-pressed juices and immunity boosters made from natural ingredients.',
        href: '/fresh-drinks',
        accent: '#1abc9c',
    },
    {
        icon: '🍟',
        title: 'Sides',
        description: 'Delicious sides to complement any meal — from plantains to coleslaw.',
        href: '/sides',
        accent: '#e74c3c',
    },
    {
        icon: '🫙',
        title: 'Sauces',
        description: 'House-made sauces and condiments to elevate every bite.',
        href: '/sauces',
        accent: '#f39c12',
    },
];

export default function MealPlanCategories() {
    const { user, logout } = useAuth();

    return (
        <div className="mealplan-page">
            <Navbar user={user} onLogout={logout} />

            <div className="mealplan-hero">
                <div className="mealplan-hero-overlay" />
                <div className="mealplan-hero-content">
                    <p className="mealplan-discover">EXPLORE</p>
                    <h1>ALL CATEGORIES</h1>
                    <p className="mealplan-subtitle">
                        Browse every category on our menu — from hearty main meals to refreshing drinks and everything in between.
                    </p>
                </div>
            </div>

            <div className="mpc-grid">
                {categories.map((cat, i) => (
                    <div key={i} className="mpc-card" style={{ borderTopColor: cat.accent }}>
                        <div className="mpc-card-icon">{cat.icon}</div>
                        <h2 className="mpc-card-title">{cat.title}</h2>
                        <p className="mpc-card-desc">{cat.description}</p>
                        <a href={cat.href} className="mpc-see-more" style={{ color: cat.accent, borderColor: cat.accent }}>
                            See More →
                        </a>
                    </div>
                ))}
            </div>

            <Footer />
        </div>
    );
}

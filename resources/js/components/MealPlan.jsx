import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useAuth } from './AuthContext';

const plans = [
    {
        icon: '🔥',
        tag: 'Best for Fat Loss',
        tagColor: '#e05c2a',
        accent: '#e05c2a',
        href: '/meal-plan/weight-loss',
        title: 'WEIGHT LOSS SCULPT PLAN',
        subtitle: 'For customers who want to reduce body fat while preserving lean muscle',
        features: [
            'Low Carbs i.e Gourmet Meal',
            'Higher Fiber + Lean Protein',
            'Minimal Refined Carbs + Sugar',
        ],
    },
    {
        icon: '🌿',
        tag: 'Best for Digestion',
        tagColor: '#3aaa6e',
        accent: '#3aaa6e',
        href: '/meal-plan/gut-health',
        title: 'GUT-HEALTH / GUT FRIENDLY PLAN',
        subtitle: 'For customers with bloating or digestive issues.',
        features: [
            'Probiotics + Prebiotics (Greek yoghurt, Asparagus)',
            'Higher-Fiber Meals',
        ],
    },
    {
        icon: '💛',
        tag: 'Best for Wellness',
        tagColor: '#c9a227',
        accent: '#c9a227',
        href: '/meal-plan/anti-inflammatory',
        title: 'ANTI-INFLAMMATORY PLAN',
        subtitle: 'For customers with inflammation issues, fatigue or simply wanting to age gracefully.',
        features: [
            'Ginger, Leafy Greens, Berries, Fatty fish, Olive oil',
        ],
    },
    {
        icon: '💪',
        tag: 'Best for Muscle Gain',
        tagColor: '#4a90d9',
        accent: '#4a90d9',
        href: '/meal-plan/weight-gain',
        title: 'WEIGHT GAIN + LEAN BULK PLAN',
        subtitle: 'Increase muscle + healthy body mass',
        features: [
            'Clean Carbs + High Protein + Healthy Fat',
            'High Calorie, Nutrient-Dense Meals',
            'Smoothie, Blends and Add-ons',
        ],
    },
];

export default function MealPlan() {
    const { user, logout } = useAuth();

    const handleSeeMore = () => {
        if (!user) {
            sessionStorage.setItem('olive_intended', '/meal-plan');
            window.location.href = '/login';
        }
    };

    return (
        <div className="mealplan-page">
            <Navbar user={user} onLogout={logout} />

            <div className="mealplan-hero">
                <div className="mealplan-hero-overlay"></div>
                <div className="mealplan-hero-content">
                    <p className="mealplan-discover">DISCOVER</p>
                    <h1>MEAL PLAN</h1>
                    <p className="mealplan-subtitle">
                        Discover flexible, balanced meal plans designed to fit your lifestyle, from weight-loss goals to everyday clean eating. Specializing in healthy and sophisticated cuisines.
                    </p>
                </div>
            </div>

            <div className="mealplan-cards">
                {plans.map((plan, i) => (
                    <div key={i} className="mealplan-card" style={{ borderLeftColor: plan.accent }}>
                        <div className="mealplan-card-header">
                            <span className="mealplan-icon">{plan.icon}</span>
                            <span className="mealplan-tag" style={{ background: plan.tagColor }}>{plan.tag}</span>
                        </div>
                        <h2>{plan.title}</h2>
                        <p className="mealplan-card-subtitle">{plan.subtitle}</p>
                        <ul className="mealplan-features">
                            {plan.features.map((f, j) => (
                                <li key={j}>
                                    <span className="mealplan-check" style={{ color: plan.accent }}>✓</span>
                                    {f}
                                </li>
                            ))}
                        </ul>
                        {user
                            ? <a href={plan.href} className="mealplan-btn" style={{ textDecoration: 'none', display: 'inline-block' }}>See More →</a>
                            : <button className="mealplan-btn" onClick={handleSeeMore}>🔒 Login to See More</button>
                        }
                    </div>
                ))}
            </div>

            <div style={{ textAlign: 'center', padding: '0 1.5rem 2rem' }}>
                <a href="/menu" className="mealplan-btn" style={{ textDecoration: 'none', display: 'inline-block' }}>
                    Browse All Menu Categories →
                </a>
            </div>

            {!user && (
                <div className="public-cta-banner">
                    <span>🔒 Sign in to unlock full meal plan details and get started</span>
                    <a href="/login" className="public-cta-btn">Login</a>
                    <a href="/register" className="public-cta-btn outline">Sign Up Free</a>
                </div>
            )}

            <Footer />
        </div>
    );
}

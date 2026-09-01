import React from 'react';

export default function Hero() {
    return (
        <section className="hero">
            <div className="hero-overlay"></div>
            <div className="hero-content">
                <div className="hero-logo-card">
                    <img src="/olive.jpeg" alt="olive" className="hero-logo-img" />
                </div>

                <div className="hero-card">
                    <h2>MENU</h2>
                    <p>See all our dishes, categories, and prices.<br />Order instantly.</p>
                    <a href="/menu" className="hero-btn">Browse Menu</a>
                </div>

                <div className="hero-card">
                    <h2>MEAL PLAN</h2>
                    <p>Tell us your goals and we'll recommend the<br />perfect weekly meal plan.</p>
                    <a href="/meal-plan" className="hero-btn">Choose a Meal Plan</a>
                </div>
            </div>
        </section>
    );
}

import React from 'react';
import { navigate } from './navigate';

export default function Hero() {
    return (
        <section className="hero">
            <div className="hero-overlay"></div>
            <div className="hero-content hero-fade-in">
                <div className="hero-logo-card">
                    <img src="/olive.jpeg" alt="olive" className="hero-logo-img" />
                </div>

                <div className="hero-card">
                    <h2>MENU</h2>
                    <p>See all our dishes, categories, and prices.<br />Order instantly.</p>
                    <button className="hero-btn" onClick={() => navigate('/menu')}>Browse Menu</button>
                </div>

                <div className="hero-card">
                    <h2>MEAL PLAN</h2>
                    <p>Tell us your goals and we'll recommend the<br />perfect weekly meal plan.</p>
                    <button className="hero-btn" onClick={() => navigate('/meal-plan')}>Choose a Meal Plan</button>
                </div>
            </div>
        </section>
    );
}

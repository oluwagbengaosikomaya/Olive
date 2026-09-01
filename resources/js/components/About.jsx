import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useAuth } from './AuthContext';

export default function About() {
    const { user, logout } = useAuth();
    return (
        <div className="main-meals-page">
            <Navbar user={user} onLogout={logout} />

            <div className="mm-hero">
                <div className="mm-hero-overlay" />
                <div className="mm-hero-content">
                    <span className="mm-hero-eyebrow">OUR STORY</span>
                    <h1>About Olive Dine</h1>
                    <p>Healthy eating, beautifully made.</p>
                </div>
            </div>

            <div className="about-wrap">
                <div className="about-section">
                    <div className="about-icon">🌿</div>
                    <h2>Who We Are</h2>
                    <p>Olive Dine is a Lagos-based healthy meal service dedicated to making nutritious, chef-crafted food accessible to everyone. We believe that eating well should never feel like a compromise — every dish we prepare is designed to be as delicious as it is nourishing.</p>
                </div>

                <div className="about-divider" />

                <div className="about-section">
                    <div className="about-icon">👨‍🍳</div>
                    <h2>Our Kitchen</h2>
                    <p>Every meal is freshly prepared by our in-house chefs using locally sourced, high-quality ingredients. From our signature Efo Riro to our Anti-Inflammatory meal plans, we put care into every plate that leaves our kitchen.</p>
                </div>

                <div className="about-divider" />

                <div className="about-section">
                    <div className="about-icon">💛</div>
                    <h2>Our Mission</h2>
                    <p>To make healthy, sophisticated cuisine effortless for busy individuals and families across Lagos — delivered fresh to your door, on your schedule.</p>
                </div>

                <div className="about-divider" />

                <div className="about-values-grid">
                    {[
                        { icon: '🥗', title: 'Fresh Ingredients', desc: 'Locally sourced, seasonal produce in every meal.' },
                        { icon: '⏱️', title: 'On-Time Delivery', desc: 'Order by 8pm for next-day delivery across Lagos.' },
                        { icon: '🎯', title: 'Goal-Oriented Plans', desc: 'Meal plans tailored to your health and fitness goals.' },
                        { icon: '❤️', title: 'Made with Care', desc: 'Every dish prepared with attention and love.' },
                    ].map((v, i) => (
                        <div key={i} className="about-value-card">
                            <div className="about-value-icon">{v.icon}</div>
                            <h3>{v.title}</h3>
                            <p>{v.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="about-cta">
                    <a href="/menu" className="mpd-start-btn" style={{ background: '#3aaa6e', textDecoration: 'none', display: 'inline-block', textAlign: 'center', padding: '0.95rem 2.5rem' }}>
                        Explore Our Menu →
                    </a>
                </div>
            </div>

            <Footer />
        </div>
    );
}

import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useAuth } from './AuthContext';

export default function Privacy() {
    const { user, logout } = useAuth();
    return (
        <div className="main-meals-page">
            <Navbar user={user} onLogout={logout} />
            <div className="legal-wrap">
                <h1 className="legal-title">Privacy Policy</h1>
                <p className="legal-updated">Last updated: {new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

                {[
                    { title: '1. Information We Collect', body: 'We collect your name, phone number, email address, and delivery address when you register or place an order. We do not collect payment card details.' },
                    { title: '2. How We Use Your Information', body: 'Your information is used solely to process and deliver your orders, communicate order updates, and improve our service. We do not sell your data to third parties.' },
                    { title: '3. WhatsApp Orders', body: 'When you place an order via WhatsApp, your message is handled through WhatsApp\'s platform. Please review WhatsApp\'s own privacy policy for details on how they handle your data.' },
                    { title: '4. Data Storage', body: 'Account data is stored locally in your browser (localStorage). We do not operate a remote database for user accounts at this time. Your data remains on your device.' },
                    { title: '5. Cookies', body: 'We use session storage to maintain your login state and order flow. We do not use tracking cookies or third-party analytics.' },
                    { title: '6. Your Rights', body: 'You may request deletion of your account and associated data at any time by contacting us at hello@olivedine.com.' },
                    { title: '7. Security', body: 'We take reasonable measures to protect your information. However, no method of transmission over the internet is 100% secure.' },
                    { title: '8. Contact', body: 'For privacy-related enquiries, contact us at hello@olivedine.com.' },
                ].map((s, i) => (
                    <div key={i} className="legal-section">
                        <h2>{s.title}</h2>
                        <p>{s.body}</p>
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
}

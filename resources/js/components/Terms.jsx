import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useAuth } from './AuthContext';

export default function Terms() {
    const { user, logout } = useAuth();
    return (
        <div className="main-meals-page">
            <Navbar user={user} onLogout={logout} />
            <div className="legal-wrap">
                <h1 className="legal-title">Terms of Use</h1>
                <p className="legal-updated">Last updated: {new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

                {[
                    { title: '1. Acceptance', body: 'By using the Olive Dine website and placing orders, you agree to these Terms of Use. If you do not agree, please do not use our service.' },
                    { title: '2. Orders & Payment', body: 'All orders are placed via WhatsApp. Prices are listed in Nigerian Naira (₦). Payment terms will be communicated at the time of order confirmation. Olive Dine reserves the right to decline any order.' },
                    { title: '3. Delivery', body: 'We currently deliver within Lagos Island and Mainland. Orders placed by 8pm are eligible for next-day delivery. Delivery times may vary due to traffic or other unforeseen circumstances.' },
                    { title: '4. Cancellations & Refunds', body: 'Orders may be cancelled up to 2 hours after placement. Refunds for cancelled orders will be processed within 3–5 business days. We do not accept returns on food items once delivered.' },
                    { title: '5. Allergies & Dietary Requirements', body: 'Please inform us of any allergies or dietary restrictions when placing your order. While we take every precaution, we cannot guarantee a completely allergen-free environment.' },
                    { title: '6. Account Responsibility', body: 'You are responsible for maintaining the confidentiality of your account credentials. Olive Dine is not liable for any loss resulting from unauthorised use of your account.' },
                    { title: '7. Changes to Terms', body: 'We reserve the right to update these Terms at any time. Continued use of the service after changes constitutes acceptance of the new Terms.' },
                    { title: '8. Contact', body: 'For any questions regarding these Terms, please contact us at hello@olivedine.com or via WhatsApp.' },
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

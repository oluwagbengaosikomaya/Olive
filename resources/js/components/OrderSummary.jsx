import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useAuth } from './AuthContext';

const WHATSAPP_NUMBER = '2348000000000';

export default function OrderSummary() {
    const { user, logout } = useAuth();

    const raw = sessionStorage.getItem('olive_plan_order');
    const order = raw ? JSON.parse(raw) : null;

    const [startDate, setStartDate]   = useState('');
    const [name, setName]             = useState(user?.name || '');
    const [phone, setPhone]           = useState('');
    const [address, setAddress]       = useState('');
    const [errors, setErrors]         = useState({});

    const validate = () => {
        const e = {};
        if (!name.trim())      e.name    = 'Name is required.';
        if (!phone.trim())     e.phone   = 'Phone number is required.';
        if (!address.trim())   e.address = 'Delivery address is required.';
        if (!startDate)        e.date    = 'Please select a start date.';
        return e;
    };

    const handleWhatsApp = () => {
        const e = validate();
        if (Object.keys(e).length) { setErrors(e); return; }
        setErrors({});

        const mealLines = [order.selectedPlan, ...(order.planLines || [])].join(' | ');

        const msg = [
            `🌿 *Olive Meal Plan Order*`,
            ``,
            `*Plan:* ${order.planTitle}`,
            `*Duration:* ${order.subscriptionType}`,
            `*Meals:* ${mealLines}`,
            `*Start Date:* ${startDate}`,
            `*Price:* ${order.price}`,
            ``,
            `*Customer Name:* ${name}`,
            `*Phone:* ${phone}`,
            `*Delivery Address:* ${address}`,
        ].join('\n');

        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
        sessionStorage.removeItem('olive_plan_order');
        window.open(url, '_blank');
    };

    if (!order) {
        return (
            <div className="main-meals-page">
                <Navbar user={user} onLogout={logout} />
                <div className="os-empty">
                    <p>No plan selected. <a href="/meal-plan">Browse meal plans →</a></p>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="main-meals-page">
            <Navbar user={user} onLogout={logout} />

            <div className="mm-hero">
                <div className="mm-hero-overlay" />
                <div className="mm-hero-content">
                    <span className="mm-hero-eyebrow">MEAL PLAN</span>
                    <h1>Your Order</h1>
                    <p>Review your plan details before sending via WhatsApp.</p>
                </div>
            </div>

            <div className="os-wrap">
                <div className="os-summary-card" style={{ borderLeftColor: order.accent }}>

                    {/* Plan header */}
                    <div className="os-summary-top">
                        <span className="os-summary-icon">{order.icon}</span>
                        <div>
                            <span className="os-summary-tag" style={{ background: order.tagColor }}>{order.tag}</span>
                            <h2 className="os-summary-title">{order.planTitle}</h2>
                        </div>
                    </div>

                    {/* Order rows */}
                    <div className="os-summary-rows">

                        <div className="os-summary-row">
                            <span className="os-summary-label">Plan</span>
                            <span className="os-summary-val">{order.planTitle}</span>
                        </div>

                        <div className="os-summary-row">
                            <span className="os-summary-label">Duration</span>
                            <span className="os-summary-val">{order.subscriptionType}</span>
                        </div>

                        <div className="os-summary-row os-summary-row-col">
                            <span className="os-summary-label">Meals</span>
                            <div className="os-summary-meals">
                                <span className="os-summary-val">{order.selectedPlan}</span>
                                {order.planLines && order.planLines.map((l, i) => (
                                    <span key={i} className="os-summary-meal-line">{l}</span>
                                ))}
                            </div>
                        </div>

                        <div className="os-summary-row os-summary-row-col">
                            <span className="os-summary-label">Start</span>
                            <div className="os-date-wrap">
                                <input
                                    type="date"
                                    className={`os-date-input${errors.date ? ' error' : ''}`}
                                    value={startDate}
                                    min={new Date().toISOString().split('T')[0]}
                                    onChange={e => { setStartDate(e.target.value); setErrors(v => ({ ...v, date: '' })); }}
                                />
                                {errors.date && <span className="po-error">{errors.date}</span>}
                            </div>
                        </div>

                        <div className="os-summary-row os-summary-total-row">
                            <span className="os-summary-label">Price</span>
                            <span className="os-summary-price" style={{ color: order.accent }}>{order.price}</span>
                        </div>

                    </div>

                    {/* Customer details */}
                    <div className="os-customer-fields">
                        <div className="os-field">
                            <label>Your Name</label>
                            <input
                                type="text"
                                className={`os-date-input${errors.name ? ' error' : ''}`}
                                placeholder="Full name"
                                value={name}
                                onChange={e => { setName(e.target.value); setErrors(v => ({ ...v, name: '' })); }}
                            />
                            {errors.name && <span className="po-error">{errors.name}</span>}
                        </div>
                        <div className="os-field">
                            <label>Phone Number</label>
                            <input
                                type="tel"
                                className={`os-date-input${errors.phone ? ' error' : ''}`}
                                placeholder="080..."
                                value={phone}
                                onChange={e => { setPhone(e.target.value); setErrors(v => ({ ...v, phone: '' })); }}
                            />
                            {errors.phone && <span className="po-error">{errors.phone}</span>}
                        </div>
                        <div className="os-field">
                            <label>Delivery Address</label>
                            <input
                                type="text"
                                className={`os-date-input${errors.address ? ' error' : ''}`}
                                placeholder="Street, area, city…"
                                value={address}
                                onChange={e => { setAddress(e.target.value); setErrors(v => ({ ...v, address: '' })); }}
                            />
                            {errors.address && <span className="po-error">{errors.address}</span>}
                        </div>
                    </div>

                    {/* WhatsApp button */}
                    <button className="os-whatsapp-btn" onClick={handleWhatsApp}>
                        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        Order via WhatsApp
                    </button>

                    <a href={`/meal-plan/${order.planSlug}`} className="mpd-back" style={{ display: 'block', textAlign: 'center' }}>
                        ← Back to Plan
                    </a>

                </div>
            </div>

            <Footer />
        </div>
    );
}

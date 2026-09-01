import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useAuth } from './AuthContext';

const menuData = {
    'Main Meals': [
        { name: 'Efo Riro Soup', price: 4500 },
        { name: 'Egusi Soup', price: 5500 },
        { name: 'Ogbono Soup', price: 4500 },
        { name: 'Okro Soup', price: 4500 },
        { name: 'Ewedu Soup', price: 600 },
        { name: 'Obe (Yoruba Red Stew)', price: 4500 },
        { name: 'Home Made Peppersoup', price: 9000 },
        { name: 'Ofada Sauce (Ayamase)', price: 6500 },
        { name: 'Bukka Stew (Naija Style)', price: 6500 },
        { name: 'Grilled Tiger Prawns', price: 25000 },
        { name: 'Salmon Fillet', price: 23000 },
        { name: 'Honey Glazed Spicy Chicken Wings', price: 10000 },
        { name: 'Peppered Snail', price: 15000 },
        { name: 'Grilled Chicken Breast', price: 10000 },
        { name: 'Turkey Fingers', price: 9000 },
        { name: 'Turkey Wings', price: 9000 },
        { name: 'Spicy Chicken Wings', price: 8000 },
        { name: '1 Wrap of Eba', price: 600 },
        { name: '1 Wrap of Wheat', price: 950 },
        { name: '1 Wrap of Oats Swallow', price: 950 },
        { name: '1 Wrap of Semo', price: 950 },
        { name: '1 Wrap of Amala', price: 600 },
        { name: '1 Wrap of Poundo', price: 800 },
    ],
    "Chef's Special": [
        { name: 'High Protein Bowl', price: 15500 },
        { name: 'Honey-Buttered Corn-Cob', price: 14500 },
        { name: 'Ultimate Bukka Combo', price: 10000 },
        { name: 'Beef Gomiti Pasta (Asun Pasta Style)', price: 8500 },
    ],
    'Breakfast': [
        { name: 'Boiled or Fried Yam', price: 5500 },
        { name: 'Boiled or Fried Plantain', price: 5500 },
        { name: 'Nigerian Egg Sauce', price: 3300 },
        { name: 'Plain Fried Eggs', price: 1500 },
        { name: 'Boiled Eggs', price: 600 },
        { name: 'Sunny-Side-Up Egg', price: 1500 },
        { name: 'Poached Egg', price: 1500 },
        { name: 'Avocado Toast', price: 13000 },
    ],
    'Sides': [
        { name: 'Smoky Jollof Rice', price: 3000 },
        { name: 'Fried Rice', price: 3500 },
        { name: 'Steamed Basmati Rice', price: 2500 },
        { name: 'Fries (Sweet Potatoes, Yam)', price: 2500 },
        { name: 'Steamed Vegetable', price: 3500 },
        { name: 'Mashed Potatoes', price: 6000 },
        { name: 'Stir-Fry Veggie', price: 4000 },
        { name: 'Fried Plantain (Dodo)', price: 1500 },
        { name: 'Creamy Corn-Cobs', price: 3500 },
        { name: 'Coleslaw', price: 2500 },
        { name: 'Guacamole', price: 1500 },
        { name: 'Steamed Broccoli', price: 6500 },
    ],
    'Sauces': [
        { name: 'Smoked Chicken Sauce', price: 4500 },
        { name: 'Fish Sauce', price: 3400 },
        { name: 'Naija Pepper Sauce', price: 950 },
        { name: 'Gizdodo / Beefdodo', price: 5500 },
        { name: 'Mixed Herb Sauce', price: 2600 },
    ],
    'Salads': [
        { name: 'Mixed Veggies Salad', price: 13000 },
        { name: 'Prawn Salad', price: 17000 },
        { name: 'Fruit Salad', price: 13000 },
        { name: 'Potato and Chicken Salad', price: 11000 },
        { name: 'Cucumber & Avocado Salad', price: 7500 },
    ],
    'Yoghurt Bowls': [
        { name: 'Morning Fuel', price: 15000 },
        { name: 'Yoghurt Parfait', price: 8500 },
        { name: 'Chia Pudding Bowl', price: 10000 },
        { name: 'Super Food Bowl', price: 17000 },
    ],
    'Oatmeal Bowls': [
        { name: 'Oats Porridge', price: 8500 },
        { name: 'Mango Sticky Oats', price: 8500 },
        { name: 'Overnight Oats', price: 8500 },
        { name: 'Oatmeal with Toppings', price: 15000 },
    ],
    'Fresh Drinks': [
        { name: 'Natural Retinol', price: 10000 },
        { name: 'Green Juice', price: 10000 },
        { name: 'Pineapple Ginger Juice', price: 10000 },
        { name: 'Watermelon Refresher', price: 10000 },
        { name: 'Immunity Booster', price: 10000 },
        { name: 'Sweet Sunshine', price: 10000 },
    ],
};

const categoryNames = Object.keys(menuData);

const emptyPack = () => ({ category: '', meal: '', price: 0, notes: '' });

const fmt = (n) => `₦${n.toLocaleString()}`;

export default function PlaceOrder() {
    const { user, logout } = useAuth();

    const [details, setDetails] = useState({
        name: user?.name || '',
        phone: '',
        address: '',
    });

    const [packs, setPacks] = useState([emptyPack()]);
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    const updateDetail = (k, v) => {
        setDetails(d => ({ ...d, [k]: v }));
        setErrors(e => ({ ...e, [k]: '' }));
    };

    const updatePack = (i, k, v) => {
        setPacks(ps => ps.map((p, idx) => {
            if (idx !== i) return p;
            if (k === 'category') return { ...p, category: v, meal: '', price: 0 };
            if (k === 'meal') {
                const item = menuData[p.category]?.find(m => m.name === v);
                return { ...p, meal: v, price: item?.price || 0 };
            }
            return { ...p, [k]: v };
        }));
    };

    const addPack = () => setPacks(ps => [...ps, emptyPack()]);
    const removePack = (i) => setPacks(ps => ps.filter((_, idx) => idx !== i));

    const total = packs.reduce((sum, p) => sum + p.price, 0);

    const validate = () => {
        const e = {};
        if (!details.name.trim()) e.name = 'Name is required.';
        if (!details.phone.trim()) e.phone = 'Phone number is required.';
        if (!details.address.trim()) e.address = 'Delivery address is required.';
        packs.forEach((p, i) => {
            if (!p.category) e[`pack_${i}`] = 'Select a category.';
            else if (!p.meal) e[`pack_${i}`] = 'Select a meal.';
        });
        return e;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const e2 = validate();
        if (Object.keys(e2).length) { setErrors(e2); return; }
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="main-meals-page">
                <Navbar user={user} onLogout={logout} />
                <div className="po-success">
                    <div className="po-success-icon">🎉</div>
                    <h2>Order Received!</h2>
                    <p>Thank you, <strong>{details.name}</strong>. Your order has been sent and will be delivered to:</p>
                    <p className="po-success-addr">{details.address}</p>
                    <p className="po-success-total">Total: <strong>{fmt(total)}</strong></p>
                    <div className="po-success-next">
                        <p className="po-success-note">💬 We’ll contact you on <strong>{details.phone}</strong> within 30 minutes to confirm your order.</p>
                        <p className="po-success-note">⏰ Orders placed before 8pm are delivered the next day.</p>
                    </div>
                    <a href="/" className="mm-order-btn" style={{ textDecoration: 'none', padding: '0.7rem 2rem' }}>Back to Home</a>
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
                    <span className="mm-hero-eyebrow">ORDER</span>
                    <h1>Place Your Order</h1>
                    <p>Fill in your details, choose your meals, and we'll handle the rest.</p>
                </div>
            </div>

            <div className="po-form-wrap">
                <form className="po-form" onSubmit={handleSubmit} noValidate>

                    {/* ── Your Details ── */}
                    <div className="po-section">
                        <h2 className="po-section-title">Your Details</h2>
                        <div className="po-field">
                            <label>Name</label>
                            <input
                                type="text"
                                placeholder="Enter your full name"
                                value={details.name}
                                onChange={e => updateDetail('name', e.target.value)}
                                className={errors.name ? 'po-input error' : 'po-input'}
                            />
                            {errors.name && <span className="po-error">{errors.name}</span>}
                        </div>
                        <div className="po-field">
                            <label>Phone Number</label>
                            <input
                                type="tel"
                                placeholder="080..."
                                value={details.phone}
                                onChange={e => updateDetail('phone', e.target.value)}
                                className={errors.phone ? 'po-input error' : 'po-input'}
                            />
                            {errors.phone && <span className="po-error">{errors.phone}</span>}
                        </div>
                        <div className="po-field">
                            <label>Delivery Address</label>
                            <input
                                type="text"
                                placeholder="Street, house number..."
                                value={details.address}
                                onChange={e => updateDetail('address', e.target.value)}
                                className={errors.address ? 'po-input error' : 'po-input'}
                            />
                            {errors.address && <span className="po-error">{errors.address}</span>}
                        </div>
                    </div>

                    {/* ── Choose Your Meals ── */}
                    <div className="po-section">
                        <h2 className="po-section-title">Choose Your Meals</h2>

                        {packs.map((pack, i) => (
                            <div key={i} className="po-pack">
                                <div className="po-pack-header">
                                    <span className="po-pack-label">Pack {i + 1}</span>
                                    {packs.length > 1 && (
                                        <button type="button" className="po-remove-pack" onClick={() => removePack(i)}>✕ Remove</button>
                                    )}
                                </div>

                                <div className="po-field">
                                    <label>Category</label>
                                    <select
                                        className={errors[`pack_${i}`] && !pack.category ? 'po-select error' : 'po-select'}
                                        value={pack.category}
                                        onChange={e => updatePack(i, 'category', e.target.value)}
                                    >
                                        <option value="">Select a category…</option>
                                        {categoryNames.map(c => (
                                            <option key={c} value={c}>{c}</option>
                                        ))}
                                    </select>
                                </div>

                                {pack.category && (
                                    <div className="po-field">
                                        <label>What would you like?</label>
                                        <select
                                            className={errors[`pack_${i}`] && !pack.meal ? 'po-select error' : 'po-select'}
                                            value={pack.meal}
                                            onChange={e => updatePack(i, 'meal', e.target.value)}
                                        >
                                            <option value="">Select a meal…</option>
                                            {menuData[pack.category].map(m => (
                                                <option key={m.name} value={m.name}>{m.name} — {fmt(m.price)}</option>
                                            ))}
                                        </select>
                                        {errors[`pack_${i}`] && <span className="po-error">{errors[`pack_${i}`]}</span>}
                                    </div>
                                )}

                                {pack.meal && (
                                    <div className="po-pack-price-row">
                                        <span className="po-pack-price-label">Price</span>
                                        <span className="po-pack-price-val">{fmt(pack.price)}</span>
                                    </div>
                                )}

                                <div className="po-field">
                                    <label>Special Notes <span className="po-optional">(optional)</span></label>
                                    <textarea
                                        className="po-textarea"
                                        placeholder="Allergies, spice level, extra requests…"
                                        rows={2}
                                        value={pack.notes}
                                        onChange={e => updatePack(i, 'notes', e.target.value)}
                                    />
                                </div>
                            </div>
                        ))}

                        <button type="button" className="po-add-pack" onClick={addPack}>
                            + Add Pack
                        </button>
                    </div>

                    {/* ── Total & Submit ── */}
                    {total > 0 && (
                        <div className="po-total-row">
                            <span>Total</span>
                            <span className="po-total-val">{fmt(total)}</span>
                        </div>
                    )}

                    <p className="po-terms">
                        By proceeding, you agree to our <a href="/terms">Terms of Use</a> and <a href="/privacy">Privacy Policy</a>.
                    </p>

                    <button type="submit" className="po-submit">Proceed to Order</button>
                </form>
            </div>

            <Footer />
        </div>
    );
}

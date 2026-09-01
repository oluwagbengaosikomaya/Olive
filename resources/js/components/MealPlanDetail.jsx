import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useAuth } from './AuthContext';

const planDetails = {
    'weight-loss': {
        icon: '🔥',
        tag: 'Best for Fat Loss',
        tagColor: '#e05c2a',
        accent: '#e05c2a',
        title: 'WEIGHT LOSS SCULPT PLAN',
        subtitle: 'Light balanced meals to help you drop weight without feeling drained.',
        whatYouGet: [
            'Daily breakfast, lunch, dinner + snack',
            'Portion-controlled & calorie-smart',
            'Freshly prepared every morning',
        ],
        monthlyPlans: [
            { name: 'Premium Plan', price: '₦440,000', lines: ['2 meals a day — 10 meals weekly', '5 days a week — 40 meals monthly'] },
            { name: 'Elite Plan',   price: '₦710,000', lines: ['3 meals a day — 21 meals weekly', '7 days a week — 84 meals monthly'] },
        ],
        weeklyPlans: [
            { meals: '5 meals a week',  price: '₦79,000' },
            { meals: '10 meals a week', price: '₦126,000' },
            { meals: '15 meals a week', price: '₦190,000' },
            { meals: '20 meals a week', price: '₦250,000' },
        ],
    },
    'gut-health': {
        icon: '🌿',
        tag: 'Best for Digestion',
        tagColor: '#3aaa6e',
        accent: '#3aaa6e',
        title: 'GUT-HEALTH / GUT FRIENDLY PLAN',
        subtitle: 'Easy-to-digest meals made to reduce bloating and keep your gut calm.',
        whatYouGet: [
            'Gentle meals for digestion',
            'High-fiber, low-irritant ingredients',
            'Daily 3 meals + 1 soothing snack',
        ],
        monthlyPlans: [
            { name: 'Premium Plan', price: '₦430,000', lines: ['2 meals a day — 10 meals a week', '5 days a week — 40 meals monthly'] },
            { name: 'Elite Plan',   price: '₦860,000', lines: ['3 meals a day — 21 meals weekly', '7 days a week — 84 meals monthly'] },
        ],
        weeklyPlans: [
            { meals: 'Breakfast only — 5 days a week', price: '₦40,000' },
            { meals: 'Breakfast only — 7 days a week', price: '₦56,000' },
            { meals: 'Lunch only — 5 days a week',     price: '₦60,000' },
            { meals: 'Lunch only — 7 days a week',     price: '₦84,000' },
            { meals: 'Dinner only — 5 days a week',    price: '₦67,500' },
            { meals: 'Dinner only — 7 days a week',    price: '₦94,500' },
        ],
        comboPlans: [
            { meals: 'Breakfast & Lunch — 5 days a week', price: '₦110,000' },
            { meals: 'Breakfast & Lunch — 7 days a week', price: '₦154,000' },
            { meals: 'Lunch & Dinner — 5 days a week',    price: '₦120,000' },
            { meals: 'Lunch & Dinner — 7 days a week',    price: '₦168,000' },
        ],
    },
    'anti-inflammatory': {
        icon: '💛',
        tag: 'Best for Wellness',
        tagColor: '#c9a227',
        accent: '#c9a227',
        title: 'ANTI-INFLAMMATORY PLAN',
        subtitle: 'Clean, nutrient-rich meals that help reduce inflammation and boost energy.',
        whatYouGet: [
            'Daily 3 meals + 1 anti-inflammatory snack',
            'Fresh ingredients, no processed oils',
            'Packed with greens, berries & healthy fats',
        ],
        monthlyPlans: [
            { name: 'Premium Plan', price: '₦485,000', lines: ['2 meals a day — 10 meals weekly', '5 days a week — 40 meals monthly'] },
            { name: 'Elite Plan',   price: '₦780,000', lines: ['3 meals a day — 21 meals weekly', '7 days a week — 84 meals monthly'] },
        ],
        weeklyPlans: [
            { meals: '5 meals a week',  price: '₦75,000' },
            { meals: '10 meals a week', price: '₦150,000' },
            { meals: '15 meals a week', price: '₦225,000' },
            { meals: '20 meals a week', price: '₦298,000' },
        ],
    },
    'weight-gain': {
        icon: '💪',
        tag: 'Best for Muscle Gain',
        tagColor: '#4a90d9',
        accent: '#4a90d9',
        title: 'WEIGHT GAIN + LEAN BULK PLAN',
        subtitle: 'High-calorie, high-protein meals to support healthy weight gain and muscle building.',
        whatYouGet: [
            '3 hearty meals + high-protein snack',
            'Balanced carbs, clean protein & good fats',
            'Great for active or gym-focused customers',
        ],
        monthlyPlans: [
            { name: 'Premium Plan', price: '₦520,000', lines: ['2 meals a day — 10 meals weekly', '5 days a week — 40 meals monthly'] },
            { name: 'Elite Plan',   price: '₦840,000', lines: ['3 meals a day — 21 meals weekly', '7 days a week — 84 meals monthly'] },
        ],
        weeklyPlans: [
            { meals: 'Breakfast only — 5 days a week', price: '₦50,000' },
            { meals: 'Breakfast only — 7 days a week', price: '₦70,000' },
            { meals: 'Lunch only — 5 days a week',     price: '₦90,000' },
            { meals: 'Lunch only — 7 days a week',     price: '₦116,000' },
            { meals: 'Dinner only — 5 days a week',    price: '₦70,500' },
            { meals: 'Dinner only — 7 days a week',    price: '₦98,000' },
        ],
        comboPlans: [
            { meals: 'Breakfast & Lunch — 5 days a week', price: '₦140,000' },
            { meals: 'Breakfast & Lunch — 7 days a week', price: '₦160,000' },
            { meals: 'Lunch & Dinner — 5 days a week',    price: '₦175,000' },
            { meals: 'Lunch & Dinner — 7 days a week',    price: '₦235,000' },
        ],
    },
};

/* ── shared helper to save & navigate ── */
function saveAndGo({ planSlug, data, subscriptionType, selectedPlan, planLines, price }) {
    sessionStorage.setItem('olive_plan_order', JSON.stringify({
        planSlug, planTitle: data.title, icon: data.icon,
        tag: data.tag, tagColor: data.tagColor, accent: data.accent,
        subscriptionType, selectedPlan, planLines, price,
    }));
    window.location.href = '/order-summary';
}

/* ── reusable sub-sections ── */
function PlanHeader({ data }) {
    return (
        <div className="mpd-section">
            <div className="mpd-wl-header">
                <span className="mpd-tag" style={{ background: data.tagColor }}>{data.tag}</span>
                <h1 className="mpd-wl-title">{data.title}</h1>
                <p className="mpd-wl-subtitle">{data.subtitle}</p>
            </div>
            <div className="mpd-wl-divider" />
            <h3 className="mpd-sub-title">What You Get</h3>
            <ul className="mpd-features">
                {data.whatYouGet.map((f, i) => (
                    <li key={i}><span style={{ color: data.accent }}>✓</span>{f}</li>
                ))}
            </ul>
        </div>
    );
}

function MonthlySection({ data, selected, onSelect }) {
    return (
        <div className="mpd-section">
            <div className="mpd-sub-heading">
                <h3 className="mpd-sub-title">Monthly Subscription</h3>
                <p className="mpd-sub-hint">Choose a monthly subscription plan</p>
            </div>
            <div className="mpd-pricing-grid">
                {data.monthlyPlans.map((p, i) => (
                    <div key={i}
                        className={`mpd-pricing-card${selected === i ? ' selected' : ''}`}
                        style={selected === i ? { borderColor: data.accent } : {}}
                        onClick={() => onSelect(i)}
                    >
                        <div className="mpd-pricing-name">{p.name}</div>
                        <div className="mpd-pricing-price" style={{ color: data.accent }}>{p.price}</div>
                        {p.lines.map((l, j) => <p key={j} className="mpd-pricing-line">{l}</p>)}
                        {selected === i && <span className="mpd-pricing-check" style={{ color: data.accent }}>✓ Selected</span>}
                    </div>
                ))}
            </div>
        </div>
    );
}

function WeeklySection({ data, selected, onSelect, title = 'Weekly Subscription', hint = 'Choose a weekly subscription plan', plans }) {
    const items = plans || data.weeklyPlans;
    return (
        <div className="mpd-section">
            <div className="mpd-sub-heading">
                <h3 className="mpd-sub-title">{title}</h3>
                <p className="mpd-sub-hint">{hint}</p>
            </div>
            <div className="mpd-weekly-grid">
                {items.map((p, i) => (
                    <div key={i}
                        className={`mpd-weekly-card${selected === i ? ' selected' : ''}`}
                        style={selected === i ? { borderColor: data.accent } : {}}
                        onClick={() => onSelect(i)}
                    >
                        <span className="mpd-weekly-meals">{p.meals}</span>
                        <span className="mpd-weekly-price" style={{ color: data.accent }}>{p.price}</span>
                        {selected === i && <span className="mpd-pricing-check" style={{ color: data.accent }}>✓</span>}
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ── Weight Loss ── */
function WeightLossDetail({ data, user }) {
    const [selMonthly, setSelMonthly] = useState(null);
    const [selWeekly,  setSelWeekly]  = useState(null);
    const [error, setError] = useState('');

    const handleStart = () => {
        if (!user) { window.location.href = '/login'; return; }
        if (selMonthly === null && selWeekly === null) { setError('Please select a plan before continuing.'); return; }
        const isMonthly = selMonthly !== null;
        const sel = isMonthly ? data.monthlyPlans[selMonthly] : data.weeklyPlans[selWeekly];
        saveAndGo({ planSlug: 'weight-loss', data, subscriptionType: isMonthly ? 'Monthly Subscription' : 'Weekly Subscription', selectedPlan: isMonthly ? sel.name : sel.meals, planLines: isMonthly ? sel.lines : [], price: sel.price });
    };

    return (
        <div className="mpd-wrap">
            <PlanHeader data={data} />
            <MonthlySection data={data} selected={selMonthly} onSelect={(i) => { setSelMonthly(i); setSelWeekly(null); setError(''); }} />
            <WeeklySection  data={data} selected={selWeekly}  onSelect={(i) => { setSelWeekly(i);  setSelMonthly(null); setError(''); }} />
            <div className="mpd-cta">
                {error && <p className="po-error" style={{ textAlign: 'center' }}>{error}</p>}
                <button className="mpd-start-btn" style={{ background: data.accent }} onClick={handleStart}>Start This Plan</button>
                <a href="/meal-plan" className="mpd-back">← Back to Meal Plans</a>
            </div>
        </div>
    );
}

/* ── Gut Health ── */
function GutHealthDetail({ data, user }) {
    const [selMonthly, setSelMonthly] = useState(null);
    const [selWeekly,  setSelWeekly]  = useState(null);
    const [selCombo,   setSelCombo]   = useState(null);
    const [error, setError] = useState('');

    const handleStart = () => {
        if (!user) { window.location.href = '/login'; return; }
        if (selMonthly === null && selWeekly === null && selCombo === null) { setError('Please select a plan before continuing.'); return; }
        let subscriptionType, selectedPlan, planLines, price;
        if (selMonthly !== null) {
            const sel = data.monthlyPlans[selMonthly];
            subscriptionType = 'Monthly Subscription'; selectedPlan = sel.name; planLines = sel.lines; price = sel.price;
        } else if (selWeekly !== null) {
            const sel = data.weeklyPlans[selWeekly];
            subscriptionType = 'Weekly Subscription'; selectedPlan = sel.meals; planLines = []; price = sel.price;
        } else {
            const sel = data.comboPlans[selCombo];
            subscriptionType = 'Combo Deal'; selectedPlan = sel.meals; planLines = []; price = sel.price;
        }
        saveAndGo({ planSlug: 'gut-health', data, subscriptionType, selectedPlan, planLines, price });
    };

    return (
        <div className="mpd-wrap">
            <PlanHeader data={data} />
            <MonthlySection data={data} selected={selMonthly} onSelect={(i) => { setSelMonthly(i); setSelWeekly(null); setSelCombo(null); setError(''); }} />
            <WeeklySection  data={data} selected={selWeekly}  onSelect={(i) => { setSelWeekly(i);  setSelMonthly(null); setSelCombo(null); setError(''); }} />
            <WeeklySection  data={data} selected={selCombo}   onSelect={(i) => { setSelCombo(i);   setSelMonthly(null); setSelWeekly(null); setError(''); }} title="Combo Deals" hint="Choose a combo deal" plans={data.comboPlans} />
            <div className="mpd-cta">
                {error && <p className="po-error" style={{ textAlign: 'center' }}>{error}</p>}
                <button className="mpd-start-btn" style={{ background: data.accent }} onClick={handleStart}>Start This Plan</button>
                <a href="/meal-plan" className="mpd-back">← Back to Meal Plans</a>
            </div>
        </div>
    );
}

/* ── Anti-Inflammatory ── */
function AntiInflammatoryDetail({ data, user }) {
    const [selMonthly, setSelMonthly] = useState(null);
    const [selWeekly,  setSelWeekly]  = useState(null);
    const [error, setError] = useState('');

    const handleStart = () => {
        if (!user) { window.location.href = '/login'; return; }
        if (selMonthly === null && selWeekly === null) { setError('Please select a plan before continuing.'); return; }
        const isMonthly = selMonthly !== null;
        const sel = isMonthly ? data.monthlyPlans[selMonthly] : data.weeklyPlans[selWeekly];
        saveAndGo({ planSlug: 'anti-inflammatory', data, subscriptionType: isMonthly ? 'Monthly Subscription' : 'Weekly Subscription', selectedPlan: isMonthly ? sel.name : sel.meals, planLines: isMonthly ? sel.lines : [], price: sel.price });
    };

    return (
        <div className="mpd-wrap">
            <PlanHeader data={data} />
            <MonthlySection data={data} selected={selMonthly} onSelect={(i) => { setSelMonthly(i); setSelWeekly(null); setError(''); }} />
            <WeeklySection  data={data} selected={selWeekly}  onSelect={(i) => { setSelWeekly(i);  setSelMonthly(null); setError(''); }} />
            <div className="mpd-cta">
                {error && <p className="po-error" style={{ textAlign: 'center' }}>{error}</p>}
                <button className="mpd-start-btn" style={{ background: data.accent }} onClick={handleStart}>Start This Plan</button>
                <a href="/meal-plan" className="mpd-back">← Back to Meal Plans</a>
            </div>
        </div>
    );
}

/* ── Weight Gain ── */
function WeightGainDetail({ data, user }) {
    const [selMonthly, setSelMonthly] = useState(null);
    const [selWeekly,  setSelWeekly]  = useState(null);
    const [selCombo,   setSelCombo]   = useState(null);
    const [error, setError] = useState('');

    const handleStart = () => {
        if (!user) { window.location.href = '/login'; return; }
        if (selMonthly === null && selWeekly === null && selCombo === null) { setError('Please select a plan before continuing.'); return; }
        let subscriptionType, selectedPlan, planLines, price;
        if (selMonthly !== null) {
            const sel = data.monthlyPlans[selMonthly];
            subscriptionType = 'Monthly Subscription'; selectedPlan = sel.name; planLines = sel.lines; price = sel.price;
        } else if (selWeekly !== null) {
            const sel = data.weeklyPlans[selWeekly];
            subscriptionType = 'Weekly Subscription'; selectedPlan = sel.meals; planLines = []; price = sel.price;
        } else {
            const sel = data.comboPlans[selCombo];
            subscriptionType = 'Combo Deal'; selectedPlan = sel.meals; planLines = []; price = sel.price;
        }
        saveAndGo({ planSlug: 'weight-gain', data, subscriptionType, selectedPlan, planLines, price });
    };

    return (
        <div className="mpd-wrap">
            <PlanHeader data={data} />
            <MonthlySection data={data} selected={selMonthly} onSelect={(i) => { setSelMonthly(i); setSelWeekly(null); setSelCombo(null); setError(''); }} />
            <WeeklySection  data={data} selected={selWeekly}  onSelect={(i) => { setSelWeekly(i);  setSelMonthly(null); setSelCombo(null); setError(''); }} />
            <WeeklySection  data={data} selected={selCombo}   onSelect={(i) => { setSelCombo(i);   setSelMonthly(null); setSelWeekly(null); setError(''); }} title="Combo Deals" hint="Choose a combo deal" plans={data.comboPlans} />
            <div className="mpd-cta">
                {error && <p className="po-error" style={{ textAlign: 'center' }}>{error}</p>}
                <button className="mpd-start-btn" style={{ background: data.accent }} onClick={handleStart}>Start This Plan</button>
                <a href="/meal-plan" className="mpd-back">← Back to Meal Plans</a>
            </div>
        </div>
    );
}

/* ── Main export ── */
export default function MealPlanDetail({ plan }) {
    const { user, logout } = useAuth();
    const data = planDetails[plan];
    if (!data) return null;

    const DetailComponent = {
        'weight-loss':       WeightLossDetail,
        'gut-health':        GutHealthDetail,
        'anti-inflammatory': AntiInflammatoryDetail,
        'weight-gain':       WeightGainDetail,
    }[plan];

    return (
        <div className="main-meals-page">
            <Navbar user={user} onLogout={logout} />
            <div className="mm-hero">
                <div className="mm-hero-overlay" />
                <div className="mm-hero-content">
                    <span className="mm-hero-eyebrow">MEAL PLAN</span>
                    <h1>{data.title}</h1>
                    <p>{data.subtitle}</p>
                </div>
            </div>
            {DetailComponent ? <DetailComponent data={data} user={user} /> : null}
            <Footer />
        </div>
    );
}

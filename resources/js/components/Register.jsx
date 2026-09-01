import React, { useState } from 'react';
import Navbar from './Navbar';
import { useAuth } from './AuthContext';

const getStrength = (pw) => {
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score;
};

const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'];
const strengthColor = ['', '#e05c2a', '#c9a227', '#3aaa6e', '#4a90d9'];

export default function Register() {
    const { login } = useAuth();
    const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', terms: false });
    const [errors, setErrors] = useState({});
    const [showPw, setShowPw] = useState(false);
    const [loading, setLoading] = useState(false);

    const strength = getStrength(form.password);

    const validate = () => {
        const e = {};
        if (!form.name.trim() || form.name.trim().length < 2) e.name = 'Full name must be at least 2 characters.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address.';
        if (form.password.length < 8) e.password = 'Password must be at least 8 characters.';
        if (strength < 3) e.password = 'Password is too weak. Add uppercase, numbers, and symbols.';
        if (form.password !== form.confirm) e.confirm = 'Passwords do not match.';
        if (!form.terms) e.terms = 'You must agree to the terms.';
        return e;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const e2 = validate();
        if (Object.keys(e2).length) { setErrors(e2); return; }
        setLoading(true);

        // Simulate registration — store in localStorage as "registered users"
        setTimeout(() => {
            const users = JSON.parse(localStorage.getItem('olive_users') || '[]');
            if (users.find(u => u.email === form.email)) {
                setErrors({ email: 'An account with this email already exists.' });
                setLoading(false);
                return;
            }
            users.push({ name: form.name.trim(), email: form.email, password: form.password });
            localStorage.setItem('olive_users', JSON.stringify(users));
            login({ name: form.name.trim(), email: form.email });
            window.location.href = '/';
        }, 800);
    };

    const set = (field) => (e) => {
        const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setForm(f => ({ ...f, [field]: val }));
        setErrors(er => ({ ...er, [field]: '' }));
    };

    return (
        <div className="auth-page">
            <Navbar />
            <div className="auth-container">
                <div className="auth-card">
                    <div className="auth-logo">Olive<span>Dine</span></div>
                    <h2>Create Account</h2>
                    <p className="auth-sub">Sign up to access our full menu & meal plans</p>

                    <form onSubmit={handleSubmit} noValidate>
                        <div className="auth-field">
                            <label>Full Name</label>
                            <input type="text" placeholder="Your full name" value={form.name} onChange={set('name')} className={errors.name ? 'error' : ''} />
                            {errors.name && <span className="auth-error">{errors.name}</span>}
                        </div>

                        <div className="auth-field">
                            <label>Email Address</label>
                            <input type="email" placeholder="you@example.com" value={form.email} onChange={set('email')} className={errors.email ? 'error' : ''} />
                            {errors.email && <span className="auth-error">{errors.email}</span>}
                        </div>

                        <div className="auth-field">
                            <label>Password</label>
                            <div className="auth-pw-wrap">
                                <input type={showPw ? 'text' : 'password'} placeholder="Min. 8 characters" value={form.password} onChange={set('password')} className={errors.password ? 'error' : ''} />
                                <button type="button" className="auth-eye" onClick={() => setShowPw(s => !s)}>{showPw ? '🙈' : '👁️'}</button>
                            </div>
                            {form.password && (
                                <div className="strength-bar">
                                    {[1,2,3,4].map(i => (
                                        <div key={i} className="strength-seg" style={{ background: i <= strength ? strengthColor[strength] : 'rgba(255,255,255,0.1)' }} />
                                    ))}
                                    <span style={{ color: strengthColor[strength] }}>{strengthLabel[strength]}</span>
                                </div>
                            )}
                            {errors.password && <span className="auth-error">{errors.password}</span>}
                        </div>

                        <div className="auth-field">
                            <label>Confirm Password</label>
                            <input type="password" placeholder="Repeat password" value={form.confirm} onChange={set('confirm')} className={errors.confirm ? 'error' : ''} />
                            {errors.confirm && <span className="auth-error">{errors.confirm}</span>}
                        </div>

                        <div className="auth-field auth-checkbox">
                            <label>
                                <input type="checkbox" checked={form.terms} onChange={set('terms')} />
                                I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
                            </label>
                            {errors.terms && <span className="auth-error">{errors.terms}</span>}
                        </div>

                        <button type="submit" className="auth-btn" disabled={loading}>
                            {loading ? 'Creating account…' : 'Sign Up'}
                        </button>
                    </form>

                    <p className="auth-switch">Already have an account? <a href="/login">Log in</a></p>
                </div>
            </div>
        </div>
    );
}

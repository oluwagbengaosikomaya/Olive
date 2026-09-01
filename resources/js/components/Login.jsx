import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { useAuth } from './AuthContext';

const MAX_ATTEMPTS = 5;
const LOCKOUT_SECONDS = 30;

export default function Login() {
    const { login } = useAuth();
    const [form, setForm] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [showPw, setShowPw] = useState(false);
    const [loading, setLoading] = useState(false);
    const [attempts, setAttempts] = useState(() => parseInt(localStorage.getItem('olive_attempts') || '0'));
    const [lockUntil, setLockUntil] = useState(() => parseInt(localStorage.getItem('olive_lock_until') || '0'));
    const [countdown, setCountdown] = useState(0);

    useEffect(() => {
        if (!lockUntil) return;
        const tick = () => {
            const remaining = Math.ceil((lockUntil - Date.now()) / 1000);
            if (remaining <= 0) {
                setCountdown(0);
                setLockUntil(0);
                setAttempts(0);
                localStorage.removeItem('olive_lock_until');
                localStorage.removeItem('olive_attempts');
            } else {
                setCountdown(remaining);
            }
        };
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, [lockUntil]);

    const isLocked = lockUntil > Date.now();

    const validate = () => {
        const e = {};
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address.';
        if (!form.password) e.password = 'Password is required.';
        return e;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLocked) return;

        const e2 = validate();
        if (Object.keys(e2).length) { setErrors(e2); return; }

        setLoading(true);
        setTimeout(() => {
            const users = JSON.parse(localStorage.getItem('olive_users') || '[]');
            const user = users.find(u => u.email === form.email && u.password === form.password);

            if (user) {
                localStorage.removeItem('olive_attempts');
                localStorage.removeItem('olive_lock_until');
                login({ name: user.name, email: user.email, role: user.role || 'user' });
                // Redirect by role
                if (user.role === 'superadmin' || user.role === 'admin') {
                    window.location.href = '/admin';
                } else {
                    const intended = sessionStorage.getItem('olive_intended') || '/dashboard';
                    sessionStorage.removeItem('olive_intended');
                    window.location.href = intended;
                }
            } else {
                const newAttempts = attempts + 1;
                setAttempts(newAttempts);
                localStorage.setItem('olive_attempts', newAttempts);

                if (newAttempts >= MAX_ATTEMPTS) {
                    const until = Date.now() + LOCKOUT_SECONDS * 1000;
                    setLockUntil(until);
                    localStorage.setItem('olive_lock_until', until);
                    setErrors({ general: `Too many failed attempts. Try again in ${LOCKOUT_SECONDS} seconds.` });
                } else {
                    setErrors({ general: `Invalid email or password. ${MAX_ATTEMPTS - newAttempts} attempt(s) remaining.` });
                }
                setLoading(false);
            }
        }, 700);
    };

    const set = (field) => (e) => {
        setForm(f => ({ ...f, [field]: e.target.value }));
        setErrors(er => ({ ...er, [field]: '', general: '' }));
    };

    return (
        <div className="auth-page">
            <Navbar />
            <div className="auth-container">
                <div className="auth-card">
                    <div className="auth-logo">Olive<span>Dine</span></div>
                    <h2>Welcome Back</h2>
                    <p className="auth-sub">Log in to access your menu & meal plans</p>

                    {isLocked && (
                        <div className="auth-lockout">
                            🔒 Account temporarily locked. Try again in <strong>{countdown}s</strong>
                        </div>
                    )}

                    {errors.general && !isLocked && (
                        <div className="auth-alert">{errors.general}</div>
                    )}

                    <form onSubmit={handleSubmit} noValidate>
                        <div className="auth-field">
                            <label>Email Address</label>
                            <input type="email" placeholder="you@example.com" value={form.email} onChange={set('email')} className={errors.email ? 'error' : ''} disabled={isLocked} />
                            {errors.email && <span className="auth-error">{errors.email}</span>}
                        </div>

                        <div className="auth-field">
                            <label>Password</label>
                            <div className="auth-pw-wrap">
                                <input type={showPw ? 'text' : 'password'} placeholder="Your password" value={form.password} onChange={set('password')} className={errors.password ? 'error' : ''} disabled={isLocked} />
                                <button type="button" className="auth-eye" onClick={() => setShowPw(s => !s)}>{showPw ? '🙈' : '👁️'}</button>
                            </div>
                            {errors.password && <span className="auth-error">{errors.password}</span>}
                        </div>

                        <button type="submit" className="auth-btn" disabled={loading || isLocked}>
                            {loading ? 'Logging in…' : 'Log In'}
                        </button>
                    </form>

                    <p className="auth-switch">Don't have an account? <a href="/register">Sign up</a></p>
                </div>
            </div>
        </div>
    );
}

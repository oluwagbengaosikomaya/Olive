import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const getUsers = () => JSON.parse(localStorage.getItem('olive_users') || '[]');
const saveUsers = (u) => localStorage.setItem('olive_users', JSON.stringify(u));

const getStrength = (pw) => {
    let s = 0;
    if (pw.length >= 8) s++;
    if (/[A-Z]/.test(pw)) s++;
    if (/[0-9]/.test(pw)) s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;
    return s;
};

export default function AdminDashboard() {
    const { user, logout } = useAuth();
    const [tab, setTab] = useState('overview');
    const [users, setUsers] = useState(getUsers);
    const [orders] = useState(() => JSON.parse(localStorage.getItem('olive_orders') || '[]'));
    const [form, setForm] = useState({ name: '', email: '', password: '', role: 'admin' });
    const [formErrors, setFormErrors] = useState({});
    const [formSuccess, setFormSuccess] = useState('');
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const refresh = () => setUsers(getUsers());

    const stats = {
        total: users.length,
        admins: users.filter(u => u.role === 'admin' || u.role === 'superadmin').length,
        regularUsers: users.filter(u => !u.role || u.role === 'user').length,
        today: users.filter(u => u.createdAt && new Date(u.createdAt).toDateString() === new Date().toDateString()).length,
    };

    const validateForm = () => {
        const e = {};
        if (!form.name.trim() || form.name.trim().length < 2) e.name = 'Name must be at least 2 characters.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email.';
        if (form.password.length < 8 || getStrength(form.password) < 3) e.password = 'Password too weak (need uppercase, number, symbol).';
        return e;
    };

    const handleCreateAdmin = (e) => {
        e.preventDefault();
        setFormSuccess('');
        const errs = validateForm();
        if (Object.keys(errs).length) { setFormErrors(errs); return; }
        const all = getUsers();
        if (all.find(u => u.email === form.email)) {
            setFormErrors({ email: 'Email already exists.' });
            return;
        }
        all.push({ name: form.name.trim(), email: form.email, password: form.password, role: form.role, createdAt: new Date().toISOString() });
        saveUsers(all);
        refresh();
        setForm({ name: '', email: '', password: '', role: 'admin' });
        setFormErrors({});
        setFormSuccess(`${form.role === 'admin' ? 'Admin' : 'User'} account created successfully.`);
    };

    const handleDelete = (email) => {
        if (email === user.email) return;
        const updated = getUsers().filter(u => u.email !== email);
        saveUsers(updated);
        refresh();
        setDeleteConfirm(null);
    };

    const handleToggleRole = (email) => {
        if (email === user.email) return;
        const updated = getUsers().map(u => {
            if (u.email === email) {
                return { ...u, role: (u.role === 'admin' || u.role === 'superadmin') ? 'user' : 'admin' };
            }
            return u;
        });
        saveUsers(updated);
        refresh();
    };

    const set = (field) => (e) => {
        setForm(f => ({ ...f, [field]: e.target.value }));
        setFormErrors(er => ({ ...er, [field]: '' }));
        setFormSuccess('');
    };

    const strength = getStrength(form.password);
    const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'];
    const strengthColor = ['', '#e05c2a', '#c9a227', '#3aaa6e', '#4a90d9'];

    return (
        <div className="adm-layout">
            {/* Sidebar */}
            <aside className={`adm-sidebar ${sidebarOpen ? 'open' : 'collapsed'}`}>
                <div className="adm-sidebar-logo">
                    {sidebarOpen ? <><span>Olive</span>Dine</> : 'OD'}
                </div>
                <nav className="adm-nav">
                    {[
                        { key: 'overview', icon: '📊', label: 'Overview' },
                        { key: 'orders',   icon: '📋', label: 'Orders' },
                        { key: 'users',    icon: '👥', label: 'All Users' },
                        { key: 'create',   icon: '➕', label: 'Create Account' },
                    ].map(item => (
                        <button key={item.key} className={`adm-nav-item ${tab === item.key ? 'active' : ''}`} onClick={() => setTab(item.key)}>
                            <span className="adm-nav-icon">{item.icon}</span>
                            {sidebarOpen && <span>{item.label}</span>}
                        </button>
                    ))}
                </nav>
                <div className="adm-sidebar-footer">
                    <button className="adm-nav-item" onClick={logout}>
                        <span className="adm-nav-icon">🚪</span>
                        {sidebarOpen && <span>Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main */}
            <div className="adm-main">
                {/* Topbar */}
                <header className="adm-topbar">
                    <button className="adm-toggle-btn" onClick={() => setSidebarOpen(s => !s)}>☰</button>
                    <div className="adm-topbar-title">
                        {tab === 'overview' && 'Dashboard Overview'}
                        {tab === 'orders' && 'Orders'}
                        {tab === 'users' && 'User Management'}
                        {tab === 'create' && 'Create Account'}
                    </div>
                    <div className="adm-topbar-user">
                        <span className="adm-badge superadmin">{user.role === 'superadmin' ? 'Super Admin' : 'Admin'}</span>
                        <span className="adm-topbar-name">👤 {user.name}</span>
                    </div>
                </header>

                <div className="adm-content">

                    {/* OVERVIEW */}
                    {tab === 'overview' && (
                        <div>
                            <div className="adm-stats-grid">
                                <div className="adm-stat-card" style={{ borderTopColor: '#4a90d9' }}>
                                    <div className="adm-stat-icon">👥</div>
                                    <div className="adm-stat-val">{stats.total}</div>
                                    <div className="adm-stat-label">Total Accounts</div>
                                </div>
                                <div className="adm-stat-card" style={{ borderTopColor: '#e05c2a' }}>
                                    <div className="adm-stat-icon">🛡️</div>
                                    <div className="adm-stat-val">{stats.admins}</div>
                                    <div className="adm-stat-label">Admin Accounts</div>
                                </div>
                                <div className="adm-stat-card" style={{ borderTopColor: '#3aaa6e' }}>
                                    <div className="adm-stat-icon">🙋</div>
                                    <div className="adm-stat-val">{stats.regularUsers}</div>
                                    <div className="adm-stat-label">Regular Users</div>
                                </div>
                                <div className="adm-stat-card" style={{ borderTopColor: '#c9a227' }}>
                                    <div className="adm-stat-icon">🆕</div>
                                    <div className="adm-stat-val">{stats.today}</div>
                                    <div className="adm-stat-label">Joined Today</div>
                                </div>
                            </div>

                            <div className="adm-section-title">Recent Accounts</div>
                            <div className="adm-table-wrap">
                                <table className="adm-table">
                                    <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Joined</th></tr></thead>
                                    <tbody>
                                        {[...users].reverse().slice(0, 5).map((u, i) => (
                                            <tr key={i}>
                                                <td>{u.name}</td>
                                                <td>{u.email}</td>
                                                <td><span className={`adm-badge ${u.role || 'user'}`}>{u.role || 'user'}</span></td>
                                                <td>{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* ORDERS */}
                    {tab === 'orders' && (
                        <div>
                            <div className="adm-section-title" style={{ marginBottom: '1rem' }}>WhatsApp Orders Log</div>
                            {orders.length === 0 ? (
                                <div className="adm-table-wrap" style={{ padding: '2rem', textAlign: 'center', color: '#888', fontSize: '0.9rem' }}>
                                    No orders recorded yet. Orders placed via WhatsApp will appear here once integrated.
                                </div>
                            ) : (
                                <div className="adm-table-wrap">
                                    <table className="adm-table">
                                        <thead><tr><th>Customer</th><th>Phone</th><th>Plan / Meal</th><th>Price</th><th>Date</th></tr></thead>
                                        <tbody>
                                            {[...orders].reverse().map((o, i) => (
                                                <tr key={i}>
                                                    <td>{o.name}</td>
                                                    <td>{o.phone}</td>
                                                    <td>{o.plan || o.meal}</td>
                                                    <td>{o.price}</td>
                                                    <td>{o.date ? new Date(o.date).toLocaleDateString() : '—'}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )}

                    {/* ALL USERS */}
                    {tab === 'users' && (
                        <div>
                            <div className="adm-table-wrap">
                                <table className="adm-table">
                                    <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Joined</th><th>Actions</th></tr></thead>
                                    <tbody>
                                        {users.map((u, i) => (
                                            <tr key={i}>
                                                <td>{u.name}</td>
                                                <td>{u.email}</td>
                                                <td><span className={`adm-badge ${u.role || 'user'}`}>{u.role || 'user'}</span></td>
                                                <td>{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}</td>
                                                <td className="adm-actions">
                                                    {u.email !== user.email && u.role !== 'superadmin' && (
                                                        <>
                                                            <button className="adm-action-btn toggle" onClick={() => handleToggleRole(u.email)}>
                                                                {(u.role === 'admin') ? '↓ User' : '↑ Admin'}
                                                            </button>
                                                            <button className="adm-action-btn delete" onClick={() => setDeleteConfirm(u.email)}>Delete</button>
                                                        </>
                                                    )}
                                                    {u.email === user.email && <span className="adm-you">You</span>}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {deleteConfirm && (
                                <div className="adm-modal-overlay">
                                    <div className="adm-modal">
                                        <h3>Confirm Delete</h3>
                                        <p>Delete account <strong>{deleteConfirm}</strong>? This cannot be undone.</p>
                                        <div className="adm-modal-actions">
                                            <button className="adm-action-btn delete" onClick={() => handleDelete(deleteConfirm)}>Yes, Delete</button>
                                            <button className="adm-action-btn toggle" onClick={() => setDeleteConfirm(null)}>Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* CREATE ACCOUNT */}
                    {tab === 'create' && (
                        <div className="adm-form-wrap">
                            <div className="adm-form-card">
                                <h3>Create New Account</h3>
                                <p className="adm-form-sub">Create an admin or user account directly.</p>

                                {formSuccess && <div className="adm-success">{formSuccess}</div>}

                                <form onSubmit={handleCreateAdmin} noValidate>
                                    <div className="adm-field">
                                        <label>Full Name</label>
                                        <input type="text" placeholder="Full name" value={form.name} onChange={set('name')} className={formErrors.name ? 'error' : ''} />
                                        {formErrors.name && <span className="adm-error">{formErrors.name}</span>}
                                    </div>
                                    <div className="adm-field">
                                        <label>Email Address</label>
                                        <input type="email" placeholder="email@example.com" value={form.email} onChange={set('email')} className={formErrors.email ? 'error' : ''} />
                                        {formErrors.email && <span className="adm-error">{formErrors.email}</span>}
                                    </div>
                                    <div className="adm-field">
                                        <label>Password</label>
                                        <input type="password" placeholder="Strong password" value={form.password} onChange={set('password')} className={formErrors.password ? 'error' : ''} />
                                        {form.password && (
                                            <div className="strength-bar" style={{ marginTop: '0.4rem' }}>
                                                {[1,2,3,4].map(i => (
                                                    <div key={i} className="strength-seg" style={{ background: i <= strength ? strengthColor[strength] : 'rgba(0,0,0,0.1)' }} />
                                                ))}
                                                <span style={{ color: strengthColor[strength], fontSize: '0.75rem', fontWeight: 600 }}>{strengthLabel[strength]}</span>
                                            </div>
                                        )}
                                        {formErrors.password && <span className="adm-error">{formErrors.password}</span>}
                                    </div>
                                    <div className="adm-field">
                                        <label>Role</label>
                                        <select value={form.role} onChange={set('role')}>
                                            <option value="admin">Admin</option>
                                            <option value="user">Regular User</option>
                                        </select>
                                    </div>
                                    <button type="submit" className="adm-submit-btn">Create Account</button>
                                </form>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

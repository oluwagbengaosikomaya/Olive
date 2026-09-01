import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

// Seed default superadmin on first load
const seedAdmin = () => {
    const users = JSON.parse(localStorage.getItem('olive_users') || '[]');
    const idx = users.findIndex(u => u.email === 'admin@olivedine.com');
    const admin = {
        name: 'Super Admin',
        email: 'admin@olivedine.com',
        password: '@Control72',
        role: 'superadmin',
        createdAt: new Date().toISOString(),
    };
    if (idx === -1) users.push(admin);
    else users[idx] = { ...users[idx], password: admin.password };
    localStorage.setItem('olive_users', JSON.stringify(users));
};
seedAdmin();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        try { return JSON.parse(localStorage.getItem('olive_user')) || null; }
        catch { return null; }
    });

    const login = (userData) => {
        localStorage.setItem('olive_user', JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('olive_user');
        setUser(null);
        window.location.href = '/';
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);

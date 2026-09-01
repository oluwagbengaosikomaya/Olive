import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Footer from './Footer';
import Menu from './Menu';
import MealPlan from './MealPlan';
import Register from './Register';
import Login from './Login';
import AdminDashboard from './AdminDashboard';
import MainMeals from './MainMeals';
import ChefsSpecial from './ChefsSpecial';
import Breakfast from './Breakfast';
import Sides from './Sides';
import Sauces from './Sauces';
import Salads from './Salads';
import YoghurtBowls from './YoghurtBowls';
import FreshDrinks from './FreshDrinks';
import OatMealBowls from './OatMealBowls';
import PlaceOrder from './PlaceOrder';
import MealPlanDetail from './MealPlanDetail';
import MealPlanCategories from './MealPlanCategories';
import OrderSummary from './OrderSummary';
import UserDashboard from './UserDashboard';
import About from './About';
import Terms from './Terms';
import Privacy from './Privacy';
import NotFound from './NotFound';
import BackToTop from './BackToTop';
import { AuthProvider, useAuth } from './AuthContext';

const path = window.location.pathname;

const pageTitles = {
    '/':                          'Olive Dine — Healthy Meals Delivered',
    '/menu':                      'Our Menu | Olive Dine',
    '/meal-plan':                 'Meal Plans | Olive Dine',
    '/meal-plan/weight-loss':     'Weight Loss Plan | Olive Dine',
    '/meal-plan/gut-health':      'Gut Health Plan | Olive Dine',
    '/meal-plan/anti-inflammatory': 'Anti-Inflammatory Plan | Olive Dine',
    '/meal-plan/weight-gain':     'Weight Gain Plan | Olive Dine',
    '/meal-plan/categories':      'Menu Categories | Olive Dine',
    '/main-meals':                'Main Meals | Olive Dine',
    '/chefs-special':             "Chef's Special | Olive Dine",
    '/breakfast':                 'Breakfast | Olive Dine',
    '/sides':                     'Sides | Olive Dine',
    '/sauces':                    'Sauces | Olive Dine',
    '/salads':                    'Salads | Olive Dine',
    '/yoghurt-bowls':             'Yoghurt Bowls | Olive Dine',
    '/fresh-drinks':              'Fresh Drinks | Olive Dine',
    '/oat-meal-bowls':            'Oatmeal Bowls | Olive Dine',
    '/place-order':               'Place Order | Olive Dine',
    '/order-summary':             'Order Summary | Olive Dine',
    '/about':                     'About Us | Olive Dine',
    '/terms':                     'Terms of Use | Olive Dine',
    '/privacy':                   'Privacy Policy | Olive Dine',
    '/login':                     'Login | Olive Dine',
    '/register':                  'Sign Up | Olive Dine',
    '/dashboard':                 'My Dashboard | Olive Dine',
    '/admin':                     'Admin | Olive Dine',
};

function GuardedRoute({ children, adminOnly = false }) {
    const { user } = useAuth();
    if (!user) {
        sessionStorage.setItem('olive_intended', path);
        window.location.href = '/login';
        return null;
    }
    if (adminOnly && user.role !== 'admin' && user.role !== 'superadmin') {
        window.location.href = '/dashboard';
        return null;
    }
    return children;
}

function Routes() {
    const { user, logout } = useAuth();

    useEffect(() => {
        // Set page title
        document.title = pageTitles[path] || 'Olive Dine';
        // Scroll to top on every route
        window.scrollTo(0, 0);
    }, []);

    if (path === '/register')    return <Register />;
    if (path === '/login')       return <Login />;
    if (path === '/about')       return <About />;
    if (path === '/terms')       return <Terms />;
    if (path === '/privacy')     return <Privacy />;
    if (path === '/admin')       return <GuardedRoute adminOnly><AdminDashboard /></GuardedRoute>;
    if (path === '/dashboard')   return <GuardedRoute><UserDashboard /></GuardedRoute>;
    if (path === '/menu')        return <Menu />;
    if (path === '/main-meals')  return <MainMeals />;
    if (path === '/chefs-special') return <ChefsSpecial />;
    if (path === '/breakfast')   return <Breakfast />;
    if (path === '/sides')       return <Sides />;
    if (path === '/sauces')      return <Sauces />;
    if (path === '/salads')      return <Salads />;
    if (path === '/yoghurt-bowls') return <YoghurtBowls />;
    if (path === '/fresh-drinks') return <FreshDrinks />;
    if (path === '/oat-meal-bowls') return <OatMealBowls />;
    if (path === '/place-order') return <GuardedRoute><PlaceOrder /></GuardedRoute>;
    if (path === '/order-summary') return <GuardedRoute><OrderSummary /></GuardedRoute>;
    if (path === '/meal-plan/weight-loss') return <GuardedRoute><MealPlanDetail plan="weight-loss" /></GuardedRoute>;
    if (path === '/meal-plan/gut-health') return <GuardedRoute><MealPlanDetail plan="gut-health" /></GuardedRoute>;
    if (path === '/meal-plan/anti-inflammatory') return <GuardedRoute><MealPlanDetail plan="anti-inflammatory" /></GuardedRoute>;
    if (path === '/meal-plan/weight-gain') return <GuardedRoute><MealPlanDetail plan="weight-gain" /></GuardedRoute>;
    if (path === '/meal-plan')   return <MealPlan />;
    if (path === '/meal-plan/categories') return <MealPlanCategories />;

    if (path === '/') return (
        <div className="min-h-screen">
            <Navbar user={user} onLogout={logout} />
            <Hero />
            <Footer />
        </div>
    );

    return <NotFound />;
}

export default function App() {
    return (
        <AuthProvider>
            <Routes />
            <BackToTop />
        </AuthProvider>
    );
}

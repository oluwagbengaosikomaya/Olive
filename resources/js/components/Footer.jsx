import React from 'react';

const galleryImages = [
    '/storage/olive/1.jpg',
    '/storage/olive/2.jpg',
    '/storage/olive/3.jpg',
    '/storage/olive/4.jpg',
    '/storage/olive/5.jpg',
    '/storage/olive/6.jpg',
];

const fallbackImages = [
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=200&h=200&fit=crop',
];

function GalleryImg({ src, fallback, alt }) {
    return (
        <img
            src={src}
            alt={alt}
            onError={e => { e.target.onerror = null; e.target.src = fallback; }}
        />
    );
}

export default function Footer() {
    return (
        <footer className="footer">
            {/* Delivery notice */}
            <div className="footer-delivery-bar">
                📍 Currently delivering within <strong>Lagos Island & Mainland</strong> — Order by 8pm for next-day delivery.
            </div>

            <div className="footer-inner">
                <div className="footer-col">
                    <h4>QUICK LINKS</h4>
                    <div className="footer-divider"></div>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/menu">Menu</a></li>
                        <li><a href="/meal-plan">Meal Plan</a></li>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/place-order">Place Order</a></li>
                        <li><a href="/terms">Terms of Use</a></li>
                        <li><a href="/privacy">Privacy Policy</a></li>
                    </ul>
                </div>

                <div className="footer-col footer-center">
                    <div className="footer-logo">Olive<span>***</span>Dine</div>
                    <p>Delivering nutritious, chef-crafted meals and personalized meal plans directly to your door — making healthy eating effortless.</p>
                    <strong>Make Orders Here</strong>
                    <div className="footer-divider-center"></div>
                    <div className="footer-socials">
                        <a href="https://instagram.com/olivedine" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>
                        </a>
                        <a href="https://wa.me/2348000000000" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.845L0 24l6.335-1.508A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.8 9.8 0 01-5.003-1.368l-.36-.214-3.76.895.952-3.653-.234-.374A9.786 9.786 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/></svg>
                        </a>
                        <a href="https://facebook.com/olivedine" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>
                        </a>
                        <a href="mailto:hello@olivedine.com" aria-label="Email">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                        </a>
                    </div>
                </div>

                <div className="footer-col footer-gallery">
                    <h4>LATEST GALLERY</h4>
                    <div className="footer-divider"></div>
                    <div className="gallery-grid">
                        {galleryImages.map((src, i) => (
                            <GalleryImg key={i} src={src} fallback={fallbackImages[i]} alt={`Olive Dine dish ${i + 1}`} />
                        ))}
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} Olive Dine. All rights reserved.</p>
            </div>
        </footer>
    );
}

"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Header.module.css';
import AuthModal from './AuthModal';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [currentOffer, setCurrentOffer] = useState(0);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const { getCartCount, openCart } = useCart();
  const { user, logout, isLoggedIn } = useAuth();
  const cartCount = getCartCount();

  const offers = [
    { text: "Free shipping over $50", highlight: "Free" },
    { text: "Holiday Sale! Get 25% OFF on all products", highlight: "25% OFF" },
    { text: "Use code LUXURY25 for exclusive discount", highlight: "LUXURY25" },
    { text: "New arrivals added - Shop now!", highlight: "New arrivals" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
        setShowBanner(false);
      } else {
        setScrolled(false);
        setShowBanner(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-rotate offers every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOffer((prev) => (prev + 1) % offers.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [offers.length]);

  // Listen for openAuthModal event
  useEffect(() => {
    const handleOpenAuth = () => setShowAuthModal(true);
    window.addEventListener('openAuthModal', handleOpenAuth);
    return () => window.removeEventListener('openAuthModal', handleOpenAuth);
  }, []);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(`.${styles.userDropdown}`)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const nextOffer = () => {
    setCurrentOffer((prev) => (prev + 1) % offers.length);
  };

  const prevOffer = () => {
    setCurrentOffer((prev) => (prev - 1 + offers.length) % offers.length);
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  // Highlight the special word in the offer text
  const renderOfferText = (text, highlight) => {
    const parts = text.split(highlight);
    return (
      <>
        {parts[0]}
        <span className={styles.highlight}>{highlight}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <>
      {/* Sale Banner */}
      <div className={`${styles.saleBanner} ${showBanner ? styles.bannerVisible : styles.bannerHidden}`}>
        <button
          className={styles.bannerArrow}
          onClick={prevOffer}
          aria-label="Previous offer"
        >
          <i className="fas fa-chevron-left"></i>
        </button>

        <div className={styles.bannerContent}>
          <p key={currentOffer} className={styles.bannerText}>
            {renderOfferText(offers[currentOffer].text, offers[currentOffer].highlight)}
          </p>
        </div>

        <button
          className={styles.bannerArrow}
          onClick={nextOffer}
          aria-label="Next offer"
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>

      {/* Main Header */}
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''} ${!showBanner ? styles.noBanner : ''}`}>
        <Link href="/" className={styles.logo}>Essence of You</Link>
        <nav className={styles.nav}>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/shop">Shop</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/customize-perfume">Customize Perfume</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </nav>
        <div className={styles.icons}>
          {isLoggedIn() ? (
            <div className={styles.userDropdown}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowUserMenu(!showUserMenu);
                }}
                className={styles.userBtn}
              >
                <span className={styles.userInitial}>
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
                <span className={styles.userName}>{user?.name?.split(' ')[0]}</span>
                <i className={`fas fa-chevron-down ${styles.chevron} ${showUserMenu ? styles.rotated : ''}`}></i>
              </button>
              {showUserMenu && (
                <div className={styles.dropdownMenu}>
                  <div className={styles.dropdownHeader}>
                    <p className={styles.welcomeText}>Welcome back,</p>
                    <p className={styles.fullName}>{user?.name}</p>
                  </div>
                  <div className={styles.dropdownDivider}></div>
                  <Link href="/track-order" className={styles.dropdownItem} onClick={() => setShowUserMenu(false)}>
                    <i className="fas fa-truck"></i> Track Order
                  </Link>
                  <button onClick={handleLogout} className={styles.dropdownItem}>
                    <i className="fas fa-sign-out-alt"></i> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button onClick={() => setShowAuthModal(true)} className={styles.iconLink}>
              <i className="fas fa-user"></i>
            </button>
          )}
          <button onClick={openCart} className={styles.iconLink}>
            <i className="fas fa-shopping-bag"></i>
            {cartCount > 0 && (
              <span className={styles.cartBadge}>{cartCount}</span>
            )}
          </button>
        </div>
      </header>

      {/* Auth Modal */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
}
"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Header.module.css';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [currentOffer, setCurrentOffer] = useState(0);

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
        setShowBanner(false); // Hide banner when scrolled
      } else {
        setScrolled(false);
        setShowBanner(true); // Show banner at top
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

  const nextOffer = () => {
    setCurrentOffer((prev) => (prev + 1) % offers.length);
  };

  const prevOffer = () => {
    setCurrentOffer((prev) => (prev - 1 + offers.length) % offers.length);
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
            {/* <li><Link href="/">Home</Link></li> */}
            <li><Link href="/about">About</Link></li>
            <li><Link href="/customize-perfume">Customize Perfume</Link></li>
            <li><Link href="/cleaners">Cleaners</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </nav>
        <div className={styles.icons}>
          <i className="fas fa-user"></i>
          <i className="fas fa-shopping-bag"></i>
        </div>
      </header>
    </>
  );
}
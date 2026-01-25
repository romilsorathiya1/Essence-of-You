"use client";
import { useEffect, useState } from 'react';
import styles from '../../styles/Shop.module.css';
import { useCart } from '../../context/CartContext';

export default function Shop() {
    const [showScrollTop, setShowScrollTop] = useState(false);
    const { addToCart } = useCart();

    // Perfume products data
    const perfumes = [
        {
            id: 1,
            name: "Velvet Rose",
            description: "A captivating floral symphony with notes of Bulgarian rose, peony, and a whisper of musk",
            price: "$129.00",
            image: "/velvet_rose_perfume_1769330071219.png",
            tag: "Bestseller",
            category: "Floral"
        },
        {
            id: 2,
            name: "Midnight Oud",
            description: "Rich and mysterious blend of rare oud, smoky incense, and warm amber undertones",
            price: "$189.00",
            image: "/midnight_oud_perfume_1769330087254.png",
            tag: "Premium",
            category: "Woody"
        },
        {
            id: 3,
            name: "Golden Citrus",
            description: "Vibrant burst of Sicilian bergamot, blood orange, and sparkling grapefruit",
            price: "$99.00",
            image: "/golden_citrus_perfume_1769330106564.png",
            tag: "Fresh",
            category: "Citrus"
        },
        {
            id: 4,
            name: "Ocean Breeze",
            description: "Refreshing aquatic notes mingled with sea salt, driftwood, and white tea",
            price: "$109.00",
            image: "/ocean_breeze_perfume_1769330121501.png",
            tag: "New",
            category: "Aquatic"
        },
        {
            id: 5,
            name: "Mystic Amber",
            description: "Exotic warmth of golden amber, saffron, and vanilla orchid",
            price: "$149.00",
            image: "/mystic_amber_perfume_1769330136896.png",
            tag: "Signature",
            category: "Oriental"
        },
        {
            id: 6,
            name: "Lavender Dream",
            description: "Calming French lavender with hints of chamomile and soft sandalwood",
            price: "$119.00",
            image: "/lavender_dream_perfume_1769330153486.png",
            tag: "Relaxing",
            category: "Herbal"
        }
    ];

    // Scroll to Top Logic
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 500) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Intersection Observer for Reveal Animation
    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -80px 0px"
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const elements = document.querySelectorAll('.reveal');
        elements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    // Add to Cart Handler
    const handleAddToCart = (e, product) => {
        e.preventDefault();
        addToCart(product);

        const btn = e.currentTarget;
        const originalText = btn.innerText;
        btn.innerText = "✓ Added!";
        btn.style.backgroundColor = "white";
        btn.style.color = "#1B3B36";

        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.backgroundColor = "";
            btn.style.color = "";
        }, 1500);
    };

    return (
        <>
            {/* Hero Section */}
            <section className={styles.shopHero}>
                <div className={styles.heroOverlay}></div>
                <div className={styles.heroContent}>
                    <span className={styles.heroLabel}>Luxury Perfumes</span>
                    <h1>Our Exclusive Collection</h1>
                    <p>Discover your signature scent from our curated selection of premium fragrances, each crafted with the finest ingredients from around the world</p>
                    <div className={styles.heroDivider}></div>
                </div>
            </section>

            {/* Products Section */}
            <section className={styles.productsSection}>
                <div className={`${styles.sectionHeader} reveal`}>
                    <span className={styles.sectionLabel}>Shop Perfumes</span>
                    <h2>Signature Fragrances</h2>
                    <div className={styles.divider}></div>
                    <p>Each perfume is a masterpiece, composed by world-renowned perfumers using only the finest natural ingredients</p>
                </div>

                <div className={styles.productGrid}>
                    {perfumes.map((perfume) => (
                        <div key={perfume.id} className={`${styles.productCard} reveal`}>
                            <div className={styles.productImg}>
                                <span className={styles.tag}>{perfume.tag}</span>
                                <span className={styles.category}>{perfume.category}</span>
                                <img src={perfume.image} alt={perfume.name} />
                            </div>
                            <div className={styles.productDetails}>
                                <h3>{perfume.name}</h3>
                                <p>{perfume.description}</p>
                                <div className={styles.priceRow}>
                                    <span className={styles.price}>{perfume.price}</span>
                                    <button className={styles.addBtn} onClick={(e) => handleAddToCart(e, perfume)}>
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Why Shop With Us Section */}
            <section className={styles.trustSection}>
                <div className={`${styles.sectionHeader} reveal`}>
                    <span className={styles.sectionLabel}>Why Choose Us</span>
                    <h2>The Essence of You Promise</h2>
                    <div className={styles.divider}></div>
                    <p>Experience the finest in luxury perfumery with unmatched service and quality</p>
                </div>

                <div className={styles.trustGrid}>
                    <div className={`${styles.trustCard} reveal`}>
                        <div className={styles.trustIcon}>
                            <i className="fas fa-gem"></i>
                        </div>
                        <h3>Premium Quality</h3>
                        <p>Every fragrance is crafted using the finest natural ingredients sourced from around the world</p>
                    </div>
                    <div className={`${styles.trustCard} reveal`}>
                        <div className={styles.trustIcon}>
                            <i className="fas fa-leaf"></i>
                        </div>
                        <h3>100% Cruelty-Free</h3>
                        <p>All our perfumes are vegan and never tested on animals. Beauty without compromise</p>
                    </div>
                    <div className={`${styles.trustCard} reveal`}>
                        <div className={styles.trustIcon}>
                            <i className="fas fa-clock"></i>
                        </div>
                        <h3>Long-Lasting</h3>
                        <p>Our Eau de Parfum formula ensures 8-10 hours of captivating scent throughout your day</p>
                    </div>
                    <div className={`${styles.trustCard} reveal`}>
                        <div className={styles.trustIcon}>
                            <i className="fas fa-flask"></i>
                        </div>
                        <h3>Expert Crafted</h3>
                        <p>Created by master perfumers from Grasse, France with decades of expertise</p>
                    </div>
                </div>
            </section>

            {/* Fragrance Guide Section */}
            <section className={styles.guideSection}>
                <div className={styles.guideContent}>
                    <div className={`${styles.guideText} reveal`}>
                        <span className={styles.sectionLabel}>Fragrance Guide</span>
                        <h2>Find Your Perfect Scent</h2>
                        <div className={styles.guideDivider}></div>
                        <p>Choosing a fragrance is a personal journey. Our collection spans across multiple scent families, each designed to evoke different emotions and complement various occasions.</p>
                        <p className={styles.guideHighlight}>Whether you prefer the romantic allure of florals, the grounding warmth of woods, or the invigorating freshness of citrus—we have a scent that speaks to your soul.</p>

                        <div className={styles.scentFamilies}>
                            <span className={styles.scentTag}>Floral</span>
                            <span className={styles.scentTag}>Woody</span>
                            <span className={styles.scentTag}>Citrus</span>
                            <span className={styles.scentTag}>Oriental</span>
                            <span className={styles.scentTag}>Aquatic</span>
                            <span className={styles.scentTag}>Herbal</span>
                        </div>

                        <button className="btn">Take the Quiz</button>
                    </div>
                    <div className={`${styles.guideImage} reveal`}>
                        <div className={styles.imageFrame}></div>
                        <img src="/assets/pc1.png" alt="Fragrance Guide" />
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className={styles.faq}>
                <div className="text-center reveal">
                    <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
                    <div className={styles.divider}></div>
                </div>

                <details className={`${styles.faqDetails} reveal`}>
                    <summary className={styles.faqSummary}>How long does shipping take?</summary>
                    <p>Standard shipping takes 3-5 business days within the US. Express shipping (1-2 days) is available at checkout. International orders typically arrive within 7-14 business days.</p>
                </details>

                <details className={`${styles.faqDetails} reveal`}>
                    <summary className={styles.faqSummary}>What is your return policy?</summary>
                    <p>We offer a 30-day satisfaction guarantee. If you're not completely happy with your purchase, you can return any unopened product for a full refund. Opened products can be exchanged for store credit.</p>
                </details>

                <details className={`${styles.faqDetails} reveal`}>
                    <summary className={styles.faqSummary}>Are your perfumes authentic and long-lasting?</summary>
                    <p>Absolutely. All our perfumes are crafted with 20% fragrance oil concentration (Eau de Parfum), ensuring exceptional longevity of 6-8 hours on skin and up to 24 hours on fabric. Each bottle comes with a certificate of authenticity.</p>
                </details>

                <details className={`${styles.faqDetails} reveal`}>
                    <summary className={styles.faqSummary}>Do you offer gift wrapping?</summary>
                    <p>Yes! We offer complimentary luxury gift wrapping on all orders. Simply select the gift option at checkout and include a personalized message for your recipient.</p>
                </details>
            </section>

            {/* CTA Section */}
            <section className={styles.ctaSection}>
                <div className={`${styles.ctaContent} reveal`}>
                    <span className={styles.ctaLabel}>Create Something Unique</span>
                    <h2>Design Your Custom Fragrance</h2>
                    <p>Can't find your perfect match? Create a bespoke perfume that's uniquely yours with our custom fragrance service.</p>
                    <a href="/customize-perfume" className="btn">Start Creating</a>
                </div>
            </section>

            {/* Scroll to Top Button */}
            <button
                className={`${styles.scrollTop} ${showScrollTop ? styles.show : ''}`}
                onClick={scrollToTop}
                id="scrollTop"
            >
                <i className="fas fa-arrow-up"></i>
            </button>
        </>
    );
}

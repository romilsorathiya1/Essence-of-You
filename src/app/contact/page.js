"use client";
import { useState, useEffect } from 'react';
import styles from '../../styles/Contact.module.css';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            });
        }, 1500);
    };

    // Reveal animation
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

    return (
        <>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <span className={styles.heroLabel}>Get In Touch</span>
                    <h1>We'd Love to Hear From You</h1>
                    <p>Have questions about our products? We're here to help</p>
                </div>
            </section>

            {/* Contact Section */}
            <section className={styles.contactSection}>
                {/* Full Width Header */}
                <div className={`${styles.contactHeader} reveal`}>
                    <span className={styles.sectionLabel}>Contact Info</span>
                    <h2>Let's Start a Conversation</h2>
                    <div className={styles.divider}></div>
                    <p>Whether you have a question about our perfumes, custom orders, or anything else, our team is ready to answer all your questions.</p>
                </div>

                {/* Form and Contact Cards Side by Side */}
                <div className={styles.contactGrid}>
                    {/* Contact Form */}
                    <div className={`${styles.contactForm} reveal`}>
                        {!isSubmitted ? (
                            <form onSubmit={handleSubmit}>
                                <h3>Send Us a Message</h3>
                                <div className={styles.divider}></div>

                                <div className={styles.formRow}>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="name">Full Name *</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Enter your name"
                                            required
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="email">Email *</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Enter your email"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className={styles.formRow}>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="phone">Phone Number</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="Enter your phone"
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="subject">Subject *</label>
                                        <select
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Select a subject</option>
                                            <option value="custom-perfume">Custom Perfume Inquiry</option>

                                            <option value="order">Order Status</option>
                                            <option value="wholesale">Wholesale/Bulk Order</option>
                                            <option value="feedback">Feedback</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="message">Message *</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="How can we help you?"
                                        rows="5"
                                        required
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className={styles.submitBtn}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <i className="fas fa-spinner fa-spin"></i> Sending...
                                        </>
                                    ) : (
                                        <>
                                            <i className="fas fa-paper-plane"></i> Send Message
                                        </>
                                    )}
                                </button>
                            </form>
                        ) : (
                            <div className={styles.successMessage}>
                                <div className={styles.successIcon}>
                                    <i className="fas fa-check-circle"></i>
                                </div>
                                <h2>Thank You!</h2>
                                <p>Your message has been sent successfully. We'll get back to you within 24 hours.</p>
                                <button
                                    className={styles.resetBtn}
                                    onClick={() => setIsSubmitted(false)}
                                >
                                    Send Another Message
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Contact Info Cards */}
                    <div className={`${styles.contactCards} reveal`}>
                        <div className={styles.infoCard}>
                            <div className={styles.infoIcon}>
                                <i className="fas fa-envelope"></i>
                            </div>
                            <div className={styles.infoContent}>
                                <h3>Email Us</h3>
                                <p>hello@essenceofyou.com</p>
                                <p>support@essenceofyou.com</p>
                            </div>
                        </div>
                        <div className={styles.infoCard}>
                            <div className={styles.infoIcon}>
                                <i className="fas fa-phone-alt"></i>
                            </div>
                            <div className={styles.infoContent}>
                                <h3>Call Us</h3>
                                <p>+91 98765 43210</p>
                                <p>Mon - Sat: 9AM - 7PM</p>
                            </div>
                        </div>
                        <div className={styles.infoCard}>
                            <div className={styles.infoIcon}>
                                <i className="fab fa-whatsapp"></i>
                            </div>
                            <div className={styles.infoContent}>
                                <h3>WhatsApp</h3>
                                <p>+91 98765 43210</p>
                                <p>Quick responses!</p>
                            </div>
                        </div>

                        <div className={styles.socialLinks}>
                            <h3>Follow Us</h3>
                            <div className={styles.socialIcons}>
                                <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                                <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                                <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                                <a href="#" aria-label="Pinterest"><i className="fab fa-pinterest"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className={styles.faqSection}>
                <div className={`${styles.faqHeader} reveal`}>
                    <span className={styles.sectionLabel}>FAQ</span>
                    <h2>Frequently Asked Questions</h2>
                    <div className={styles.divider}></div>
                </div>

                <div className={styles.faqGrid}>
                    <div className={`${styles.faqCard} reveal`}>
                        <h3>How long does shipping take?</h3>
                        <p>Standard shipping takes 5-7 business days. Express shipping is available for 2-3 day delivery.</p>
                    </div>
                    <div className={`${styles.faqCard} reveal`}>
                        <h3>Can I return a product?</h3>
                        <p>Yes! We offer 30-day hassle-free returns for unused products in original packaging.</p>
                    </div>
                    <div className={`${styles.faqCard} reveal`}>
                        <h3>How do custom perfumes work?</h3>
                        <p>Take our quiz, receive 3 samples, pick your favorite, and we create your full-size bottle.</p>
                    </div>
                    <div className={`${styles.faqCard} reveal`}>
                        <h3>Are your perfumes cruelty-free?</h3>
                        <p>Yes! All our perfumes are 100% cruelty-free and vegan. We never test on animals.</p>
                    </div>

                </div>
            </section>
        </>
    );
}

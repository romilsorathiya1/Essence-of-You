"use client";
import { useEffect } from 'react';
import styles from '../../styles/About.module.css';

export default function About() {
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

    return (
        <>
            {/* Hero Section */}
            <section className={styles.aboutHero}>
                <div className={styles.heroContent}>
                    <span className={styles.heroLabel}>Who We Are</span>
                    <h1>The Art of Scented Living</h1>
                    <p>Discover the philosophy behind our luxurious creations and the passion that drives every product</p>
                </div>
            </section>

            {/* Our Philosophy Section */}
            <section className={styles.storySection}>
                <div className={styles.storyContent}>
                    <div className={`${styles.storyText} reveal`}>
                        <span className={styles.sectionLabel}>Our Philosophy</span>
                        <h2>Born from Passion, Crafted with Purpose</h2>
                        <div className={styles.divider}></div>
                        <p>Every fragrance we create tells a story. Essence of You was founded on the belief that beautiful scents shouldn't be limited to perfume bottles—they should infuse every aspect of your life, from your skin to your living spaces.</p>
                        <p>We source the finest ingredients from around the world, working directly with sustainable farms and artisan distillers to bring you products that are as kind to the earth as they are luxurious to experience.</p>
                    </div>
                    <div className={`${styles.storyImage} reveal`}>
                        <div className={styles.imageFrame}></div>
                        <img src="/assets/pc1.png" alt="Luxury Products" />
                    </div>
                </div>
            </section>

            {/* What Drives Us Section */}
            <section className={styles.missionSection}>
                <div className={`${styles.missionContent} reveal`}>
                    <span className={styles.sectionLabel}>What Drives Us</span>
                    <h2>Creating Moments of Luxury</h2>
                    <div className={styles.divider}></div>
                    <p>We envision a world where everyday moments become extraordinary experiences. Our mission is to bring the sophistication of haute parfumerie into your daily rituals, making the ordinary feel exceptional.</p>
                </div>

                <div className={styles.valuesGrid}>
                    <div className={`${styles.valueCard} reveal`}>
                        <div className={styles.valueIcon}>
                            <i className="fas fa-seedling"></i>
                        </div>
                        <h3>Purity</h3>
                        <p>We use only natural, ethically-sourced ingredients free from harmful chemicals</p>
                    </div>
                    <div className={`${styles.valueCard} reveal`}>
                        <div className={styles.valueIcon}>
                            <i className="fas fa-palette"></i>
                        </div>
                        <h3>Artistry</h3>
                        <p>Each scent is a masterpiece, composed by world-renowned perfumers</p>
                    </div>
                    <div className={`${styles.valueCard} reveal`}>
                        <div className={styles.valueIcon}>
                            <i className="fas fa-globe-americas"></i>
                        </div>
                        <h3>Responsibility</h3>
                        <p>Zero-waste packaging and carbon-neutral production processes</p>
                    </div>
                    <div className={`${styles.valueCard} reveal`}>
                        <div className={styles.valueIcon}>
                            <i className="fas fa-handshake"></i>
                        </div>
                        <h3>Integrity</h3>
                        <p>Transparent practices and fair partnerships with all our suppliers</p>
                    </div>
                </div>
            </section>

            {/* By The Numbers Section */}
            <section className={styles.statsSection}>
                <div className={styles.statsOverlay}></div>
                <div className={styles.statsContent}>
                    <h2 className="reveal">Our Impact in Numbers</h2>
                    <div className={styles.statsGrid}>
                        <div className={`${styles.statCard} reveal`}>
                            <h3>50+</h3>
                            <p>Unique Scents</p>
                        </div>
                        <div className={`${styles.statCard} reveal`}>
                            <h3>25</h3>
                            <p>Countries Served</p>
                        </div>
                        <div className={`${styles.statCard} reveal`}>
                            <h3>98%</h3>
                            <p>Natural Ingredients</p>
                        </div>
                        <div className={`${styles.statCard} reveal`}>
                            <h3>20K+</h3>
                            <p>Satisfied Clients</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* The Experts Section */}
            <section className={styles.teamSection}>
                <div className={`${styles.teamHeader} reveal`}>
                    <span className={styles.sectionLabel}>Meet The Creators</span>
                    <h2>Visionaries of Scent</h2>
                    <div className={styles.divider}></div>
                    <p>Behind every bottle is a team of dedicated artisans who blend tradition with innovation to craft unforgettable experiences.</p>
                </div>

                <div className={styles.teamGrid}>
                    <div className={`${styles.teamCard} reveal`}>
                        <div className={styles.teamImage}>
                            <img src="/assets/team-1.jpg" alt="Team Member" />
                        </div>
                        <h3>Marie Laurent</h3>
                        <span>Lead Perfumer</span>
                        <p>Trained in Grasse, bringing 30 years of olfactory artistry</p>
                    </div>
                    <div className={`${styles.teamCard} reveal`}>
                        <div className={styles.teamImage}>
                            <img src="/assets/team-2.jpg" alt="Team Member" />
                        </div>
                        <h3>Dr. James Chen</h3>
                        <span>Research Director</span>
                        <p>Pioneering sustainable extraction methods</p>
                    </div>
                    <div className={`${styles.teamCard} reveal`}>
                        <div className={styles.teamImage}>
                            <img src="/assets/team-3.jpg" alt="Team Member" />
                        </div>
                        <h3>Sofia Rodriguez</h3>
                        <span>Creative Director</span>
                        <p>Curating visual experiences that match our scents</p>
                    </div>
                </div>
            </section>

            {/* Milestones Section - Fixed Timeline */}
            <section className={styles.journeySection}>
                <div className={`${styles.journeyHeader} reveal`}>
                    <span className={styles.sectionLabel}>Our Milestones</span>
                    <h2>A Journey of Excellence</h2>
                    <div className={styles.divider}></div>
                </div>

                <div className={styles.timeline}>
                    <div className={`${styles.timelineItem} ${styles.timelineRight} reveal`}>
                        <div className={styles.timelineMarker}>
                            <span className={styles.timelineYear}>2021</span>
                        </div>
                        <div className={styles.timelineContent}>
                            <h3>The Vision</h3>
                            <p>The idea was born – to create a brand that brings luxury scents into everyday life</p>
                        </div>
                    </div>
                    <div className={`${styles.timelineItem} ${styles.timelineLeft} reveal`}>
                        <div className={styles.timelineMarker}>
                            <span className={styles.timelineYear}>2022</span>
                        </div>
                        <div className={styles.timelineContent}>
                            <h3>Research & Development</h3>
                            <p>Began extensive research on natural ingredients and sustainable formulations</p>
                        </div>
                    </div>
                    <div className={`${styles.timelineItem} ${styles.timelineRight} reveal`}>
                        <div className={styles.timelineMarker}>
                            <span className={styles.timelineYear}>2023</span>
                        </div>
                        <div className={styles.timelineContent}>
                            <h3>Perfecting the Craft</h3>
                            <p>Collaborated with expert perfumers to develop our signature scent collections</p>
                        </div>
                    </div>
                    <div className={`${styles.timelineItem} ${styles.timelineLeft} reveal`}>
                        <div className={styles.timelineMarker}>
                            <span className={styles.timelineYear}>2024</span>
                        </div>
                        <div className={styles.timelineContent}>
                            <h3>Product Testing</h3>
                            <p>Rigorous testing and refinement to ensure premium quality and safety standards</p>
                        </div>
                    </div>
                    <div className={`${styles.timelineItem} ${styles.timelineRight} reveal`}>
                        <div className={styles.timelineMarker}>
                            <span className={styles.timelineYear}>2025</span>
                        </div>
                        <div className={styles.timelineContent}>
                            <h3>Final Preparations</h3>
                            <p>Building our brand identity, packaging design, and preparing for global launch</p>
                        </div>
                    </div>
                    <div className={`${styles.timelineItem} ${styles.timelineLeft} reveal`}>
                        <div className={styles.timelineMarker}>
                            <span className={styles.timelineYear}>2026</span>
                        </div>
                        <div className={styles.timelineContent}>
                            <h3>Grand Launch</h3>
                            <p>Essence of You officially launches – bringing luxury scented living to the world</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className={styles.ctaSection}>
                <div className={`${styles.ctaContent} reveal`}>
                    <h2>Begin Your Scented Journey</h2>
                    <p>Experience the difference that true luxury makes</p>
                    <button className="btn">Shop Our Collection</button>
                </div>
            </section>
        </>
    );
}

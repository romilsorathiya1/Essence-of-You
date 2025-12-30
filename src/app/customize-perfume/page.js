"use client";
import { useState, useEffect } from 'react';
import styles from '../../styles/CustomizePerfume.module.css';

export default function CustomizePerfume() {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [isComplete, setIsComplete] = useState(false);
    const [showProcess, setShowProcess] = useState(true);

    const questions = [
        {
            id: 'occasion',
            category: 'Scent',
            question: 'What occasion is this perfume for?',
            options: [
                { value: 'daily', label: 'Daily Wear', icon: 'fas fa-sun', desc: 'Light & refreshing for everyday' },
                { value: 'office', label: 'Professional', icon: 'fas fa-briefcase', desc: 'Subtle & sophisticated' },
                { value: 'evening', label: 'Evening Events', icon: 'fas fa-moon', desc: 'Bold & captivating' },
                { value: 'special', label: 'Special Occasions', icon: 'fas fa-gem', desc: 'Memorable & unique' }
            ]
        },
        {
            id: 'mood',
            category: 'Scent',
            question: 'What mood do you want to express?',
            options: [
                { value: 'confident', label: 'Confident', icon: 'fas fa-crown', desc: 'Strong & empowering' },
                { value: 'romantic', label: 'Romantic', icon: 'fas fa-heart', desc: 'Sensual & alluring' },
                { value: 'fresh', label: 'Fresh & Energetic', icon: 'fas fa-leaf', desc: 'Vibrant & uplifting' },
                { value: 'calm', label: 'Calm & Relaxed', icon: 'fas fa-spa', desc: 'Peaceful & soothing' }
            ]
        },
        {
            id: 'scent_family',
            category: 'Scent',
            question: 'Which scent family appeals to you most?',
            options: [
                { value: 'floral', label: 'Floral', icon: 'fas fa-seedling', desc: 'Rose, Jasmine, Lavender' },
                { value: 'woody', label: 'Woody', icon: 'fas fa-tree', desc: 'Sandalwood, Cedar, Oud' },
                { value: 'citrus', label: 'Citrus', icon: 'fas fa-lemon', desc: 'Bergamot, Orange, Lemon' },
                { value: 'oriental', label: 'Oriental', icon: 'fas fa-fire', desc: 'Vanilla, Amber, Spices' }
            ]
        },
        {
            id: 'intensity',
            category: 'Scent',
            question: 'How intense should your fragrance be?',
            options: [
                { value: 'light', label: 'Light & Subtle', icon: 'fas fa-feather', desc: 'Whisper-soft presence' },
                { value: 'moderate', label: 'Moderate', icon: 'fas fa-balance-scale', desc: 'Balanced projection' },
                { value: 'strong', label: 'Strong', icon: 'fas fa-bolt', desc: 'Makes a statement' },
                { value: 'intense', label: 'Very Intense', icon: 'fas fa-fire-alt', desc: 'Unforgettable trail' }
            ]
        },
        {
            id: 'bottle_style',
            category: 'Bottle',
            question: 'Choose your bottle style',
            options: [
                { value: 'classic', label: 'Classic Elegance', icon: 'fas fa-wine-bottle', desc: 'Timeless rectangular design' },
                { value: 'round', label: 'Soft & Round', icon: 'fas fa-circle', desc: 'Curved, feminine shape' },
                { value: 'modern', label: 'Modern Minimal', icon: 'fas fa-cube', desc: 'Clean geometric lines' },
                { value: 'vintage', label: 'Vintage Luxe', icon: 'fas fa-gem', desc: 'Ornate, antique-inspired' }
            ]
        },
        {
            id: 'bottle_color',
            category: 'Bottle',
            question: 'Select your bottle color',
            options: [
                { value: 'clear', label: 'Crystal Clear', icon: 'fas fa-tint', desc: 'Transparent glass' },
                { value: 'gold', label: 'Golden', icon: 'fas fa-star', desc: 'Luxurious gold tint' },
                { value: 'black', label: 'Noir Black', icon: 'fas fa-moon', desc: 'Mysterious dark glass' },
                { value: 'rose', label: 'Rose Pink', icon: 'fas fa-heart', desc: 'Soft romantic pink' }
            ]
        },
        {
            id: 'cap_style',
            category: 'Bottle',
            question: 'Pick your cap design',
            options: [
                { value: 'gold_metal', label: 'Gold Metal', icon: 'fas fa-crown', desc: 'Premium metallic finish' },
                { value: 'silver_metal', label: 'Silver Metal', icon: 'fas fa-gem', desc: 'Sleek chrome finish' },
                { value: 'crystal', label: 'Crystal Top', icon: 'fas fa-diamond', desc: 'Elegant crystal accent' },
                { value: 'wood', label: 'Natural Wood', icon: 'fas fa-tree', desc: 'Eco-friendly wooden cap' }
            ]
        },
        {
            id: 'is_gift',
            category: 'Gift',
            question: 'Is this a gift for someone special?',
            options: [
                { value: 'no', label: 'For Myself', icon: 'fas fa-user', desc: 'Personal indulgence' },
                { value: 'yes', label: 'Yes, It\'s a Gift', icon: 'fas fa-gift', desc: 'For someone special' }
            ]
        },
        {
            id: 'gift_box',
            category: 'Gift',
            question: 'Choose your gift packaging',
            showIf: (answers) => answers.is_gift === 'yes',
            options: [
                { value: 'standard', label: 'Standard Box', icon: 'fas fa-box', desc: 'Elegant white box' },
                { value: 'premium', label: 'Premium Box', icon: 'fas fa-gift', desc: 'Velvet-lined luxury box' },
                { value: 'ultimate', label: 'Ultimate Gift Set', icon: 'fas fa-crown', desc: 'With ribbon & message card' }
            ]
        },
        {
            id: 'ribbon_color',
            category: 'Gift',
            question: 'Select ribbon color',
            showIf: (answers) => answers.is_gift === 'yes' && answers.gift_box !== 'standard',
            options: [
                { value: 'gold', label: 'Gold', icon: 'fas fa-ribbon', desc: 'Classic luxury' },
                { value: 'rose', label: 'Rose Pink', icon: 'fas fa-ribbon', desc: 'Romantic touch' },
                { value: 'navy', label: 'Navy Blue', icon: 'fas fa-ribbon', desc: 'Sophisticated' },
                { value: 'burgundy', label: 'Burgundy', icon: 'fas fa-ribbon', desc: 'Rich & elegant' }
            ]
        },
        {
            id: 'personal_message',
            category: 'Gift',
            question: 'Would you like to add a personal message?',
            showIf: (answers) => answers.is_gift === 'yes',
            options: [
                { value: 'no', label: 'No Message', icon: 'fas fa-times', desc: 'Keep it simple' },
                { value: 'yes', label: 'Add Message', icon: 'fas fa-envelope', desc: 'Handwritten card included' }
            ]
        }
    ];

    // Filter questions based on conditional logic
    const activeQuestions = questions.filter(q =>
        !q.showIf || q.showIf(answers)
    );

    const handleAnswer = (questionId, value) => {
        setAnswers(prev => ({ ...prev, [questionId]: value }));

        // Find current question index in active questions
        const currentActiveIndex = activeQuestions.findIndex(q => q.id === questionId);

        if (currentActiveIndex < activeQuestions.length - 1) {
            setTimeout(() => setCurrentStep(prev => prev + 1), 300);
        } else {
            setTimeout(() => setIsComplete(true), 300);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleStartQuiz = () => {
        setShowProcess(false);
        window.scrollTo(0, 0);
    };

    const handleRestart = () => {
        setCurrentStep(0);
        setAnswers({});
        setIsComplete(false);
    };

    const handleBackToProcess = () => {
        setShowProcess(true);
        setCurrentStep(0);
        setAnswers({});
        setIsComplete(false);
        window.scrollTo(0, 0);
    };

    // Get current question from active questions
    const getCurrentQuestion = () => {
        return activeQuestions[currentStep] || activeQuestions[0];
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
    }, [showProcess, isComplete]);

    return (
        <>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <span className={styles.heroLabel}>Fully Customizable</span>
                    <h1>Design Your Perfect Perfume</h1>
                    <p>Customize everything – from scent to bottle design to luxury gift packaging</p>
                </div>
            </section>

            {showProcess ? (
                <>
                    {/* What You Can Customize Section */}
                    <section className={styles.customizeOptions}>
                        <div className={`${styles.processHeader} reveal`}>
                            <span className={styles.sectionLabel}>Everything Is Customizable</span>
                            <h2>Create Something Truly Unique</h2>
                            <div className={styles.divider}></div>
                            <p>Design every aspect of your personalized fragrance experience</p>
                        </div>

                        <div className={styles.customizeGrid}>
                            <div className={`${styles.customizeCard} reveal`}>
                                <div className={styles.customizeIcon}>
                                    <i className="fas fa-flask"></i>
                                </div>
                                <h3>Custom Scent</h3>
                                <p>AI analyzes your preferences to create 3 unique fragrance samples tailored to your personality and lifestyle</p>
                                <ul className={styles.customizeList}>
                                    <li>Occasion & mood matching</li>
                                    <li>Preferred scent families</li>
                                    <li>Intensity levels</li>
                                </ul>
                            </div>
                            <div className={`${styles.customizeCard} reveal`}>
                                <div className={styles.customizeIcon}>
                                    <i className="fas fa-wine-bottle"></i>
                                </div>
                                <h3>Custom Bottle</h3>
                                <p>Choose from elegant bottle shapes, beautiful colors, and premium cap designs to match your style</p>
                                <ul className={styles.customizeList}>
                                    <li>4 bottle shapes</li>
                                    <li>4 glass colors</li>
                                    <li>4 cap designs</li>
                                </ul>
                            </div>
                            <div className={`${styles.customizeCard} reveal`}>
                                <div className={styles.customizeIcon}>
                                    <i className="fas fa-gift"></i>
                                </div>
                                <h3>Gift Packaging</h3>
                                <p>Perfect for gifting! Add luxury packaging with ribbon and a handwritten message card</p>
                                <ul className={styles.customizeList}>
                                    <li>Premium gift boxes</li>
                                    <li>Ribbon color options</li>
                                    <li>Personal message card</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* How It Works Section */}
                    <section className={styles.processSection}>
                        <div className={`${styles.processHeader} reveal`}>
                            <span className={styles.sectionLabel}>The Journey</span>
                            <h2>How It Works</h2>
                            <div className={styles.divider}></div>
                            <p>Your personalized perfume in four simple steps</p>
                        </div>

                        <div className={styles.processGrid}>
                            <div className={`${styles.processCard} reveal`}>
                                <div className={styles.processNumber}>01</div>
                                <div className={styles.processIcon}>
                                    <i className="fas fa-comments"></i>
                                </div>
                                <h3>Answer Questions</h3>
                                <p>Our AI asks about your scent preferences, bottle style, and packaging needs</p>
                            </div>
                            <div className={`${styles.processCard} reveal`}>
                                <div className={styles.processNumber}>02</div>
                                <div className={styles.processIcon}>
                                    <i className="fas fa-magic"></i>
                                </div>
                                <h3>We Create Samples</h3>
                                <p>Expert perfumers craft 3 unique samples based on your answers</p>
                            </div>
                            <div className={`${styles.processCard} reveal`}>
                                <div className={styles.processNumber}>03</div>
                                <div className={styles.processIcon}>
                                    <i className="fas fa-box-open"></i>
                                </div>
                                <h3>Try Your Samples</h3>
                                <p>Receive your sample pack and experience each fragrance at home</p>
                            </div>
                            <div className={`${styles.processCard} reveal`}>
                                <div className={styles.processNumber}>04</div>
                                <div className={styles.processIcon}>
                                    <i className="fas fa-crown"></i>
                                </div>
                                <h3>Get Master Bottle</h3>
                                <p>Order your favorite in a custom bottle with optional gift packaging</p>
                            </div>
                        </div>
                    </section>

                    {/* Pricing Section */}
                    <section className={styles.pricingSection}>
                        <div className={`${styles.pricingHeader} reveal`}>
                            <span className={styles.sectionLabel}>Investment</span>
                            <h2>Choose Your Package</h2>
                            <div className={styles.divider}></div>
                        </div>

                        <div className={styles.pricingGrid}>
                            <div className={`${styles.pricingCard} reveal`}>
                                <div className={styles.pricingBadge}>Sample Pack</div>
                                <div className={styles.pricingPrice}>
                                    <span className={styles.currency}>₹</span>
                                    <span className={styles.amount}>999</span>
                                </div>
                                <p className={styles.pricingDesc}>Try before you commit</p>
                                <ul className={styles.pricingFeatures}>
                                    <li><i className="fas fa-check"></i> 3 Custom Perfume Samples (5ml each)</li>
                                    <li><i className="fas fa-check"></i> AI-Powered Scent Matching</li>
                                    <li><i className="fas fa-check"></i> Expert Craftsmanship</li>
                                    <li><i className="fas fa-check"></i> Free Shipping</li>
                                    <li><i className="fas fa-check"></i> 100% Redeemable on Master Bottle</li>
                                </ul>
                                <button className={styles.pricingBtn} onClick={handleStartQuiz}>
                                    Start Customizing
                                </button>
                            </div>

                            <div className={`${styles.pricingCard} ${styles.pricingFeatured} reveal`}>
                                <div className={styles.pricingBadge}>Master Bottle</div>
                                <div className={styles.pricingPrice}>
                                    <span className={styles.currency}>₹</span>
                                    <span className={styles.amount}>4,999</span>
                                    <span className={styles.priceNote}>onwards</span>
                                </div>
                                <p className={styles.pricingDesc}>Fully customized, full size</p>
                                <ul className={styles.pricingFeatures}>
                                    <li><i className="fas fa-check"></i> Full Size Bottle (100ml)</li>
                                    <li><i className="fas fa-check"></i> Your Signature Scent</li>
                                    <li><i className="fas fa-check"></i> Custom Bottle Design</li>
                                    <li><i className="fas fa-check"></i> Personalized Label</li>
                                    <li><i className="fas fa-check"></i> Gift Packaging Available (+₹499)</li>
                                    <li><i className="fas fa-check"></i> Free Priority Shipping</li>
                                </ul>
                                <p className={styles.pricingNote}>
                                    <i className="fas fa-info-circle"></i> Order after trying your samples
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* CTA Section */}
                    <section className={styles.ctaSection}>
                        <div className={`${styles.ctaContent} reveal`}>
                            <h2>Ready to Create Your Signature Scent?</h2>
                            <p>Answer a few questions and we'll craft three unique samples just for you</p>
                            <button className="btn" onClick={handleStartQuiz}>
                                Start Customizing <i className="fas fa-arrow-right"></i>
                            </button>
                        </div>
                    </section>
                </>
            ) : !isComplete ? (
                /* Questionnaire Section */
                <section className={styles.quizSection}>
                    <div className={styles.quizContainer}>
                        {/* Progress Bar */}
                        <div className={styles.progressBar}>
                            <div
                                className={styles.progressFill}
                                style={{ width: `${((currentStep + 1) / activeQuestions.length) * 100}%` }}
                            ></div>
                        </div>
                        <div className={styles.progressText}>
                            <span className={styles.progressCategory}>{getCurrentQuestion().category}</span>
                            <span>Question {currentStep + 1} of {activeQuestions.length}</span>
                        </div>

                        {/* Question */}
                        <div className={styles.questionCard}>
                            <div className={styles.aiIcon}>
                                {getCurrentQuestion().category === 'Scent' && <i className="fas fa-flask"></i>}
                                {getCurrentQuestion().category === 'Bottle' && <i className="fas fa-wine-bottle"></i>}
                                {getCurrentQuestion().category === 'Gift' && <i className="fas fa-gift"></i>}
                            </div>
                            <h2 className={styles.question}>{getCurrentQuestion().question}</h2>

                            <div className={styles.optionsGrid}>
                                {getCurrentQuestion().options.map((option) => (
                                    <button
                                        key={option.value}
                                        className={`${styles.optionCard} ${answers[getCurrentQuestion().id] === option.value ? styles.selected : ''}`}
                                        onClick={() => handleAnswer(getCurrentQuestion().id, option.value)}
                                    >
                                        <div className={styles.optionIcon}>
                                            <i className={option.icon}></i>
                                        </div>
                                        <h3>{option.label}</h3>
                                        <p>{option.desc}</p>
                                    </button>
                                ))}
                            </div>

                            <div className={styles.quizNavigation}>
                                {currentStep > 0 && (
                                    <button className={styles.backBtn} onClick={handleBack}>
                                        <i className="fas fa-arrow-left"></i> Previous
                                    </button>
                                )}
                                <button className={styles.backToOverviewBtn} onClick={handleBackToProcess}>
                                    <i className="fas fa-home"></i> Back to Overview
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                /* Completion Section */
                <section className={styles.completeSection}>
                    <div className={styles.completeContainer}>
                        <div className={`${styles.completeCard} reveal`}>
                            <div className={styles.completeIcon}>
                                <i className="fas fa-check-circle"></i>
                            </div>
                            <h2>Your Custom Perfume is Ready to Create!</h2>
                            <p>Our experts will craft three unique fragrances based on your selections</p>

                            <div className={styles.summaryBox}>
                                <h3>Your Customization Summary</h3>

                                {/* Scent Preferences */}
                                <div className={styles.summarySection}>
                                    <h4><i className="fas fa-flask"></i> Scent Profile</h4>
                                    <div className={styles.summaryGrid}>
                                        {Object.entries(answers)
                                            .filter(([key]) => ['occasion', 'mood', 'scent_family', 'intensity'].includes(key))
                                            .map(([key, value]) => (
                                                <div key={key} className={styles.summaryItem}>
                                                    <span className={styles.summaryLabel}>
                                                        {key.replace('_', ' ').toUpperCase()}
                                                    </span>
                                                    <span className={styles.summaryValue}>
                                                        {value.charAt(0).toUpperCase() + value.slice(1)}
                                                    </span>
                                                </div>
                                            ))}
                                    </div>
                                </div>

                                {/* Bottle Design */}
                                <div className={styles.summarySection}>
                                    <h4><i className="fas fa-wine-bottle"></i> Bottle Design</h4>
                                    <div className={styles.summaryGrid}>
                                        {Object.entries(answers)
                                            .filter(([key]) => ['bottle_style', 'bottle_color', 'cap_style'].includes(key))
                                            .map(([key, value]) => (
                                                <div key={key} className={styles.summaryItem}>
                                                    <span className={styles.summaryLabel}>
                                                        {key.replace('_', ' ').toUpperCase()}
                                                    </span>
                                                    <span className={styles.summaryValue}>
                                                        {value.charAt(0).toUpperCase() + value.slice(1).replace('_', ' ')}
                                                    </span>
                                                </div>
                                            ))}
                                    </div>
                                </div>

                                {/* Gift Options */}
                                {answers.is_gift === 'yes' && (
                                    <div className={styles.summarySection}>
                                        <h4><i className="fas fa-gift"></i> Gift Packaging</h4>
                                        <div className={styles.summaryGrid}>
                                            {Object.entries(answers)
                                                .filter(([key]) => ['gift_box', 'ribbon_color', 'personal_message'].includes(key))
                                                .map(([key, value]) => (
                                                    <div key={key} className={styles.summaryItem}>
                                                        <span className={styles.summaryLabel}>
                                                            {key.replace('_', ' ').toUpperCase()}
                                                        </span>
                                                        <span className={styles.summaryValue}>
                                                            {value.charAt(0).toUpperCase() + value.slice(1)}
                                                        </span>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className={styles.nextSteps}>
                                <h3>What Happens Next?</h3>
                                <div className={styles.nextStepsGrid}>
                                    <div className={styles.nextStep}>
                                        <span className={styles.stepNum}>1</span>
                                        <p>Complete your order (₹999)</p>
                                    </div>
                                    <div className={styles.nextStep}>
                                        <span className={styles.stepNum}>2</span>
                                        <p>Receive 3 samples in 5-7 days</p>
                                    </div>
                                    <div className={styles.nextStep}>
                                        <span className={styles.stepNum}>3</span>
                                        <p>Choose your favorite scent</p>
                                    </div>
                                    <div className={styles.nextStep}>
                                        <span className={styles.stepNum}>4</span>
                                        <p>Get your custom master bottle</p>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.completeBtns}>
                                <button className={`btn ${styles.orderBtn}`}>
                                    Order Sample Pack - ₹999
                                </button>
                                <button className={styles.restartBtn} onClick={handleRestart}>
                                    <i className="fas fa-redo"></i> Start Over
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}

"use client";
import { useState, useEffect } from 'react';
import styles from '../../styles/Cleaners.module.css';

export default function Cleaners() {
    const [selectedVariant, setSelectedVariant] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [selectedGalleryImage, setSelectedGalleryImage] = useState(0);

    const product = {
        name: "All-In-One Premium Cleaner",
        tagline: "One Solution for Every Surface",
        description: "Experience the power of luxury cleaning with our revolutionary all-in-one formula. Designed for windows, tiles, floors, countertops, and more – all with a signature scent that transforms cleaning into an indulgence.",
        gallery: [
            "/assets/cbottle.png",
            "/assets/ckit.png",
            "/assets/csteps.png",
            "/assets/crefill.png"
        ],
        features: [
            { icon: "fas fa-check-circle", title: "Multi-Surface", desc: "Works on glass, tiles, marble, wood & more" },
            { icon: "fas fa-leaf", title: "Eco-Friendly", desc: "Made with natural, biodegradable ingredients" },
            { icon: "fas fa-heart", title: "Long Lasting Scent", desc: "Infused with premium fragrance oils" }
        ],
        variants: [
            {
                id: 1,
                name: "Refill Pack",
                size: "1 Litre",
                price: 699,
                originalPrice: 999,
                image: "/assets/crefill.png",
                desc: "Eco-friendly liquid refill for your spray bottle",
                bestFor: "Refilling spray bottles, cost-effective"
            },
            {
                id: 2,
                name: "Full Kit",
                size: "Complete Kit",
                price: 1299,
                originalPrice: 1899,
                image: "/assets/ckit.png",
                desc: "Includes: Spray Bottle + Liquid Refill + Cleaning Accessories",
                bestFor: "Best value combo - everything you need"
            }
        ],
        usageAreas: [
            { icon: "fas fa-border-all", name: "Tiles" },
            { icon: "fas fa-th-large", name: "Windows" },
            { icon: "fas fa-door-open", name: "Glass Doors" },
            { icon: "fas fa-sink", name: "Countertops" },
            { icon: "fas fa-toilet", name: "Bathrooms" },
            { icon: "fas fa-utensils", name: "Kitchen" },
            { icon: "fas fa-couch", name: "Furniture" },
            { icon: "fas fa-car", name: "Car Interiors" }
        ]
    };

    const handleQuantityChange = (delta) => {
        setQuantity(prev => Math.max(1, Math.min(10, prev + delta)));
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
                <div className={styles.heroOverlay}></div>
                <div className={styles.heroContent}>
                    <span className={styles.heroLabel}>Premium Home Care</span>
                    <h1>The Art of Clean</h1>
                    <p>Transform your cleaning routine into a luxurious experience</p>
                </div>
            </section>

            {/* Product Section */}
            <section className={styles.productSection}>
                <div className={styles.productGrid}>
                    {/* Left Column - Image and Variants */}
                    <div className={`${styles.productLeft} reveal`}>
                        <div className={styles.imageContainer}>
                            <div className={styles.imageBadge}>
                                {Math.round((1 - product.variants[selectedVariant].price / product.variants[selectedVariant].originalPrice) * 100)}% OFF
                            </div>
                            <img
                                src={product.variants[selectedVariant].image}
                                alt={product.variants[selectedVariant].name}
                                onError={(e) => {
                                    e.target.src = '/assets/cfp.png';
                                }}
                            />
                        </div>

                        {/* Variant Selection - Below Image */}
                        <div className={styles.variantSection}>
                            <h3>Choose Your Variant</h3>
                            <div className={styles.variantGrid}>
                                {product.variants.map((variant, index) => (
                                    <button
                                        key={variant.id}
                                        className={`${styles.variantCard} ${selectedVariant === index ? styles.variantSelected : ''}`}
                                        onClick={() => setSelectedVariant(index)}
                                    >
                                        <span className={styles.variantName}>{variant.name}</span>
                                        <span className={styles.variantSize}>{variant.size}</span>
                                        <span className={styles.variantPrice}>₹{variant.price}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Product Info */}
                    <div className={`${styles.productInfo} reveal`}>
                        <span className={styles.productLabel}>All-In-One Solution</span>
                        <h2>{product.name}</h2>
                        <p className={styles.productTagline}>{product.tagline}</p>
                        <div className={styles.divider}></div>
                        <p className={styles.productDesc}>{product.description}</p>

                        {/* Selected Variant Details */}
                        <div className={styles.selectedVariant}>
                            <div className={styles.variantDetails}>
                                <p><strong>Best for:</strong> {product.variants[selectedVariant].bestFor}</p>
                                <p>{product.variants[selectedVariant].desc}</p>
                            </div>
                        </div>

                        {/* Price & Add to Cart */}
                        <div className={styles.priceSection}>
                            <div className={styles.priceDisplay}>
                                <span className={styles.currentPrice}>₹{product.variants[selectedVariant].price}</span>
                                <span className={styles.originalPrice}>₹{product.variants[selectedVariant].originalPrice}</span>
                                <span className={styles.savings}>
                                    Save ₹{product.variants[selectedVariant].originalPrice - product.variants[selectedVariant].price}
                                </span>
                            </div>

                            <div className={styles.quantitySelector}>
                                <button onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>
                                    <i className="fas fa-minus"></i>
                                </button>
                                <span>{quantity}</span>
                                <button onClick={() => handleQuantityChange(1)} disabled={quantity >= 10}>
                                    <i className="fas fa-plus"></i>
                                </button>
                            </div>

                            <button className={styles.addToCartBtn}>
                                <i className="fas fa-shopping-cart"></i>
                                Add to Cart - ₹{product.variants[selectedVariant].price * quantity}
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            {/* Product Gallery Section */}
            <section className={styles.gallerySection}>
                <div className={`${styles.galleryHeader} reveal`}>
                    <span className={styles.sectionLabel}>Product Gallery</span>
                    <h2>See It From Every Angle</h2>
                    <div className={styles.divider}></div>
                </div>

                <div className={styles.galleryContainer}>
                    {/* Main Gallery Image */}
                    <div className={`${styles.galleryMain} reveal`}>
                        <img
                            src={product.gallery[selectedGalleryImage]}
                            alt={`Product view ${selectedGalleryImage + 1}`}
                            onError={(e) => {
                                e.target.src = '/assets/ckit.png';
                            }}
                        />
                    </div>

                    {/* Gallery Thumbnails */}
                    <div className={styles.galleryThumbnails}>
                        {product.gallery.map((image, index) => (
                            <div
                                key={index}
                                className={`${styles.galleryThumb} ${selectedGalleryImage === index ? styles.galleryThumbActive : ''}`}
                                onClick={() => setSelectedGalleryImage(index)}
                            >
                                <img
                                    src={image}
                                    alt={`Thumbnail ${index + 1}`}
                                    onError={(e) => {
                                        e.target.src = '/assets/ckit.png';
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className={styles.featuresSection}>
                <div className={`${styles.featuresHeader} reveal`}>
                    <span className={styles.sectionLabel}>Why Choose Us</span>
                    <h2>Premium Quality, Premium Results</h2>
                    <div className={styles.divider}></div>
                </div>

                <div className={styles.featuresGrid}>
                    {product.features.map((feature, index) => (
                        <div key={index} className={`${styles.featureCard} reveal`}>
                            <div className={styles.featureIcon}>
                                <i className={feature.icon}></i>
                            </div>
                            <h3>{feature.title}</h3>
                            <p>{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Usage Areas Section */}
            <section className={styles.usageSection}>
                <div className={`${styles.usageHeader} reveal`}>
                    <span className={styles.sectionLabel}>Versatility</span>
                    <h2>One Cleaner, Endless Possibilities</h2>
                    <div className={styles.divider}></div>
                    <p>Our all-in-one formula works beautifully on all these surfaces</p>
                </div>

                <div className={styles.usageGrid}>
                    {product.usageAreas.map((area, index) => (
                        <div key={index} className={`${styles.usageCard} reveal`}>
                            <div className={styles.usageIcon}>
                                <i className={area.icon}></i>
                            </div>
                            <span>{area.name}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* How to Use Section */}
            <section className={styles.howToSection}>
                <div className={`${styles.howToHeader} reveal`}>
                    <span className={styles.sectionLabel}>Simple Steps</span>
                    <h2>How to Use</h2>
                    <div className={styles.divider}></div>
                </div>

                <div className={styles.howToGrid}>
                    <div className={`${styles.howToCard} reveal`}>
                        <div className={styles.howToNumber}>1</div>
                        <h3>Spray</h3>
                        <p>Spray directly on the surface from 6-8 inches away</p>
                    </div>
                    <div className={`${styles.howToCard} reveal`}>
                        <div className={styles.howToNumber}>2</div>
                        <h3>Wait</h3>
                        <p>Let it sit for 10-15 seconds for tough stains</p>
                    </div>
                    <div className={`${styles.howToCard} reveal`}>
                        <div className={styles.howToNumber}>3</div>
                        <h3>Wipe</h3>
                        <p>Wipe clean with a microfiber cloth</p>
                    </div>
                    <div className={`${styles.howToCard} reveal`}>
                        <div className={styles.howToNumber}>4</div>
                        <h3>Enjoy</h3>
                        <p>Admire the streak-free, fragrant finish</p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className={styles.ctaSection}>
                <div className={`${styles.ctaContent} reveal`}>
                    <h2>Ready to Elevate Your Cleaning Experience?</h2>
                    <p>Join thousands of happy customers who made the switch to luxury cleaning</p>
                    <button className="btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        Shop Now <i className="fas fa-arrow-up"></i>
                    </button>
                </div>
            </section>
        </>
    );
}

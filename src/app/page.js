"use client";
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false);

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

  // Add to Cart Animation Handler
  const handleAddToCart = (e) => {
    const btn = e.target;
    const originalText = btn.innerText;
    btn.innerText = "✓ Added!";
    btn.style.backgroundColor = "white";
    btn.style.color = "#1B3B36";

    setTimeout(() => {
      btn.innerText = originalText;
      btn.style.backgroundColor = "";
      btn.style.color = "";
    }, 2500);
  };

  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}>
        <video className={styles.heroVideo} autoPlay muted loop playsInline>
          <source src="/assets/pv1.mp4" type="video/mp4" />
        </video>

        <div className={styles.heroContent}>
          <h1>Scent of Luxury, Shine of Purity</h1>
          <p>Experience the perfect harmony of exquisite fragrances and professional home care solutions</p>
          <button className="btn">Explore Collection</button>
        </div>
      </section>

      {/* perfumes Section */}
      <section className={styles.process} id="how-to-use">
        <div className={`${styles.processContent} reveal`}>
          <h2>Experience Our Premium Perfumes</h2>
          <div className={styles.divider}></div>
          <p>Discover the art of applying luxury fragrances for a lasting impression</p>
        </div>

        <div className={styles.featuresGrid}>
          <div className={`${styles.featureItem} reveal`}>
            <img src="/assets/perfume-use-1.jpg" alt="Apply on Neck" />
            <h3>Step 1: Spray on Pulse Points</h3>
            <p>Apply perfume to your neck and behind the ears. These warm areas help diffuse the fragrance throughout the day.</p>
          </div>
          <div className={`${styles.featureItem} reveal`}>
            <img src="/assets/perfume-use-2.jpg" alt="Hold Perfume Bottle" />
            <h3>Step 2: The Perfect Distance</h3>
            <p>Hold the bottle 6-8 inches away from your skin for optimal coverage. One or two sprays are enough for lasting fragrance.</p>
          </div>
          <div className={`${styles.featureItem} reveal`}>
            <img src="/assets/perfume-use-3.jpg" alt="Spray on Wrists" />
            <h3>Step 3: Don't Forget Wrists</h3>
            <p>Apply to wrists and avoid rubbing together. Let the scent settle naturally to preserve the fragrance notes.</p>
          </div>
        </div>
      </section>

      {/* Customize Perfume Section */}
      <section className={styles.features} id="perfumes">
        <div className="container reveal">
          <h2 className={styles.sectionTitle}>Customize Your Perfume</h2>
          <div className={styles.divider}></div>
          <p className={styles.sectionSubtitle}>Create your unique signature scent in three simple steps</p>

          <div className={styles.customizeGrid}>

            {/* Step 1 - Base Notes */}
            <div className={`${styles.customizeStep} reveal`}>
              <div className={styles.stepNumber}>01</div>
              <div className={styles.stepIcon}>
                <i className="fas fa-flask"></i>
              </div>
              <h3>Choose Your Base</h3>
              <p>Select the foundation of your fragrance from rich, long-lasting notes</p>
              <div className={styles.optionsList}>
                <span className={styles.optionTag}>Sandalwood</span>
                <span className={styles.optionTag}>Musk</span>
                <span className={styles.optionTag}>Vanilla</span>
                <span className={styles.optionTag}>Cedarwood</span>
                <span className={styles.optionTag}>Amber</span>
              </div>
            </div>

            {/* Step 2 - Heart Notes */}
            <div className={`${styles.customizeStep} reveal`}>
              <div className={styles.stepNumber}>02</div>
              <div className={styles.stepIcon}>
                <i className="fas fa-heart"></i>
              </div>
              <h3>Add Heart Notes</h3>
              <p>The soul of your perfume – floral and spicy middle notes</p>
              <div className={styles.optionsList}>
                <span className={styles.optionTag}>Rose</span>
                <span className={styles.optionTag}>Jasmine</span>
                <span className={styles.optionTag}>Lavender</span>
                <span className={styles.optionTag}>Cinnamon</span>
                <span className={styles.optionTag}>Iris</span>
              </div>
            </div>

            {/* Step 3 - Top Notes */}
            <div className={`${styles.customizeStep} reveal`}>
              <div className={styles.stepNumber}>03</div>
              <div className={styles.stepIcon}>
                <i className="fas fa-star"></i>
              </div>
              <h3>Pick Top Notes</h3>
              <p>The first impression – fresh and vibrant opening notes</p>
              <div className={styles.optionsList}>
                <span className={styles.optionTag}>Bergamot</span>
                <span className={styles.optionTag}>Citrus</span>
                <span className={styles.optionTag}>Mint</span>
                <span className={styles.optionTag}>Green Apple</span>
                <span className={styles.optionTag}>Pink Pepper</span>
              </div>
            </div>

          </div>

          <div className={styles.customizeCta}>
            <p>Ready to create your signature scent?</p>
            <button className="btn">Start Creating – $89.00</button>
          </div>

        </div>
      </section>

      {/* Cleaners Section */}
      <section className={styles.products} id="cleaners">
        <div className="text-center reveal">
          <h2 className={styles.sectionTitle}>Premium Cleaning Solutions</h2>
          <div className={styles.divider}></div>
          <p className={styles.sectionSubtitle}>Professional-grade cleaners infused with luxury fragrances</p>
        </div>
        <div className={styles.productGrid}>

          {/* Cleaner 1 */}
          <div className={`${styles.productCard} reveal`}>
            <div className={styles.productImg}>
              <span className={styles.tag}>Bestseller</span>
              <img src="/assets/c2.png" alt="Tile Cleaner" />
            </div>
            <div className={styles.productDetails}>
              <h3>Forest Floor Tile Wash</h3>
              <p>Heavy-duty cleaner infused with notes of pine and cedarwood. Removes stubborn grime while leaving a luxurious forest scent.</p>
              <div className={styles.priceRow}>
                <span>$24.00</span>
                <button className={styles.addBtn} onClick={handleAddToCart}>Add to Cart</button>
              </div>
            </div>
          </div>

          {/* Cleaner 2 */}
          <div className={`${styles.productCard} reveal`}>
            <div className={styles.productImg}>
              <img src="/assets/c3.png" alt="Surface Spray" />
            </div>
            <div className={styles.productDetails}>
              <h3>Citrus Bloom Surface Spray</h3>
              <p>Refreshing multipurpose cleaner with zesty orange blossom and bergamot. Perfect for countertops and glass surfaces.</p>
              <div className={styles.priceRow}>
                <span>$28.00</span>
                <button className={styles.addBtn} onClick={handleAddToCart}>Add to Cart</button>
              </div>
            </div>
          </div>

          {/* Cleaner 3 */}
          <div className={`${styles.productCard} reveal`}>
            <div className={styles.productImg}>
              <span className={styles.tag}>New</span>
              <img src="/assets/c5.png" alt="Floor Polish" />
            </div>
            <div className={styles.productDetails}>
              <h3>Lavender Dreams Floor Polish</h3>
              <p>Gentle yet effective floor polish with calming lavender essence. Safe for hardwood and laminate flooring.</p>
              <div className={styles.priceRow}>
                <span>$32.00</span>
                <button className={styles.addBtn} onClick={handleAddToCart}>Add to Cart</button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Professional Cleaning Made Simple - Now after Premium Cleaning Solutions */}
      <section className={`${styles.showcaseSection} ${styles.cleaningShowcase}`} id="cleaning-process">
        <div className={styles.showcaseContent}>
          <div className={`${styles.showcaseText} reveal`}>
            <span className={styles.showcaseLabel}>Expert Guide</span>
            <h2 className={styles.showcaseTitle}>Professional Cleaning Made Simple</h2>
            <div className={styles.showcaseDivider}></div>
            <p>Watch our expert guide on achieving spotless results with our premium cleaning products. Our step-by-step tutorial shows you the most effective techniques for using our cleaners.</p>
            <p className={styles.showcaseHighlight}>Learn the secrets to maintaining a spotless home with minimal effort. Our professional-grade formulas work harder so you don't have to.</p>
            <button className="btn">Watch Tutorial</button>
          </div>
          <div className={`${styles.showcaseMedia} reveal`}>
            <div className={styles.showcaseFrame}></div>
            <video autoPlay muted loop playsInline>
              <source src="/assets/cp1.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* Crafted from Natural Resources */}
      <section className={`${styles.showcaseSection} ${styles.naturalShowcase}`} id="natural-resources">
        <div className={`${styles.showcaseContent} ${styles.showcaseReversed}`}>
          <div className={`${styles.showcaseText} reveal`}>
            <span className={styles.showcaseLabel}>Our Philosophy</span>
            <h2 className={styles.showcaseTitle}>Crafted from Natural Resources</h2>
            <div className={styles.showcaseDivider}></div>
            <p>Discover how we source the finest natural ingredients and transform them into luxury products that care for your home and the environment.</p>
            <p className={styles.showcaseHighlight}>From sustainable harvesting to eco-friendly production, every step of our process honors nature while delivering premium quality you can trust.</p>
            <button className="btn">Learn More</button>
          </div>
          <div className={`${styles.showcaseMedia} reveal`}>
            <div className={styles.showcaseFrame}></div>
            <video autoPlay muted loop playsInline>
              <source src="/assets/natural-resources.mp4" type="video/mp4" />
              <source src="/assets/pp1.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      

      

      {/* Excellence in Every Drop - Stats Section */}
      <section className={styles.excellenceSection}>
        <div className={styles.excellenceBackground}></div>
        <div className={`${styles.excellenceContent} reveal`}>
          <span className={styles.showcaseLabel}>Our Commitment</span>
          <h2 className={styles.excellenceTitle}>Excellence in Every Drop</h2>
          <div className={styles.showcaseDivider}></div>
          <p>We blend cutting-edge science with traditional artistry. Our cleaners are tough on grime but gentle on the environment, while our perfumes are crafted using time-honored techniques from Grasse, France.</p>
        </div>

        <div className={styles.excellenceStats}>
          <div className={`${styles.excellenceStat} reveal`}>
            <div className={styles.statIcon}><i className="fas fa-microscope"></i></div>
            <h3>5+</h3>
            <p>Years Research</p>
          </div>
          <div className={`${styles.excellenceStat} reveal`}>
            <div className={styles.statIcon}><i className="fas fa-ban"></i></div>
            <h3>850+</h3>
            <p>Chemicals Banned</p>
          </div>
          <div className={`${styles.excellenceStat} reveal`}>
            <div className={styles.statIcon}><i className="fas fa-recycle"></i></div>
            <h3>100%</h3>
            <p>Recycled Materials</p>
          </div>
          <div className={`${styles.excellenceStat} reveal`}>
            <div className={styles.statIcon}><i className="fas fa-heart"></i></div>
            <h3>15K+</h3>
            <p>Happy Customers</p>
          </div>
        </div>
      </section>

      {/* Where Elegance Meets Cleanliness - Now before FAQ */}
      <section className={styles.eleganceSection} id="about">
        <div className={styles.eleganceContent}>
          <div className={`${styles.eleganceText} reveal`}>
            <span className={styles.showcaseLabel}>Our Story</span>
            <h2 className={styles.eleganceTitle}>Where Elegance Meets Cleanliness</h2>
            <div className={styles.showcaseDivider}></div>
            <p>We believe your home should be as luxurious as your personal style. That's why we've created a revolutionary line that combines haute parfumerie with professional-grade cleaning solutions.</p>
            <p>Transform your daily routine into a ritual of indulgence. Experience the synergy of citrus top notes in your tile cleaner and the same exquisite essence in your signature scent.</p>
            <button className="btn">Discover Our Story</button>
          </div>
          <div className={`${styles.eleganceImage} reveal`}>
            <div className={styles.eleganceFrame}></div>
            <img src="/assets/pc1.png" alt="Luxury Products" />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.faq} id="faq">
        <div className="text-center reveal">
          <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
          <div className={styles.divider}></div>
        </div>

        <details className={`${styles.faqDetails} reveal`}>
          <summary className={styles.faqSummary}>Are your products safe for marble and natural stone?</summary>
          <p>Absolutely! Our pH-neutral formulas are specifically designed to be safe on all natural stone surfaces including marble, travertine, and slate. They clean effectively without stripping protective sealants.</p>
        </details>

        <details className={`${styles.faqDetails} reveal`}>
          <summary className={styles.faqSummary}>How long does your perfume scent last?</summary>
          <p>Our Eau de Parfum contains 20% fragrance oil concentration, ensuring the scent lasts 6-8 hours on skin and up to 24 hours on fabrics. The fragrance evolves beautifully throughout the day with distinct top, heart, and base notes.</p>
        </details>

        <details className={`${styles.faqDetails} reveal`}>
          <summary className={styles.faqSummary}>Can I use your cleaners around pets and children?</summary>
          <p>Yes! We use non-toxic, plant-based surfactants that are completely safe for pets and children once dry. All our products are cruelty-free and free from harsh chemicals like ammonia, bleach, and phthalates.</p>
        </details>

        <details className={`${styles.faqDetails} reveal`}>
          <summary className={styles.faqSummary}>Do you offer refills or sustainable packaging?</summary>
          <p>We're committed to sustainability! All our bottles are made from 100% recycled materials and are fully recyclable. We also offer a refill program where you can return empty containers for a discount on your next purchase.</p>
        </details>

        <details className={`${styles.faqDetails} reveal`}>
          <summary className={styles.faqSummary}>What makes your products different from competitors?</summary>
          <p>We're the only brand that creates a cohesive scent experience between personal fragrances and home care products. Our master perfumers ensure that your signature scent can extend throughout your entire living space, creating a harmonious aromatic environment.</p>
        </details>
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
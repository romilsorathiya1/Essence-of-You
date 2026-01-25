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
          <h1>Scent of Luxury, Essence of You</h1>
          <p>Experience the perfect harmony of exquisite fragrances and bespoke perfumes crafted to define your unique identity</p>
          <button className="btn">Explore Collection</button>
        </div>
      </section>

      {/* Why Essence of You Section - Emotional Connection */}
      <section className={styles.whyUseSection}>
        <div className={styles.whyUseBackground}></div>
        <div className={`${styles.whyUseContent} reveal`}>
          <span className={styles.whyUseLabel}>Why Essence of You?</span>
          <h2 className={styles.whyUseTitle}>Because You Deserve to Be <span className={styles.highlight}>Remembered</span></h2>
          <div className={styles.showcaseDivider}></div>
          <p className={styles.whyUseIntro}>A fragrance isn't just a scent—it's your invisible signature. It's the memory you leave behind, the confidence you carry, and the story only you can tell.</p>
        </div>

        <div className={styles.emotionalGrid}>
          {/* Card 1 - Memory */}
          <div className={`${styles.emotionalCard} reveal`}>
            <div className={styles.emotionalIcon}>
              <i className="fas fa-heart"></i>
            </div>
            <div className={styles.emotionalCardContent}>
              <h3>Create Lasting Memories</h3>
              <p>Scent is the strongest sense tied to memory. When someone catches your fragrance, they don't just smell perfume—they remember <em>you</em>. Your laugh. Your warmth. Your presence.</p>
              <div className={styles.emotionalQuote}>
                <span>"They forgot what you said, but never how you made them feel."</span>
              </div>
            </div>
          </div>

          {/* Card 2 - Confidence */}
          <div className={`${styles.emotionalCard} reveal`}>
            <div className={styles.emotionalIcon}>
              <i className="fas fa-crown"></i>
            </div>
            <div className={styles.emotionalCardContent}>
              <h3>Wear Your Confidence</h3>
              <p>The right fragrance transforms how you carry yourself. It's that extra layer of self-assurance before a big meeting, a first date, or simply walking into a room knowing you're unforgettable.</p>
              <div className={styles.emotionalQuote}>
                <span>"Your scent arrives before you do—and lingers after you leave."</span>
              </div>
            </div>
          </div>

          {/* Card 3 - Identity */}
          <div className={`${styles.emotionalCard} reveal`}>
            <div className={styles.emotionalIcon}>
              <i className="fas fa-star"></i>
            </div>
            <div className={styles.emotionalCardContent}>
              <h3>Define Your Identity</h3>
              <p>You're not like everyone else—why should your fragrance be? Our customizable perfumes let you craft a scent as unique as your fingerprint. This is your essence, your story, <em>your signature</em>.</p>
              <div className={styles.emotionalQuote}>
                <span>"Be yourself; everyone else is already taken."</span>
              </div>
            </div>
          </div>

          {/* Card 4 - Self-Care */}
          <div className={`${styles.emotionalCard} reveal`}>
            <div className={styles.emotionalIcon}>
              <i className="fas fa-spa"></i>
            </div>
            <div className={styles.emotionalCardContent}>
              <h3>A Daily Act of Self-Love</h3>
              <p>Applying perfume isn't just routine—it's a ritual. A moment where you pause, breathe, and remind yourself that you're worth every beautiful thing. Because self-care isn't selfish; it's essential.</p>
              <div className={styles.emotionalQuote}>
                <span>"Start each day with intention, end it with gratitude."</span>
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.whyUseCta} reveal`}>
          <p>Ready to discover the fragrance that tells your story?</p>
          <button className="btn">Find Your Essence</button>
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



      {/* Crafted from Natural Resources */}
      <section className={`${styles.showcaseSection} ${styles.naturalShowcase}`} id="natural-resources">
        <div className={`${styles.showcaseContent} ${styles.showcaseReversed}`}>
          <div className={`${styles.showcaseText} reveal`}>
            <span className={styles.showcaseLabel}>Our Philosophy</span>
            <h2 className={styles.showcaseTitle}>Crafted from Natural Resources</h2>
            <div className={styles.showcaseDivider}></div>
            <p>Discover how we source the finest natural ingredients and transform them into luxury perfumes that capture your essence and celebrate individuality.</p>
            <p className={styles.showcaseHighlight}>From sustainable harvesting to artisanal craftsmanship, every step of our process honors nature while delivering premium quality fragrances you can trust.</p>
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
          <p>We blend cutting-edge science with traditional artistry. Our perfumes are crafted using time-honored techniques from Grasse, France, combining natural ingredients with modern innovation.</p>
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
            <h2 className={styles.eleganceTitle}>Where Elegance Meets Individuality</h2>
            <div className={styles.showcaseDivider}></div>
            <p>We believe your personal fragrance should be as unique as you are. That's why we've created a revolutionary line of haute parfumerie that allows you to express your individual essence.</p>
            <p>Transform your daily routine into a ritual of indulgence. Experience the artistry of fine perfumery with scents that evolve and adapt to your unique chemistry.</p>
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
          <summary className={styles.faqSummary}>How long does your perfume scent last?</summary>
          <p>Our Eau de Parfum contains 20% fragrance oil concentration, ensuring the scent lasts 6-8 hours on skin and up to 24 hours on fabrics. The fragrance evolves beautifully throughout the day with distinct top, heart, and base notes.</p>
        </details>



        <details className={`${styles.faqDetails} reveal`}>
          <summary className={styles.faqSummary}>Is your packaging eco-friendly?</summary>
          <p>Absolutely! We're committed to sustainability. All our bottles are made from 100% recycled glass and are fully recyclable. Our packaging uses FSC-certified paper and biodegradable materials, making it as beautiful for the planet as it is for you.</p>
        </details>

        <details className={`${styles.faqDetails} reveal`}>
          <summary className={styles.faqSummary}>What makes your perfumes different from competitors?</summary>
          <p>We offer complete customization of your fragrance, allowing you to create a truly unique signature scent. Our master perfumers use traditional techniques from Grasse, France, combined with the finest natural ingredients to ensure exceptional quality and longevity.</p>
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
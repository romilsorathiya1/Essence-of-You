"use client";
import styles from '../styles/Footer.module.css';

export default function Footer() {
  const handleSubscribe = (e) => {
    const btn = e.target;
    const input = btn.previousElementSibling;

    if (input && input.value.includes('@')) {
      const originalText = btn.innerText;
      btn.innerText = "✓ Subscribed!";
      input.value = "";
      setTimeout(() => {
        btn.innerText = originalText;
      }, 3000);
    } else {
      alert('Please enter a valid email address');
    }
  };

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerGrid}>
          <div className={styles.footerCol}>
            <h4>Essence of You</h4>
            <p>
              Merging the world of fine fragrance with professional home care. Elevate your everyday life with luxury that's sustainable and effective.
            </p>
            <div className={styles.socialIcons}>
              <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
              <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              <a href="#" aria-label="Pinterest"><i className="fab fa-pinterest"></i></a>
              <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            </div>
          </div>
          <div className={styles.footerCol}>
            <h4>Shop</h4>
            <ul>
              <li><a href="#products">All Products</a></li>
              <li><a href="#perfumes">Perfumes</a></li>
              <li><a href="#cleaners">Cleaners</a></li>
              <li><a href="#products">Gift Sets</a></li>
              <li><a href="#products">Bestsellers</a></li>
            </ul>
          </div>
          <div className={styles.footerCol}>
            <h4>Company</h4>
            <ul>
              <li><a href="#">Our Story</a></li>
              <li><a href="#">Ingredients</a></li>
              <li><a href="#">Sustainability</a></li>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="#">Careers</a></li>
            </ul>
          </div>
          <div className={styles.footerCol}>
            <h4>Stay Connected</h4>
            <p>
              Subscribe for exclusive offers, new launches, and luxury tips.
            </p>
            <input type="email" placeholder="Your email address" className={styles.newsletterInput} />
            <button className={styles.subscribeBtn} onClick={handleSubscribe}>
              Subscribe Now
            </button>
          </div>
        </div>
        <div className={styles.copyright}>
          &copy; 2025 Essence of You. All rights reserved. | Privacy Policy | Terms of Service
        </div>
      </div>
    </footer>
  );
}
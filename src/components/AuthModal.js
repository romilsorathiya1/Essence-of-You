"use client";
import { useState, useEffect } from 'react';
import styles from '../styles/AuthModal.module.css';
import { useAuth } from '../context/AuthContext';

export default function AuthModal({ isOpen, onClose }) {
    const { login } = useAuth();
    const [mode, setMode] = useState('login'); // 'login' or 'register'
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Reset form when modal opens/closes
    useEffect(() => {
        if (isOpen) {
            setFormData({
                name: '',
                email: '',
                phone: '',
                password: '',
                confirmPassword: ''
            });
            setError('');
            setSuccess('');
        }
    }, [isOpen]);

    // Close on escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
        setError('');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                }),
            });

            const data = await response.json();

            if (response.ok) {
                login(data.user);
                setSuccess('Login successful!');
                setTimeout(() => {
                    onClose();
                }, 1000);
            } else {
                setError(data.error || 'Login failed. Please try again.');
            }
        } catch (error) {
            setError('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setIsLoading(false);
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    password: formData.password
                }),
            });

            const data = await response.json();

            if (response.ok) {
                login(data.user);
                setSuccess('Account created successfully!');
                setTimeout(() => {
                    onClose();
                }, 1000);

            } else {
                setError(data.error || 'Registration failed. Please try again.');
            }
        } catch (error) {
            setError('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const switchMode = () => {
        setMode(mode === 'login' ? 'register' : 'login');
        setError('');
        setSuccess('');
    };

    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                {/* Close Button */}
                <button className={styles.closeBtn} onClick={onClose}>
                    <i className="fas fa-times"></i>
                </button>

                {/* Left Side - Branding */}
                <div className={styles.leftPanel}>
                    <div className={styles.brandOverlay}></div>
                    <div className={styles.brandContent}>
                        <div className={styles.brandLogo}>
                            <i className="fas fa-spa"></i>
                        </div>
                        <h2>Essence of You</h2>
                        <p className={styles.tagline}>Discover Your Signature Scent</p>

                        <div className={styles.features}>
                            <div className={styles.feature}>
                                <i className="fas fa-check-circle"></i>
                                <span>Exclusive Collections</span>
                            </div>
                            <div className={styles.feature}>
                                <i className="fas fa-check-circle"></i>
                                <span>Personalized Recommendations</span>
                            </div>
                            <div className={styles.feature}>
                                <i className="fas fa-check-circle"></i>
                                <span>Member-Only Discounts</span>
                            </div>
                            <div className={styles.feature}>
                                <i className="fas fa-check-circle"></i>
                                <span>Early Access to New Arrivals</span>
                            </div>
                        </div>

                        <div className={styles.testimonial}>
                            <p>&quot;The most luxurious perfumes I&apos;ve ever experienced. Truly exceptional quality.&quot;</p>
                            <span>— Sarah M., Premium Member</span>
                        </div>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className={styles.rightPanel}>
                    {/* Tab Switcher */}
                    <div className={styles.tabSwitcher}>
                        <button
                            className={`${styles.tab} ${mode === 'login' ? styles.active : ''}`}
                            onClick={() => setMode('login')}
                        >
                            Sign In
                        </button>
                        <button
                            className={`${styles.tab} ${mode === 'register' ? styles.active : ''}`}
                            onClick={() => setMode('register')}
                        >
                            Register
                        </button>
                    </div>

                    {/* Form Header */}
                    <div className={styles.formHeader}>
                        <h3>{mode === 'login' ? 'Welcome Back' : 'Create Account'}</h3>
                        <p>{mode === 'login' ? 'Sign in to continue your journey' : 'Join our exclusive community'}</p>
                    </div>

                    {/* Error/Success Messages */}
                    {error && (
                        <div className={styles.errorMessage}>
                            <i className="fas fa-exclamation-circle"></i>
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className={styles.successMessage}>
                            <i className="fas fa-check-circle"></i>
                            {success}
                        </div>
                    )}

                    {/* Login Form */}
                    {mode === 'login' && (
                        <form onSubmit={handleLogin} className={styles.form}>
                            <div className={styles.inputGroup}>
                                <i className="fas fa-envelope"></i>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email Address"
                                    required
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <i className="fas fa-lock"></i>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                    required
                                />
                            </div>

                            <div className={styles.formOptions}>
                                <label className={styles.remember}>
                                    <input type="checkbox" />
                                    <span>Remember me</span>
                                </label>
                                <a href="#" className={styles.forgotLink}>Forgot Password?</a>
                            </div>

                            <button type="submit" className={styles.submitBtn} disabled={isLoading}>
                                {isLoading ? (
                                    <><i className="fas fa-spinner fa-spin"></i> Signing In...</>
                                ) : (
                                    <>Sign In <i className="fas fa-arrow-right"></i></>
                                )}
                            </button>

                            <div className={styles.dividerText}>
                                <span>or continue with</span>
                            </div>

                            <div className={styles.socialBtns}>
                                <button type="button" className={styles.socialBtn}>
                                    <i className="fab fa-google"></i>
                                </button>
                                <button type="button" className={styles.socialBtn}>
                                    <i className="fab fa-facebook-f"></i>
                                </button>
                                <button type="button" className={styles.socialBtn}>
                                    <i className="fab fa-apple"></i>
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Register Form */}
                    {mode === 'register' && (
                        <form onSubmit={handleRegister} className={styles.form}>
                            <div className={styles.inputGroup}>
                                <i className="fas fa-user"></i>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Full Name"
                                    required
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <i className="fas fa-envelope"></i>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email Address"
                                    required
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <i className="fas fa-phone"></i>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Phone Number (Optional)"
                                />
                            </div>

                            <div className={styles.inputRow}>
                                <div className={styles.inputGroup}>
                                    <i className="fas fa-lock"></i>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Password"
                                        required
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <i className="fas fa-lock"></i>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Confirm"
                                        required
                                    />
                                </div>
                            </div>

                            <div className={styles.termsCheck}>
                                <label>
                                    <input type="checkbox" required />
                                    <span>I agree to the <a href="#">Terms</a> & <a href="#">Privacy</a></span>
                                </label>
                            </div>

                            <button type="submit" className={styles.submitBtn} disabled={isLoading}>
                                {isLoading ? (
                                    <><i className="fas fa-spinner fa-spin"></i> Creating...</>
                                ) : (
                                    <>Create Account <i className="fas fa-arrow-right"></i></>
                                )}
                            </button>
                        </form>
                    )}

                    {/* Footer */}
                    <div className={styles.formFooter}>
                        <p>
                            {mode === 'login' ? "Don&apos;t have an account?" : "Already have an account?"}
                            <button onClick={switchMode} className={styles.switchBtn}>
                                {mode === 'login' ? 'Create one' : 'Sign in'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

"use client";
import { useState, useEffect, useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import AuthModal from '../../components/AuthModal';
import styles from '../../styles/Checkout.module.css';

export default function Checkout() {
    const router = useRouter();
    const { cartItems, getCartTotal, clearCart } = useCart();
    const { user, isLoggedIn, isLoading: authLoading } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        notes: ''
    });

    // Error State
    const [errors, setErrors] = useState({});

    // Validation Functions
    const validateEmail = (email) => {
        return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    };

    const validatePhone = (phone) => {
        return phone.match(/^\d{10}$/);
    };

    const validateZip = (zip) => {
        return zip.match(/^\d{6}$/);
    };

    // Check auth and load user data
    useEffect(() => {
        if (authLoading) return;

        if (isLoggedIn() && user) {
            setFormData(prev => ({
                ...prev,
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || ''
            }));
        }
        setIsLoading(false);
    }, [authLoading, user, isLoggedIn]);

    // Redirect if cart empty
    useEffect(() => {
        if (!isLoading && cartItems.length === 0 && !orderPlaced) {
            router.push('/shop');
        }
    }, [cartItems, isLoading, router, orderPlaced]);

    // Scroll to top when order is placed
    useLayoutEffect(() => {
        if (orderPlaced) {
            window.scrollTo({ top: 0, behavior: 'instant' });
        }
    }, [orderPlaced]);


    const handleChange = (e) => {
        const { name, value } = e.target;

        // Input masking for numbers
        if (name === 'phone' || name === 'zipCode') {
            const numericValue = value.replace(/\D/g, '');
            if (name === 'phone' && numericValue.length > 10) return;
            if (name === 'zipCode' && numericValue.length > 6) return;

            setFormData(prev => ({
                ...prev,
                [name]: numericValue
            }));

            // Clear error if valid length reached
            if (name === 'phone' && numericValue.length === 10) {
                setErrors(prev => ({ ...prev, phone: '' }));
            }
            if (name === 'zipCode' && numericValue.length === 6) {
                setErrors(prev => ({ ...prev, zipCode: '' }));
            }
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }

        // Real-time validation for email
        if (name === 'email') {
            if (validateEmail(value)) {
                setErrors(prev => ({ ...prev, email: '' }));
            }
        }
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();

        // Validate all fields before submission
        const newErrors = {};

        if (!validateEmail(formData.email)) {
            newErrors.email = "Please enter a valid email address containing '@'";
        }

        if (!validatePhone(formData.phone)) {
            newErrors.phone = "Phone number must be exactly 10 digits";
        }

        if (!validateZip(formData.zipCode)) {
            newErrors.zipCode = "Zip code must be exactly 6 digits";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const orderData = {
                customer: {
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    address: {
                        street: formData.address,
                        city: formData.city,
                        state: formData.state,
                        zipCode: formData.zipCode,
                        country: 'India'
                    }
                },
                items: cartItems.map(item => ({
                    name: item.name,
                    price: parseFloat(item.price.replace('$', '')),
                    quantity: item.quantity,
                    image: item.image
                })),
                totalAmount: getCartTotal(),
                paymentMethod: 'cod',
                status: 'pending',
                notes: formData.notes || ''
            };

            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });

            const result = await response.json();

            if (response.ok) {
                setOrderPlaced(true);
                clearCart();
                // Store order number for display
                sessionStorage.setItem('lastOrderNumber', result.orderNumber);
            } else {
                throw new Error(result.error || 'Failed to place order');
            }
        } catch (error) {
            console.error('Order error:', error);
            alert('Failed to place order: ' + error.message);
        }
    };

    if (isLoading || authLoading) return null;

    if (orderPlaced) {
        const orderNumber = typeof window !== 'undefined' ? sessionStorage.getItem('lastOrderNumber') : '';
        return (
            <div className={styles.successContainer}>
                <div className={styles.successCard}>
                    <div className={styles.successIcon}>
                        <i className="fas fa-check"></i>
                    </div>
                    <h1>Order Placed Successfully!</h1>
                    {orderNumber && (
                        <p className={styles.orderNumber}>Your order number is: <strong>{orderNumber}</strong></p>
                    )}
                    <p className={styles.successMessage}>
                        Thank you for your order! We've sent a confirmation email to {formData.email}.
                        Our team will process your order and you'll receive shipping updates soon.
                    </p>

                    <div className={styles.actionButtons}>
                        <button onClick={() => router.push(`/track-order?orderNumber=${orderNumber}&email=${formData.email}`)} className={styles.outlineBtnGold}>
                            Track Your Order
                        </button>
                        <button onClick={() => window.print()} className={styles.outlineBtnGreen}>
                            Download Invoice
                        </button>
                    </div>

                    <button onClick={() => router.push('/shop')} className={styles.primaryBtn}>
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    // Show login required message if not logged in
    if (!isLoggedIn()) {
        return (
            <>
                <div className={styles.checkoutPage}>
                    <div className={styles.container}>
                        <div className={styles.loginRequired}>
                            <div className={styles.loginCard}>
                                <div className={styles.loginIcon}>
                                    <i className="fas fa-lock"></i>
                                </div>
                                <h2>Login Required</h2>
                                <p>Please login or create an account to proceed with checkout</p>
                                <button
                                    className={styles.loginBtn}
                                    onClick={() => setShowAuthModal(true)}
                                >
                                    <i className="fas fa-user"></i> Login / Register
                                </button>
                                <button
                                    onClick={() => router.push('/shop')}
                                    className={styles.backToShopBtn}
                                >
                                    <i className="fas fa-arrow-left"></i> Back to Shop
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
            </>
        );
    }

    return (
        <div className={styles.checkoutPage}>
            <div className={styles.container}>
                <button onClick={() => router.push('/shop')} className={styles.backLink}>
                    <i className="fas fa-arrow-left"></i> Back to Shop
                </button>

                <h1 className={styles.pageTitle}>Checkout</h1>


                <div className={styles.grid}>
                    {/* Left Column - Forms */}
                    <div className={styles.formColumn}>
                        <form id="checkoutForm" onSubmit={handlePlaceOrder}>
                            {/* Contact Info */}
                            <div className={styles.section}>
                                <h2>Contact Information</h2>
                                <div className={styles.inputGroup}>
                                    <label>Full Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter your full name"
                                        required
                                    />
                                </div>
                                <div className={styles.row}>
                                    <div className={styles.inputGroup}>
                                        <label>Email Address *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="you@example.com"
                                            className={errors.email ? styles.errorInput : ''}
                                            required
                                        />
                                        {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label>Phone Number *</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="10-digit mobile number"
                                            maxLength="10"
                                            inputMode="numeric"
                                            className={errors.phone ? styles.errorInput : ''}
                                            required
                                        />
                                        {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
                                    </div>
                                </div>
                            </div>

                            {/* Shipping Address */}
                            <div className={styles.section}>
                                <h2>Shipping Address</h2>
                                <div className={styles.inputGroup}>
                                    <label>Street Address *</label>
                                    <textarea
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder="House/Flat No., Building, Street, Area"
                                        required
                                        rows="3"
                                    ></textarea>
                                </div>
                                <div className={styles.rowThree}>
                                    <div className={styles.inputGroup}>
                                        <label>City *</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            placeholder="Enter city"
                                            required
                                        />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label>State *</label>
                                        <input
                                            type="text"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleChange}
                                            placeholder="Enter state"
                                            required
                                        />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label>Zip Code *</label>
                                        <input
                                            type="text"
                                            name="zipCode"
                                            value={formData.zipCode}
                                            onChange={handleChange}
                                            placeholder="6-digit code"
                                            maxLength="6"
                                            inputMode="numeric"
                                            className={errors.zipCode ? styles.errorInput : ''}
                                            required
                                        />
                                        {errors.zipCode && <span className={styles.errorText}>{errors.zipCode}</span>}
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className={styles.section}>
                                <h2>Payment Method</h2>
                                <div className={styles.paymentOption}>
                                    <input type="radio" id="cod" name="payment" checked readOnly />
                                    <label htmlFor="cod">
                                        <div className={styles.radioLabel}>
                                            <span className={styles.paymentTitle}>Cash on Delivery</span>
                                            <span className={styles.paymentDesc}>Pay when your order arrives</span>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            {/* Order Notes */}
                            <div className={styles.section}>
                                <h2>Order Notes (Optional)</h2>
                                <div className={styles.inputGroup}>
                                    <textarea
                                        name="notes"
                                        value={formData.notes}
                                        onChange={handleChange}
                                        placeholder="Any special instructions for your order..."
                                        rows="3"
                                    ></textarea>
                                </div>
                            </div>

                            <button type="submit" className={styles.placeOrderBtn}>
                                Place Order • ${getCartTotal().toFixed(2)}
                            </button>
                        </form>
                    </div>

                    {/* Right Column - Summary */}
                    <div className={styles.summaryColumn}>
                        <div className={styles.summaryCard}>
                            <h2>Order Summary</h2>
                            <div className={styles.itemsList}>
                                {cartItems.map((item) => (
                                    <div key={item.id} className={styles.item}>
                                        <div className={styles.itemImage}>
                                            <img src={item.image} alt={item.name} />
                                            <span className={styles.itemQty}>{item.quantity}</span>
                                        </div>
                                        <div className={styles.itemInfo}>
                                            <h4>{item.name}</h4>
                                            <p>{item.quantity} × {item.price}</p>
                                        </div>
                                        <div className={styles.itemTotal}>
                                            ${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className={styles.pricing}>
                                <div className={styles.priceRow}>
                                    <span>Subtotal</span>
                                    <span>${getCartTotal().toFixed(2)}</span>
                                </div>
                                <div className={styles.priceRow}>
                                    <span>Shipping</span>
                                    <span>Free</span>
                                </div>
                                <div className={styles.freeShippingBanner}>
                                    <i className="fas fa-truck"></i> Free shipping on orders above $50!
                                </div>
                            </div>

                            <div className={styles.totalRow}>
                                <span>Total</span>
                                <span>${getCartTotal().toFixed(2)}</span>
                            </div>

                            <div className={styles.guarantees}>
                                <span><i className="fas fa-shield-alt"></i> 100% Secure</span>
                                <span><i className="fas fa-shipping-fast"></i> Fast Delivery</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

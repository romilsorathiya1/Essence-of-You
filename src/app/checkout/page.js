"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../../context/CartContext';
import styles from '../../styles/Checkout.module.css';

export default function Checkout() {
    const router = useRouter();
    const { cartItems, getCartTotal, clearCart } = useCart();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [orderPlaced, setOrderPlaced] = useState(false);

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
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            router.push('/');
            return;
        }

        const userData = JSON.parse(storedUser);
        setUser(userData);
        setFormData(prev => ({
            ...prev,
            name: userData.name || '',
            email: userData.email || '',
            phone: userData.phone || ''
        }));
        setIsLoading(false);
    }, [router]);

    // Redirect if cart empty
    useEffect(() => {
        if (!isLoading && cartItems.length === 0 && !orderPlaced) {
            router.push('/shop');
        }
    }, [cartItems, isLoading, router, orderPlaced]);

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
                    ...formData,
                    userId: user.id
                },
                items: cartItems.map(item => ({
                    name: item.name,
                    price: parseFloat(item.price.replace('$', '')),
                    quantity: item.quantity,
                    image: item.image
                })),
                totalAmount: getCartTotal(),
                paymentMethod: 'cod',
                status: 'pending'
            };

            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });

            if (response.ok) {
                setOrderPlaced(true);
                clearCart();
                // We show success message here instead of redirecting immediately
            }
        } catch (error) {
            console.error('Order error:', error);
            alert('Failed to place order. Please try again.');
        }
    };

    if (isLoading) return null;

    if (orderPlaced) {
        return (
            <div className={styles.successContainer}>
                <div className={styles.successCard}>
                    <div className={styles.successIcon}>
                        <i className="fas fa-check-circle"></i>
                    </div>
                    <h1>Order Placed Successfully!</h1>
                    <p>Thank you for shopping with Essence of You.</p>
                    <p>A confirmation email has been sent to {formData.email}</p>
                    <button onClick={() => router.push('/shop')} className={styles.continueBtn}>
                        Continue Shopping
                    </button>
                </div>
            </div>
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

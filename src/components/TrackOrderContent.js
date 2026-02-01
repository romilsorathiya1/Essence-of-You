"use client";
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from '../styles/TrackOrder.module.css';

export default function TrackOrderContent() {
    const searchParams = useSearchParams();

    // Initial state from URL params if available
    const [orderId, setOrderId] = useState(searchParams.get('orderNumber') || '');
    const [email, setEmail] = useState(searchParams.get('email') || '');

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [hasSearched, setHasSearched] = useState(false);

    // Auto-search if params exist
    useEffect(() => {
        const urlOrder = searchParams.get('orderNumber');
        const urlEmail = searchParams.get('email');
        if (urlOrder && urlEmail) {
            handleTrack(null, urlOrder, urlEmail);
        }
    }, [searchParams]);

    const handleTrack = async (e, id = orderId, mail = email) => {
        if (e) e.preventDefault();

        if (!id || !mail) {
            setError('Please enter both Order ID and Email');
            return;
        }

        setLoading(true);
        setError('');
        setOrder(null);
        setHasSearched(true);

        try {
            // Fetch all orders for this email and filter by ID
            // Ideally should have a specific endpoint for tracking, but this works
            const res = await fetch(`/api/orders?email=${mail}`);
            if (!res.ok) throw new Error('Failed to fetch orders');

            const orders = await res.json();
            const foundOrder = orders.find(o => o.orderNumber === id);

            if (foundOrder) {
                setOrder(foundOrder);
            } else {
                setError('Order not found. Please check your details.');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const getProgressWidth = (status) => {
        switch (status) {
            case 'pending': return '5%';
            case 'confirmed': return '25%';
            case 'processing': return '50%';
            case 'shipped': return '75%';
            case 'delivered': return '100%';
            default: return '0%';
        }
    };

    const isStepActive = (stepStatus, currentStatus) => {
        const statuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered'];
        const currentIndex = statuses.indexOf(currentStatus);
        const stepIndex = statuses.indexOf(stepStatus);
        return stepIndex <= currentIndex;
    };

    return (
        <div className={styles.trackOrderPage}>
            <div className={styles.container}>
                <h1 className={styles.pageTitle}>Track Your Order</h1>
                <p className={styles.subtitle}>Enter your order details below to check the status</p>

                <div className={styles.searchCard}>
                    <form onSubmit={(e) => handleTrack(e)} className={styles.formGroup}>
                        <div className={styles.inputWrapper}>
                            <label>Order Number</label>
                            <input
                                type="text"
                                placeholder="e.g. EOY24011234"
                                value={orderId}
                                onChange={(e) => setOrderId(e.target.value)}
                            />
                        </div>
                        <div className={styles.inputWrapper}>
                            <label>Email Address</label>
                            <input
                                type="email"
                                placeholder="Email used for checkout"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <button type="submit" className={styles.trackBtn} disabled={loading}>
                            {loading ? 'Tracking...' : 'Track'}
                        </button>
                    </form>
                </div>

                {error && <div className={styles.errorMsg}>{error}</div>}

                {order && (
                    <div className={styles.orderDetails}>
                        <div className={styles.orderHeader}>
                            <h2>Order #{order.orderNumber}</h2>
                            <span className={styles.orderStatus}>{order.status}</span>
                        </div>

                        <div className={styles.orderBody}>
                            {/* Progress Bar */}
                            <div className={styles.progressContainer}>
                                <div className={styles.progressLine}>
                                    <div
                                        className={styles.progressFill}
                                        style={{ width: getProgressWidth(order.status) }}
                                    ></div>
                                </div>
                                <div className={styles.progressBar}>
                                    {['confirmed', 'processing', 'shipped', 'delivered'].map((step) => (
                                        <div key={step} className={`${styles.step} ${isStepActive(step, order.status) ? styles.active : ''}`}>
                                            <div className={styles.stepIcon}>
                                                <i className={`fas fa-${step === 'shipped' ? 'truck' : step === 'delivered' ? 'check' : 'box'}`}></i>
                                            </div>
                                            <div className={styles.stepText}>{step.charAt(0).toUpperCase() + step.slice(1)}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className={styles.infoGrid}>
                                <div className={styles.infoGroup}>
                                    <h3>Shipping Address</h3>
                                    <p>{order.customer.name}</p>
                                    <p>{order.customer.address.street}</p>
                                    <p>{order.customer.address.city}, {order.customer.address.state} {order.customer.address.zipCode}</p>
                                    <p>{order.customer.address.country}</p>
                                    <p>{order.customer.phone}</p>
                                </div>
                                <div className={styles.infoGroup}>
                                    <h3>Order Info</h3>
                                    <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                                    <p>Payment: {order.paymentMethod.toUpperCase()}</p>
                                    <p>Payment Status: {order.paymentStatus}</p>
                                </div>
                            </div>

                            <h3>Order Items</h3>
                            <table className={styles.itemsTable}>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Qty</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.items.map((item, index) => (
                                        <tr key={index}>
                                            <td>
                                                <img src={item.image} alt={item.name} className={styles.itemImage} />
                                                {item.name}
                                            </td>
                                            <td>${item.price.toFixed(2)}</td>
                                            <td>{item.quantity}</td>
                                            <td>${(item.price * item.quantity).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className={styles.totalSection}>
                                <div className={styles.totalRow}>
                                    <span>Subtotal:</span>
                                    <span>${order.totalAmount.toFixed(2)}</span>
                                </div>
                                <div className={styles.totalRow}>
                                    <span>Shipping:</span>
                                    <span>$0.00</span>
                                </div>
                                <div className={`${styles.totalRow} ${styles.finalTotal}`}>
                                    <span>Total:</span>
                                    <span>${order.totalAmount.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

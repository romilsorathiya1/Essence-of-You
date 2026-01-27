"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';
import styles from '../styles/CartModal.module.css';

export default function CartModal() {
    const router = useRouter();
    const {
        cartItems,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        isCartOpen,
        closeCart
    } = useCart();

    const handleCheckout = () => {
        // Check if user is logged in
        const user = localStorage.getItem('user');

        // Close cart first
        closeCart();

        // Scroll to top to prevent jumping
        window.scrollTo({ top: 0, behavior: 'instant' });

        if (user) {
            // User is logged in, redirect to checkout page
            router.push('/checkout');
        } else {
            // User not logged in, show auth modal
            // Dispatch custom event for Header to listen to
            window.dispatchEvent(new Event('openAuthModal'));
        }
    };

    if (!isCartOpen) return null;

    return (
        <div className={styles.overlay} onClick={closeCart}>
            <div className={styles.cartPanel} onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className={styles.cartHeader}>
                    <h2>
                        <i className="fas fa-shopping-bag"></i>
                        Your Cart
                    </h2>
                    <button className={styles.closeBtn} onClick={closeCart}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                {/* Cart Items */}
                {cartItems.length === 0 ? (
                    <div className={styles.emptyCart}>
                        <i className="fas fa-shopping-bag"></i>
                        <p>Your cart is empty</p>
                        <button onClick={closeCart} className={styles.continueBtn}>
                            Continue Shopping
                        </button>
                    </div>
                ) : (
                    <>
                        <div className={styles.cartItems}>
                            {cartItems.map(item => (
                                <div key={item.id} className={styles.cartItem}>
                                    <div className={styles.itemImage}>
                                        <img src={item.image} alt={item.name} />
                                    </div>
                                    <div className={styles.itemDetails}>
                                        <h4>{item.name}</h4>
                                        <p className={styles.itemCategory}>{item.category}</p>
                                        <p className={styles.itemPrice}>{item.price}</p>
                                    </div>
                                    <div className={styles.itemActions}>
                                        <div className={styles.quantityControl}>
                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                                <i className="fas fa-minus"></i>
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                                <i className="fas fa-plus"></i>
                                            </button>
                                        </div>
                                        <button
                                            className={styles.removeBtn}
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className={styles.cartFooter}>
                            <div className={styles.cartTotal}>
                                <span>Total:</span>
                                <span className={styles.totalAmount}>${getCartTotal().toFixed(2)}</span>
                            </div>
                            <button className={styles.checkoutBtn} onClick={handleCheckout}>
                                Proceed to Checkout <i className="fas fa-arrow-right"></i>
                            </button>
                            <button className={styles.clearBtn} onClick={clearCart}>
                                Clear Cart
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

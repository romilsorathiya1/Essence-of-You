"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '../../../styles/Admin.module.css';

export default function AdminOrders() {
    const router = useRouter();
    const [admin, setAdmin] = useState(null);
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const storedAdmin = localStorage.getItem('admin');
        if (!storedAdmin) {
            router.push('/admin/login');
            return;
        }
        setAdmin(JSON.parse(storedAdmin));
        fetchOrders();
    }, [router]);

    const fetchOrders = async () => {
        try {
            const response = await fetch('/api/orders');
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            const response = await fetch(`/api/orders/${orderId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });

            if (response.ok) {
                setOrders(orders.map(order =>
                    order._id === orderId ? { ...order, status: newStatus } : order
                ));
            }
        } catch (error) {
            console.error('Error updating order:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('admin');
        router.push('/admin/login');
    };

    const filteredOrders = orders.filter(order =>
        order.customer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order._id?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Modal logic
    const [selectedOrder, setSelectedOrder] = useState(null);

    const openOrderModal = (order) => {
        setSelectedOrder(order);
    };

    const closeOrderModal = () => {
        setSelectedOrder(null);
    };

    const handlePrint = () => {
        window.print();
    };

    if (!admin) return null;

    return (
        <div className={styles.adminLayout}>
            {/* Sidebar */}
            <aside className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <h2 className={styles.sidebarLogo}>Essence of You</h2>
                    <span className={styles.sidebarTag}>Admin Panel</span>
                </div>

                <ul className={styles.sidebarNav}>
                    <li className={styles.navItem}>
                        <Link href="/admin/dashboard" className={styles.navLink}>
                            <i className="fas fa-th-large"></i>
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link href="/admin/orders" className={`${styles.navLink} ${styles.active}`}>
                            <i className="fas fa-shopping-bag"></i>
                            <span>Orders</span>
                        </Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link href="/admin/contacts" className={styles.navLink}>
                            <i className="fas fa-envelope"></i>
                            <span>Contacts</span>
                        </Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link href="/admin/customizations" className={styles.navLink}>
                            <i className="fas fa-flask"></i>
                            <span>Customizations</span>
                        </Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link href="/admin/products" className={styles.navLink}>
                            <i className="fas fa-box"></i>
                            <span>Products</span>
                        </Link>
                    </li>
                </ul>

                <div className={styles.sidebarFooter}>
                    <button onClick={handleLogout} className={styles.logoutBtn}>
                        <i className="fas fa-sign-out-alt"></i>
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className={styles.mainContent}>
                <div className={styles.pageHeader}>
                    <h1>Orders</h1>
                    <p>Manage and track all customer orders</p>
                </div>

                <div className={styles.tableCard}>
                    <div className={styles.tableHeader}>
                        <h2>All Orders ({orders.length})</h2>
                        <div className={styles.searchBox}>
                            <i className="fas fa-search"></i>
                            <input
                                type="text"
                                placeholder="Search orders..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {isLoading ? (
                        <div className={styles.loading}>
                            <i className="fas fa-spinner fa-spin"></i>
                        </div>
                    ) : filteredOrders.length === 0 ? (
                        <div className={styles.emptyState}>
                            <i className="fas fa-shopping-bag"></i>
                            <h3>No orders found</h3>
                            <p>Orders will appear here once customers start placing them.</p>
                        </div>
                    ) : (
                        <table className={styles.dataTable}>
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Customer</th>
                                    <th>Items</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredOrders.map((order) => (
                                    <tr key={order._id}>
                                        <td>#{order.orderNumber || order._id?.slice(-6).toUpperCase()}</td>
                                        <td>
                                            <div>
                                                <strong>{order.customer?.name || 'N/A'}</strong>
                                                <br />
                                                <small style={{ color: '#888' }}>{order.customer?.email}</small>
                                            </div>
                                        </td>
                                        <td>{order.items?.length || 0} items</td>
                                        <td>${order.totalAmount?.toFixed(2) || '0.00'}</td>
                                        <td>
                                            <select
                                                value={order.status}
                                                onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                                                className={`${styles.statusBadge} ${styles[order.status]}`}
                                                style={{ border: 'none', cursor: 'pointer' }}
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="confirmed">Confirmed</option>
                                                <option value="processing">Processing</option>
                                                <option value="shipped">Shipped</option>
                                                <option value="delivered">Delivered</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
                                        </td>
                                        <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                        <td>
                                            <button
                                                className={`${styles.actionBtn} ${styles.view}`}
                                                onClick={() => openOrderModal(order)}
                                                title="View Details"
                                            >
                                                <i className="fas fa-eye"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </main>

            {/* Order Detail Modal */}
            {selectedOrder && (
                <div className={styles.modalOverlay} onClick={closeOrderModal}>
                    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2>Order Details #{selectedOrder.orderNumber || selectedOrder._id.slice(-6).toUpperCase()}</h2>
                            <button className={styles.closeBtn} onClick={closeOrderModal}>
                                <i className="fas fa-times"></i>
                            </button>
                        </div>

                        <div className={styles.modalBody}>
                            <div className={styles.orderSection}>
                                <h3>Customer Information</h3>
                                <div className={styles.infoGrid}>
                                    <div className={styles.infoItem}>
                                        <label>Full Name</label>
                                        <p>{selectedOrder.customer.name}</p>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <label>Email Address</label>
                                        <p>{selectedOrder.customer.email}</p>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <label>Phone Number</label>
                                        <p>{selectedOrder.customer.phone}</p>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <label>Shipping Address</label>
                                        <p>
                                            {selectedOrder.customer.address.street}, {selectedOrder.customer.address.city},
                                            <br />
                                            {selectedOrder.customer.address.state} - {selectedOrder.customer.address.zipCode}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.orderSection}>
                                <h3>Order Summary</h3>
                                <div className={styles.itemsList}>
                                    {selectedOrder.items.map((item, index) => (
                                        <div key={index} className={styles.orderItem}>
                                            <img src={item.image} alt={item.name} className={styles.itemImage} />
                                            <div className={styles.itemDetails}>
                                                <h4>{item.name}</h4>
                                                <p>Qty: {item.quantity}</p>
                                            </div>
                                            <div className={styles.itemPrice}>
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className={styles.orderSection}>
                                <h3>Payment Info</h3>
                                <div className={styles.infoGrid}>
                                    <div className={styles.infoItem}>
                                        <label>Payment Method</label>
                                        <p>{selectedOrder.paymentMethod.toUpperCase()}</p>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <label>Total Amount</label>
                                        <p style={{ color: '#112F2B', fontSize: '1.2rem', fontWeight: '700' }}>
                                            ${selectedOrder.totalAmount.toFixed(2)}
                                        </p>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <label>Order Date</label>
                                        <p>{new Date(selectedOrder.createdAt).toLocaleString()}</p>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <label>Current Status</label>
                                        <span className={`${styles.statusBadge} ${styles[selectedOrder.status]}`}>
                                            {selectedOrder.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.modalFooter}>
                            <button className={styles.printBtn} onClick={handlePrint}>
                                <i className="fas fa-print"></i> Print Order
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

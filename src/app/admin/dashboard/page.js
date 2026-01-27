"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '../../../styles/Admin.module.css';

export default function AdminDashboard() {
    const router = useRouter();
    const [admin, setAdmin] = useState(null);
    const [stats, setStats] = useState({
        orders: 0,
        revenue: 0,
        customers: 0,
        products: 0
    });
    const [recentOrders, setRecentOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check admin auth
        const storedAdmin = localStorage.getItem('admin');
        if (!storedAdmin) {
            router.push('/admin/login');
            return;
        }
        setAdmin(JSON.parse(storedAdmin));
        fetchData();
    }, [router]);

    const fetchData = async () => {
        try {
            // Fetch orders
            const ordersRes = await fetch('/api/orders');
            const orders = await ordersRes.json();

            // Fetch contacts
            const contactsRes = await fetch('/api/contact');
            const contacts = await contactsRes.json();

            // Calculate stats
            const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

            setStats({
                orders: orders.length,
                revenue: totalRevenue,
                customers: new Set(orders.map(o => o.customer?.email)).size,
                products: 12 // Static for now
            });

            setRecentOrders(orders.slice(0, 5));
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('admin');
        router.push('/admin/login');
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
                        <Link href="/admin/dashboard" className={`${styles.navLink} ${styles.active}`}>
                            <i className="fas fa-th-large"></i>
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link href="/admin/orders" className={styles.navLink}>
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
                    <h1>Dashboard</h1>
                    <p>Welcome back, {admin.name || 'Admin'}!</p>
                </div>

                {/* Stats Grid */}
                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <div className={`${styles.statIcon} ${styles.orders}`}>
                            <i className="fas fa-shopping-bag"></i>
                        </div>
                        <div className={styles.statInfo}>
                            <h3>{stats.orders}</h3>
                            <p>Total Orders</p>
                        </div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={`${styles.statIcon} ${styles.revenue}`}>
                            <i className="fas fa-dollar-sign"></i>
                        </div>
                        <div className={styles.statInfo}>
                            <h3>${stats.revenue.toFixed(2)}</h3>
                            <p>Total Revenue</p>
                        </div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={`${styles.statIcon} ${styles.customers}`}>
                            <i className="fas fa-users"></i>
                        </div>
                        <div className={styles.statInfo}>
                            <h3>{stats.customers}</h3>
                            <p>Customers</p>
                        </div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={`${styles.statIcon} ${styles.products}`}>
                            <i className="fas fa-box"></i>
                        </div>
                        <div className={styles.statInfo}>
                            <h3>{stats.products}</h3>
                            <p>Products</p>
                        </div>
                    </div>
                </div>

                {/* Recent Orders */}
                <div className={styles.tableCard}>
                    <div className={styles.tableHeader}>
                        <h2>Recent Orders</h2>
                        <Link href="/admin/orders" className={styles.actionBtn}>
                            View All
                        </Link>
                    </div>

                    {isLoading ? (
                        <div className={styles.loading}>
                            <i className="fas fa-spinner fa-spin"></i>
                        </div>
                    ) : recentOrders.length === 0 ? (
                        <div className={styles.emptyState}>
                            <i className="fas fa-shopping-bag"></i>
                            <h3>No orders yet</h3>
                            <p>Orders will appear here once customers start placing them.</p>
                        </div>
                    ) : (
                        <table className={styles.dataTable}>
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Customer</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.map((order) => (
                                    <tr key={order._id}>
                                        <td>#{order._id?.slice(-6).toUpperCase()}</td>
                                        <td>{order.customer?.name || 'N/A'}</td>
                                        <td>${order.totalAmount?.toFixed(2) || '0.00'}</td>
                                        <td>
                                            <span className={`${styles.statusBadge} ${styles[order.status]}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </main>
        </div>
    );
}

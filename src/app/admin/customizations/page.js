"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '../../../styles/Admin.module.css';

export default function AdminCustomizations() {
    const router = useRouter();
    const [admin, setAdmin] = useState(null);
    const [customizations, setCustomizations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const storedAdmin = localStorage.getItem('admin');
        if (!storedAdmin) {
            router.push('/admin/login');
            return;
        }
        setAdmin(JSON.parse(storedAdmin));
        fetchCustomizations();
    }, [router]);

    const fetchCustomizations = async () => {
        try {
            const response = await fetch('/api/customizations');
            const data = await response.json();
            setCustomizations(data);
        } catch (error) {
            console.error('Error fetching customizations:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const updateStatus = async (id, newStatus) => {
        try {
            const response = await fetch(`/api/customizations/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });

            if (response.ok) {
                setCustomizations(customizations.map(c =>
                    c._id === id ? { ...c, status: newStatus } : c
                ));
            }
        } catch (error) {
            console.error('Error updating customization:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('admin');
        router.push('/admin/login');
    };

    const filteredCustomizations = customizations.filter(c =>
        c.customer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.customer?.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                        <Link href="/admin/customizations" className={`${styles.navLink} ${styles.active}`}>
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
                    <h1>Custom Perfume Requests</h1>
                    <p>Manage personalized perfume customization orders</p>
                </div>

                <div className={styles.tableCard}>
                    <div className={styles.tableHeader}>
                        <h2>All Customizations ({customizations.length})</h2>
                        <div className={styles.searchBox}>
                            <i className="fas fa-search"></i>
                            <input
                                type="text"
                                placeholder="Search requests..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {isLoading ? (
                        <div className={styles.loading}>
                            <i className="fas fa-spinner fa-spin"></i>
                        </div>
                    ) : filteredCustomizations.length === 0 ? (
                        <div className={styles.emptyState}>
                            <i className="fas fa-flask"></i>
                            <h3>No customization requests</h3>
                            <p>Custom perfume requests will appear here.</p>
                        </div>
                    ) : (
                        <table className={styles.dataTable}>
                            <thead>
                                <tr>
                                    <th>Customer</th>
                                    <th>Scent Profile</th>
                                    <th>Bottle</th>
                                    <th>Gift</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCustomizations.map((c) => (
                                    <tr key={c._id}>
                                        <td>
                                            <strong>{c.customer?.name || 'N/A'}</strong>
                                            <br />
                                            <small style={{ color: '#888' }}>{c.customer?.email}</small>
                                        </td>
                                        <td>
                                            <small>
                                                {c.preferences?.occasion} • {c.preferences?.mood}<br />
                                                {c.preferences?.scentFamily} • {c.preferences?.intensity}
                                            </small>
                                        </td>
                                        <td>
                                            <small>
                                                {c.bottle?.style}<br />
                                                {c.bottle?.color} • {c.bottle?.capStyle}
                                            </small>
                                        </td>
                                        <td>{c.isGift ? 'Yes' : 'No'}</td>
                                        <td>
                                            <select
                                                value={c.status}
                                                onChange={(e) => updateStatus(c._id, e.target.value)}
                                                style={{
                                                    padding: '6px 12px',
                                                    borderRadius: '8px',
                                                    border: '1px solid #ddd',
                                                    fontSize: '0.85rem'
                                                }}
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="processing">Processing</option>
                                                <option value="samples_created">Samples Created</option>
                                                <option value="shipped">Shipped</option>
                                                <option value="completed">Completed</option>
                                            </select>
                                        </td>
                                        <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                                        <td>
                                            <button className={`${styles.actionBtn} ${styles.view}`}>
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
        </div>
    );
}

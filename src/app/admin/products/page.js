"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '../../../styles/Admin.module.css';

export default function AdminProducts() {
    const router = useRouter();
    const [admin, setAdmin] = useState(null);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const storedAdmin = localStorage.getItem('admin');
        if (!storedAdmin) {
            router.push('/admin/login');
            return;
        }
        setAdmin(JSON.parse(storedAdmin));
        fetchProducts();
    }, [router]);

    const fetchProducts = async () => {
        try {
            const response = await fetch('/api/products');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('admin');
        router.push('/admin/login');
    };

    const filteredProducts = products.filter(product =>
        product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchTerm.toLowerCase())
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
                        <Link href="/admin/customizations" className={styles.navLink}>
                            <i className="fas fa-flask"></i>
                            <span>Customizations</span>
                        </Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link href="/admin/products" className={`${styles.navLink} ${styles.active}`}>
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
                    <h1>Products</h1>
                    <p>Manage your perfume catalog</p>
                </div>

                <div className={styles.tableCard}>
                    <div className={styles.tableHeader}>
                        <h2>All Products ({products.length})</h2>
                        <div className={styles.searchBox}>
                            <i className="fas fa-search"></i>
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {isLoading ? (
                        <div className={styles.loading}>
                            <i className="fas fa-spinner fa-spin"></i>
                        </div>
                    ) : filteredProducts.length === 0 ? (
                        <div className={styles.emptyState}>
                            <i className="fas fa-box"></i>
                            <h3>No products found</h3>
                            <p>Add products to your catalog to see them here.</p>
                        </div>
                    ) : (
                        <table className={styles.dataTable}>
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Stock</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.map((product) => (
                                    <tr key={product._id}>
                                        <td>
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' }}
                                            />
                                        </td>
                                        <td><strong>{product.name}</strong></td>
                                        <td>{product.category}</td>
                                        <td>{product.price}</td>
                                        <td>
                                            <span className={`${styles.statusBadge} ${product.inStock ? styles.delivered : styles.cancelled}`}>
                                                {product.inStock ? 'In Stock' : 'Out of Stock'}
                                            </span>
                                        </td>
                                        <td>
                                            <button className={`${styles.actionBtn} ${styles.view}`}>
                                                <i className="fas fa-edit"></i>
                                            </button>
                                            <button className={`${styles.actionBtn} ${styles.delete}`}>
                                                <i className="fas fa-trash"></i>
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

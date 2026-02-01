"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '../../../styles/Admin.module.css';

export default function AdminContacts() {
    const router = useRouter();
    const [admin, setAdmin] = useState(null);
    const [contacts, setContacts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'read', 'unread'
    const [selectedContact, setSelectedContact] = useState(null); // For modal

    useEffect(() => {
        const storedAdmin = localStorage.getItem('admin');
        if (!storedAdmin) {
            router.push('/admin/login');
            return;
        }
        setAdmin(JSON.parse(storedAdmin));
        fetchContacts();
    }, [router]);

    const fetchContacts = async () => {
        try {
            const response = await fetch('/api/contact');
            const data = await response.json();
            setContacts(data);
        } catch (error) {
            console.error('Error fetching contacts:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const updateContactStatus = async (contactId, newStatus) => {
        try {
            const response = await fetch(`/api/contact/${contactId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });

            if (response.ok) {
                setContacts(contacts.map(contact =>
                    contact._id === contactId ? { ...contact, status: newStatus } : contact
                ));
            }
        } catch (error) {
            console.error('Error updating contact:', error);
        }
    };

    const deleteContact = async (contactId) => {
        if (!confirm('Are you sure you want to delete this contact?')) return;

        try {
            const response = await fetch(`/api/contact/${contactId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                setContacts(contacts.filter(contact => contact._id !== contactId));
            }
        } catch (error) {
            console.error('Error deleting contact:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('admin');
        router.push('/admin/login');
    };

    const filteredContacts = contacts.filter(contact => {
        // Search filter
        const matchesSearch = contact.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.subject?.toLowerCase().includes(searchTerm.toLowerCase());

        // Status filter
        let matchesStatus = true;
        if (statusFilter === 'read') {
            matchesStatus = contact.status === 'read';
        } else if (statusFilter === 'unread') {
            matchesStatus = contact.status === 'new' || !contact.status;
        }

        return matchesSearch && matchesStatus;
    });

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
                        <Link href="/admin/contacts" className={`${styles.navLink} ${styles.active}`}>
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
                    <h1>Contact Messages</h1>
                    <p>View and manage customer inquiries</p>
                </div>

                <div className={styles.tableCard}>
                    <div className={styles.tableHeader}>
                        <h2>All Messages ({contacts.length})</h2>
                        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                            <div className={styles.filterGroup}>
                                <button
                                    className={`${styles.filterBtn} ${statusFilter === 'all' ? styles.active : ''}`}
                                    onClick={() => setStatusFilter('all')}
                                >
                                    <i className="fas fa-inbox"></i> All
                                </button>
                                <button
                                    className={`${styles.filterBtn} ${statusFilter === 'unread' ? styles.active : ''}`}
                                    onClick={() => setStatusFilter('unread')}
                                >
                                    <i className="fas fa-envelope"></i> Unread
                                </button>
                                <button
                                    className={`${styles.filterBtn} ${statusFilter === 'read' ? styles.active : ''}`}
                                    onClick={() => setStatusFilter('read')}
                                >
                                    <i className="fas fa-envelope-open"></i> Read
                                </button>
                            </div>
                            <div className={styles.searchBox}>
                                <i className="fas fa-search"></i>
                                <input
                                    type="text"
                                    placeholder="Search messages..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {isLoading ? (
                        <div className={styles.loading}>
                            <i className="fas fa-spinner fa-spin"></i>
                        </div>
                    ) : filteredContacts.length === 0 ? (
                        <div className={styles.emptyState}>
                            <i className="fas fa-envelope"></i>
                            <h3>No messages yet</h3>
                            <p>Contact submissions will appear here.</p>
                        </div>
                    ) : (
                        <table className={styles.dataTable}>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Subject</th>
                                    <th>Message</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredContacts.map((contact) => (
                                    <tr key={contact._id} style={{ fontWeight: contact.status === 'new' || !contact.status ? '600' : 'normal' }}>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                {(contact.status === 'new' || !contact.status) && (
                                                    <span style={{
                                                        width: '8px',
                                                        height: '8px',
                                                        borderRadius: '50%',
                                                        background: '#3498db',
                                                        display: 'inline-block'
                                                    }}></span>
                                                )}
                                                <div>
                                                    <strong>{contact.name}</strong>
                                                    {contact.phone && <><br /><small style={{ color: '#888' }}>{contact.phone}</small></>}
                                                </div>
                                            </div>
                                        </td>
                                        <td>{contact.email}</td>
                                        <td>{contact.subject}</td>
                                        <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {contact.message}
                                        </td>
                                        <td>
                                            <span
                                                className={`${styles.statusBadge} ${contact.status === 'read' ? styles.read : styles.new}`}
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => updateContactStatus(contact._id, contact.status === 'read' ? 'new' : 'read')}
                                            >
                                                {contact.status || 'new'}
                                            </span>
                                        </td>
                                        <td>{new Date(contact.createdAt).toLocaleDateString()}</td>
                                        <td>
                                            <button
                                                className={`${styles.actionBtn} ${styles.view}`}
                                                onClick={() => setSelectedContact(contact)}
                                                title="View Details"
                                            >
                                                <i className="fas fa-eye"></i>
                                            </button>
                                            <button
                                                className={`${styles.actionBtn} ${styles.delete}`}
                                                onClick={() => deleteContact(contact._id)}
                                            >
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

            {/* Contact Detail Modal */}
            {selectedContact && (
                <div className={styles.modalOverlay} onClick={() => setSelectedContact(null)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2>Contact Details</h2>
                            <button className={styles.closeBtn} onClick={() => setSelectedContact(null)}>
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        <div className={styles.modalBody}>
                            <div className={styles.orderSection}>
                                <h3>Contact Information</h3>
                                <div className={styles.infoGrid}>
                                    <div className={styles.infoItem}>
                                        <label>Name</label>
                                        <p>{selectedContact.name}</p>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <label>Email</label>
                                        <p>{selectedContact.email}</p>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <label>Phone</label>
                                        <p>{selectedContact.phone || 'N/A'}</p>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <label>Subject</label>
                                        <p style={{ textTransform: 'capitalize' }}>{selectedContact.subject}</p>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <label>Date Received</label>
                                        <p>{new Date(selectedContact.createdAt).toLocaleString()}</p>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <label>Status</label>
                                        <p>
                                            <span className={`${styles.statusBadge} ${selectedContact.status === 'read' ? styles.read : styles.new}`}>
                                                {selectedContact.status || 'new'}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.orderSection}>
                                <h3>Message</h3>
                                <div style={{
                                    background: '#f9f9f9',
                                    padding: '20px',
                                    borderRadius: '12px',
                                    lineHeight: '1.6',
                                    whiteSpace: 'pre-wrap'
                                }}>
                                    {selectedContact.message}
                                </div>
                            </div>
                        </div>
                        <div className={styles.modalFooter}>
                            <button
                                className={styles.printBtn}
                                onClick={() => {
                                    const mailtoLink = `mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject}`;
                                    window.location.href = mailtoLink;
                                }}
                            >
                                <i className="fas fa-reply"></i>
                                Reply via Email
                            </button>
                            <button
                                className={styles.printBtn}
                                style={{
                                    background: selectedContact.status === 'read' ? 'rgba(52, 152, 219, 0.1)' : 'rgba(149, 165, 166, 0.1)',
                                    borderColor: selectedContact.status === 'read' ? 'rgba(52, 152, 219, 0.3)' : 'rgba(149, 165, 166, 0.3)',
                                    color: selectedContact.status === 'read' ? '#3498db' : '#7f8c8d'
                                }}
                                onClick={() => {
                                    updateContactStatus(selectedContact._id, selectedContact.status === 'read' ? 'new' : 'read');
                                    setSelectedContact({
                                        ...selectedContact,
                                        status: selectedContact.status === 'read' ? 'new' : 'read'
                                    });
                                }}
                            >
                                <i className={`fas fa-${selectedContact.status === 'read' ? 'envelope' : 'envelope-open'}`}></i>
                                Mark as {selectedContact.status === 'read' ? 'Unread' : 'Read'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

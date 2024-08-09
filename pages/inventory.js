// pages/inventory.js
import { useState, useEffect } from 'react';
import { db } from '../firebase'; // Ensure your Firebase setup is correct
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';

const Inventory = () => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({ name: '', quantity: '', category: '', expiration: '' });
    const [lowStockThreshold, setLowStockThreshold] = useState(5);
    const [totalItems, setTotalItems] = useState(0);
    const [lowStockCount, setLowStockCount] = useState(0);
    const [expiringSoonCount, setExpiringSoonCount] = useState(0);
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        const fetchItems = async () => {
            const querySnapshot = await getDocs(collection(db, "inventory"));
            const itemsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setItems(itemsData);
            updateSummary(itemsData);
        };
        fetchItems();
    }, []);

    const updateSummary = (items) => {
        setTotalItems(items.length);
        setLowStockCount(items.filter(item => item.quantity <= lowStockThreshold).length);
        setExpiringSoonCount(items.filter(item => {
            const expirationDate = new Date(item.expiration);
            const today = new Date();
            const timeDiff = expirationDate.getTime() - today.getTime();
            const daysDiff = timeDiff / (1000 * 3600 * 24);
            return daysDiff <= 7;
        }).length);
    };

    const addItem = async (e) => {
        e.preventDefault();
        setIsAdding(true);
        await addDoc(collection(db, "inventory"), newItem);
        setNewItem({ name: '', quantity: '', category: '', expiration: '' });
        const querySnapshot = await getDocs(collection(db, "inventory"));
        const itemsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setItems(itemsData);
        updateSummary(itemsData);
        setIsAdding(false);
    };

    const deleteItem = async (id) => {
        await deleteDoc(doc(db, "inventory", id));
        const querySnapshot = await getDocs(collection(db, "inventory"));
        const itemsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setItems(itemsData);
        updateSummary(itemsData);
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Inventory</h1>
            <div style={styles.summaryContainer}>
                <div style={styles.summaryItem}>
                    <p style={styles.summaryTitle}>Total Items</p>
                    <p style={styles.summaryValue}>{totalItems}</p>
                </div>
                <div style={styles.summaryItem}>
                    <p style={styles.summaryTitle}>Low Stock Items</p>
                    <p style={styles.summaryValue}>{lowStockCount}</p>
                </div>
                <div style={styles.summaryItem}>
                    <p style={styles.summaryTitle}>Expiring Soon</p>
                    <p style={styles.summaryValue}>{expiringSoonCount}</p>
                </div>
            </div>
            <form onSubmit={addItem} style={styles.form}>
                <input 
                    type="text" 
                    placeholder="Name" 
                    value={newItem.name} 
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} 
                    style={styles.input} 
                />
                <input 
                    type="number" 
                    placeholder="Quantity" 
                    value={newItem.quantity} 
                    onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })} 
                    style={styles.input} 
                />
                <input 
                    type="text" 
                    placeholder="Category" 
                    value={newItem.category} 
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })} 
                    style={styles.input} 
                />
                <input 
                    type="date" 
                    placeholder="Expiration" 
                    value={newItem.expiration} 
                    onChange={(e) => setNewItem({ ...newItem, expiration: e.target.value })} 
                    style={styles.input} 
                />
                <button type="submit" style={styles.addButton}>
                    {isAdding ? 'Adding...' : 'Add Item'}
                </button>
            </form>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.tableHeader}>Name</th>
                        <th style={styles.tableHeader}>Quantity</th>
                        <th style={styles.tableHeader}>Category</th>
                        <th style={styles.tableHeader}>Expiration Date</th>
                        <th style={styles.tableHeader}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.id} style={item.quantity <= lowStockThreshold ? styles.lowStockRow : {}}>
                            <td style={styles.tableCell}>{item.name}</td>
                            <td style={styles.tableCell}>{item.quantity}</td>
                            <td style={styles.tableCell}>{item.category}</td>
                            <td style={styles.tableCell}>{item.expiration}</td>
                            <td style={styles.tableCell}>
                                <button onClick={() => deleteItem(item.id)} style={styles.deleteButton}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const styles = {
  container: {
    padding: '40px',
    minHeight: '100vh',
    backgroundImage: 'linear-gradient(to bottom right, #f5f0e1, #e8d9c7)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  heading: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#8B4513',
    textAlign: 'center',
    marginBottom: '20px',
    fontFamily: "'Dancing Script', cursive",
  },
  summaryContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    margin: '20px 0',
    padding: '20px',
    backgroundColor: '#fff8f0',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  summaryItem: {
    textAlign: 'center',
  },
  summaryTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  summaryValue: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#8B4513',
  },
  alert: {
    backgroundColor: '#ffcccc',
    padding: '15px',
    marginBottom: '20px',
    borderRadius: '12px',
    textAlign: 'center',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  form: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  input: {
    flex: '1',
    margin: '0 10px',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  addButton: {
    padding: '10px 20px',
    backgroundColor: '#8B4513',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  addButtonHover: {
    backgroundColor: '#a0522d',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
    fontFamily: "'Arial', sans-serif",
  },
  lowStockRow: {
    backgroundColor: '#fff0f0',
  },
  deleteButton: {
    padding: '5px 10px',
    backgroundColor: '#ff4c4c',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  tableHeader: {
    backgroundColor: '#e8d9c7',
    textAlign: 'left',
    padding: '10px',
    fontSize: '16px',
    color: '#8B4513',
  },
  tableCell: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
  },
};

export default Inventory;

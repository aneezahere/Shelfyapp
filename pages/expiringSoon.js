// pages/expiringSoon.js
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const ExpiringSoon = () => {
  const [expiringItems, setExpiringItems] = useState([]);

  useEffect(() => {
    const fetchExpiringItems = async () => {
      const querySnapshot = await getDocs(collection(db, "inventory"));
      const itemsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      const expiringSoonItems = itemsData.filter(item => {
        const expirationDate = new Date(item.expiration);
        const today = new Date();
        const timeDiff = expirationDate.getTime() - today.getTime();
        const daysDiff = timeDiff / (1000 * 3600 * 24);
        return daysDiff <= 7; // Items expiring within 7 days
      });
      
      setExpiringItems(expiringSoonItems);
    };

    fetchExpiringItems();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Expiring Soon</h1>
      {expiringItems.length === 0 ? (
        <p style={styles.noItems}>No items expiring soon!</p>
      ) : (
        <ul style={styles.list}>
          {expiringItems.map(item => (
            <li key={item.id} style={styles.listItem}>
              <div style={styles.itemDetails}>
                <span style={styles.itemName}>{item.name}</span>
                <span style={styles.itemExpiration}>Expires on: {item.expiration}</span>
              </div>
              <div style={styles.actions}>
                <button style={styles.actionButton}>Use in Recipe</button>
              </div>
            </li>
          ))}
        </ul>
      )}
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
  noItems: {
    textAlign: 'center',
    color: '#555',
    fontSize: '18px',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px',
    marginBottom: '10px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#8B4513',
  },
  itemExpiration: {
    fontSize: '14px',
    color: '#a0522d',
  },
  actions: {
    display: 'flex',
    gap: '10px',
  },
  actionButton: {
    padding: '8px 12px',
    backgroundColor: '#8B4513',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  actionButtonHover: {
    backgroundColor: '#a0522d',
  },
};

export default ExpiringSoon;

// pages/dashboard.js
import React from 'react';
import Image from 'next/image';
import Link from "next/link";

const Dashboard = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.welcomeText}>Welcome to Shelfy</h1>
      <p style={styles.subText}>Your ultimate friend to keep track of your pantry</p>
      <div style={styles.grid}>
        <div style={styles.card}>
          <Link href="/inventory" style={styles.cardLink}>
            <Image src="/inventory.png" alt="Inventory" width={80} height={80} style={styles.icon} />
            <h3 style={styles.cardTitle}>Inventory</h3>
          </Link>
        </div>
        <div style={styles.card}>
          <Link href="/expiringSoon" style={styles.cardLink}>
            <Image src="/deadline.png" alt="Expiration Dates" width={80} height={80} style={styles.icon} />
            <h3 style={styles.cardTitle}>Expiration Dates</h3>
          </Link>
        </div>
        <div style={styles.card}>
          <Link href="/shoppingCart" style={styles.cardLink}>
            <Image src="/grocery-cart.png" alt="Shopping Cart" width={80} height={80} style={styles.icon} />
            <h3 style={styles.cardTitle}>Shopping Cart</h3>
          </Link>
        </div>
        <div style={styles.card}>
          <Link href="/recipeGenerator" style={styles.cardLink}>
            <Image src="/recipe.png" alt="Recipe Generator" width={80} height={80} style={styles.icon} />
            <h3 style={styles.cardTitle}>Recipe Generator</h3>
          </Link>
        </div>
      </div>
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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: '80px',
    fontWeight: 'bold',
    color: '#8B4513',
    textAlign: 'center',
    marginBottom: '20px',
    fontFamily: "'Dancing Script', cursive",
  },
  subText: {
    fontSize: '20px',
    fontWeight: '300',
    color: '#333',
    textAlign: 'center',
    marginBottom: '40px',
    fontFamily: "'Abril Fatface', serif",
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridRowGap: '30px',
    width: '100%',
    maxWidth: '600px',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s',
    cursor: 'pointer',
  },
  cardTitle: {
    color: '#8B4513',
    marginTop: '15px',
    fontSize: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  icon: {
    marginBottom: '15px',
  },
  cardLink: {
    textDecoration: 'none',
  },
  cardHover: {
    transform: 'scale(1.05)',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
  },
};

export default Dashboard;

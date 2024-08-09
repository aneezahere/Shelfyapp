// pages/index.js
import { useRouter } from 'next/router';
import React from 'react';

export default function Home() {
  const router = useRouter();

  const handleStartClick = () => {
    router.push('/signin');
  };

  return (
    <div style={styles.container}>
      <button
        style={styles.startButton}
        onClick={handleStartClick}
      >
        Ready to Explore? Start
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundImage: 'url(/background.png)', // Ensure the image is correctly named and in the public folder
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  startButton: {
    position: 'absolute',
    bottom: '20px',
    right: '20px',
    padding: '15px 30px',
    fontSize: '20px',
    color: '#fff',
    backgroundColor: '#8B4513', // Brown tone
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, background-color 0.3s ease',
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)', // Drop shadow
    animation: 'pulse 2s infinite', // Pulsing animation
  },
};

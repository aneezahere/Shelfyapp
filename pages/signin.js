import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase'; // Ensure this path is correct

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard'); // Redirect to dashboard after sign in
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/dashboard'); // Redirect to dashboard after sign up
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/dashboard'); // Redirect to dashboard after Google sign in
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h1 style={styles.title}>Shelfy</h1>
        <p style={styles.subtitle}>Manage your pantry like a pro.</p>
        <div style={styles.inputContainer}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          {error && <p style={styles.error}>{error}</p>}
        </div>
        <button onClick={handleSignIn} style={styles.button}>Sign In</button>
        <button onClick={handleSignUp} style={{ ...styles.button, ...styles.signUpButton }}>Sign Up</button>
        <button onClick={handleGoogleSignIn} style={{ ...styles.button, ...styles.googleButton }}>Sign In with Google</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundImage: 'url(/background3.png)', // Replace with your background image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  formContainer: {
    padding: '30px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '10px',
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
  },
  title: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#8B4513', // Brown tone
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '18px',
    color: '#666',
    marginBottom: '20px',
  },
  inputContainer: {
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  button: {
    width: '100%',
    padding: '15px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#8B4513', // Brown tone
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '10px',
    transition: 'background-color 0.3s ease',
  },
  signUpButton: {
    backgroundColor: '#A0522D', // Slightly lighter brown
  },
  googleButton: {
    backgroundColor: '#DB4437', // Google red color
  },
  error: {
    color: 'red',
    fontSize: '14px',
    marginBottom: '10px',
  },
};

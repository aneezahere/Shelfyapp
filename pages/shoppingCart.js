// pages/shoppingCart.js
import { useState } from 'react';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', price: '', quantity: '' });
  const [totalCost, setTotalCost] = useState(0);

  const addItemToCart = (e) => {
    e.preventDefault();
    const updatedCart = [...cartItems, newItem];
    setCartItems(updatedCart);
    setNewItem({ name: '', price: '', quantity: '' });
    updateTotalCost(updatedCart);
  };

  const removeItemFromCart = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    updateTotalCost(updatedCart);
  };

  const updateTotalCost = (items) => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalCost(total);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Shopping Cart</h1>
      <form onSubmit={addItemToCart} style={styles.form}>
        <input
          type="text"
          placeholder="Item Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Price"
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) })}
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newItem.quantity}
          onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value, 10) })}
          style={styles.input}
        />
        <button type="submit" style={styles.addButton}>Add to Cart</button>
      </form>
      <ul style={styles.cartList}>
        {cartItems.map((item, index) => (
          <li key={index} style={styles.cartItem}>
            <span>{item.name} - ${item.price} x {item.quantity}</span>
            <button onClick={() => removeItemFromCart(index)} style={styles.removeButton}>Remove</button>
          </li>
        ))}
      </ul>
      <h2 style={styles.totalCost}>Total Cost: ${totalCost.toFixed(2)}</h2>
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
  cartList: {
    listStyleType: 'none',
    padding: 0,
    marginTop: '20px',
  },
  cartItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    marginBottom: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  removeButton: {
    padding: '5px 10px',
    backgroundColor: '#ff4c4c',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  totalCost: {
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '20px',
    color: '#8B4513',
  },
};

export default ShoppingCart;

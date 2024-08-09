import { useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const TestInventory = () => {
    useEffect(() => {
        const testAddItem = async () => {
            try {
                const docRef = await addDoc(collection(db, "inventory_test"), {
                    name: "Test Item",
                    quantity: "1",
                    category: "Test Category",
                    expiration: "2024-01-01"
                });
                alert("Test item added with ID: " + docRef.id);
            } catch (error) {
                alert("Error adding test item: " + error.message);
            }
        };
        testAddItem();
    }, []);

    return (
        <div>
            <h2>Test Inventory Add</h2>
        </div>
    );
};

export default TestInventory;

import { useState, useEffect } from 'react';
import axios from 'axios';

const RecipeGenerator = () => {
    const [pantryItems, setPantryItems] = useState([]);  // Pantry items fetched from your inventory
    const [recipes, setRecipes] = useState([]);
    const [vegan, setVegan] = useState(false);
    const [lowCost, setLowCost] = useState(true);

    useEffect(() => {
        // Fetch pantry items from your Firestore inventory
        const fetchPantryItems = async () => {
            // Assume that you've already fetched these items from Firestore
            // and stored them in `pantryItems` state.
        };

        fetchPantryItems();
    }, []);

    const generateRecipes = async () => {
        const pantryIngredients = pantryItems.map(item => item.name).join(',');

        try {
            const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
                params: {
                    apiKey: process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY,
                    includeIngredients: pantryIngredients,
                    diet: vegan ? 'vegan' : '',  // If vegan option is selected
                    addRecipeInformation: true,
                    fillIngredients: true,
                },
            });

            let filteredRecipes = response.data.results;

            // If lowCost is selected, prioritize recipes using pantry items
            if (lowCost) {
                filteredRecipes = filteredRecipes.filter(recipe =>
                    recipe.missedIngredientCount === 0 || recipe.missedIngredientCount <= 3 // Adjust threshold
                );
            }

            setRecipes(filteredRecipes);
        } catch (error) {
            console.error('Error fetching recipes:', error);
        }
    };

    const addToShoppingCart = (missingIngredients) => {
        // Logic to add missing ingredients to the shopping cart
        // You will fetch or add these items to the cart collection in Firestore.
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Recipe Generator</h1>
            <div style={styles.options}>
                <label style={styles.label}>
                    <input
                        type="checkbox"
                        checked={vegan}
                        onChange={() => setVegan(!vegan)}
                    />
                    Vegan
                </label>
                <label style={styles.label}>
                    <input
                        type="checkbox"
                        checked={lowCost}
                        onChange={() => setLowCost(!lowCost)}
                    />
                    Low Cost (Use Pantry Items)
                </label>
                <button onClick={generateRecipes} style={styles.button}>Generate Recipes</button>
            </div>
            <div style={styles.recipeList}>
                {recipes.map((recipe, index) => (
                    <div key={index} style={styles.recipe}>
                        <h3>{recipe.title}</h3>
                        <ul>
                            {recipe.missedIngredients.length > 0 ? (
                                <li>Missing Ingredients:
                                    <ul>
                                        {recipe.missedIngredients.map((ingredient, idx) => (
                                            <li key={idx}>{ingredient.name}</li>
                                        ))}
                                    </ul>
                                    <button onClick={() => addToShoppingCart(recipe.missedIngredients)} style={styles.addButton}>
                                        Add to Cart
                                    </button>
                                </li>
                            ) : (
                                <li>All ingredients available in pantry!</li>
                            )}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: '#f8f4e3',
        borderRadius: '8px',
    },
    title: {
        fontSize: '24px',
        marginBottom: '20px',
        color: '#8B4513',
        textAlign: 'center',
    },
    options: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
    },
    label: {
        fontSize: '18px',
        color: '#333',
    },
    button: {
        backgroundColor: '#8B4513',
        color: '#fff',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    recipeList: {
        marginTop: '20px',
    },
    recipe: {
        backgroundColor: '#fff',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    addButton: {
        backgroundColor: '#8B4513',
        color: '#fff',
        padding: '5px 10px',
        border: 'none',
        borderRadius: '3px',
        cursor: 'pointer',
        marginTop: '10px',
    }
};

export default RecipeGenerator;

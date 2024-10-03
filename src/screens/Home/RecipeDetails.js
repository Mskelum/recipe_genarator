// RecipeDetails.js
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

const RecipeDetails = ({ route }) => {
  const { recipeId } = route.params; // Get recipeId from navigation params
  const [recipe, setRecipe] = useState(null);
  
  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=a5d95ac3b32a423c976648d39c99f694`);
        setRecipe(response.data);
      } catch (error) {
        console.error('Error fetching recipe details:', error);
      }
    };

    fetchRecipeDetails();
  }, [recipeId]);

  if (!recipe) return <Text>Loading...</Text>;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{recipe.title}</Text>
      <Image source={{ uri: recipe.image }} style={styles.image} />
      <Text style={styles.subtitle}>Ingredients:</Text>
      {recipe.extendedIngredients.map((ingredient, index) => (
        <Text key={index} style={styles.ingredient}>{ingredient.original}</Text>
      ))}
      <Text style={styles.subtitle}>Instructions:</Text>
      <Text style={styles.instructions}>{recipe.instructions}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 200,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    color:'black'
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color:'black'
  },
  ingredient: {
    fontSize: 16,
    marginVertical: 2,
    color:'black'
  },
  instructions: {
    fontSize: 16,
    marginVertical: 10,
    color:'black'
  },
});

export default RecipeDetails;

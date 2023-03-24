import { StyleSheet, View, ScrollView } from "react-native";
import { Card, Text, Tile, Button } from "react-native-elements";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_HOST, API_KEY } from "@env";

export default function CocktailScreen({ route, navigation }) {
  const [cocktail, setCocktail] = useState({});

  const cocktailID = route.params.cocktailID;

  const options = {
    method: "GET",
    url: "https://the-cocktail-db.p.rapidapi.com/lookup.php",
    params: { i: cocktailID },
    headers: {
      "X-RapidAPI-Key": API_KEY,
      "X-RapidAPI-Host": API_HOST,
    },
  };

  useEffect(() => {
    axios
      .request(options)
      .then(function (response) {
        const drink = response.data.drinks[0];
        const cocktail = {
          name: drink.strDrink,
          image: drink.strDrinkThumb,
          instructions: drink.strInstructions,
          ingredients: [
            drink.strIngredient1,
            drink.strIngredient2,
            drink.strIngredient3,
            drink.strIngredient4,
            drink.strIngredient5,
            drink.strIngredient6,
            drink.strIngredient7,
            drink.strIngredient8,
            drink.strIngredient9,
            drink.strIngredient10,
          ],
        };
        setCocktail(cocktail);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.divider}></View>
      <Button
        title='Back to Search'
        buttonStyle={styles.button}
        color='#3D405B'
        onPress={() => navigation.navigate("Search")}
      />

      <Text h1 style={styles.header}>
        {cocktail.name}
      </Text>

      <Tile
        imageSrc={{ uri: cocktail.image }}
        title={""}
        featured
        caption={cocktail.instructions}
      />
      <Card>
        <Card.Title>Ingredients</Card.Title>
        <Card.Divider />
        {cocktail.ingredients.map((ingredient, index) => {
          if (ingredient) {
            return <Text key={index}>{ingredient}</Text>;
          }
        })}
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F9E9",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    color: "#3D405B",
    marginBottom: 20,
  },
  button: {
    marginBottom: 20,
    marginTop: 20,
    backgroundColor: "#3D405B",
  },
  divider: {
    height: 60,
  },
});

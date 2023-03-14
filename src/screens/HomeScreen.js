import { View, StyleSheet } from "react-native";
import React from "react";
import { Button, Card, Text } from "@rneui/themed";
import { API_KEY, API_HOST } from "@env";
import axios from "axios";

export default function HomeScreen() {
  const [cocktail, setCocktail] = React.useState({});
  console.log(cocktail);

  const options = {
    method: "GET",
    url: "https://the-cocktail-db.p.rapidapi.com/random.php",
    headers: {
      "X-RapidAPI-Key": API_KEY,
      "X-RapidAPI-Host": API_HOST,
    },
  };

  React.useEffect(() => {
    axios
      .request(options)
      .then(function (response) {
        const drink = response.data.drinks[0];
        const cocktail = {
          name: drink.strDrink,
          image: drink.strDrinkThumb,
          instructions: drink.strInstructions,
        };
        setCocktail(cocktail);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Welcome to BarHive</Text>
      <Text>Featured Cocktail</Text>
      {cocktail.name && (
        <Card>
          <Card.Title>{cocktail.name}</Card.Title>
          <Card.Image source={{ uri: cocktail.image }} />
          <Card.Divider />
          <Card.Content>
            <Text>{cocktail.instructions}</Text>
          </Card.Content>
          <Card.Divider />
        </Card>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#153243",
  },
});

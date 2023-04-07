import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Card, Text, Tile } from "react-native-elements";
import axios from "axios";
import { API_HOST, API_KEY } from "@env";

export default function HomeScreen() {
  const [cocktail, setCocktail] = React.useState({});
  console.log(cocktail);

  const bull = "\u2022";

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
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        alignItems: "center",
        justifyContent: "center",
        flexGrow: 1,
        marginTop: 20,
      }}>
      <Text h1 style={styles.header}>
        Featured Drink
      </Text>
      {cocktail.name && (
        <View>
          <Tile
            imageSrc={{ uri: cocktail.image }}
            title={""}
            titleStyle={{
              fontFamily: "CrimsonBold",
              color: "#F4F9E9",
              fontWeight: "bold",
              fontSize: 40,
              marginRight: 50,
              marginBottom: 50,
              opacity: 100,
            }}
            activeOpacity={0.75}
            imageContainerStyle={{ height: 400 }}
            overlayContainerStyle={{ opacity: 1 }}
            featured
          />
          <Card
            wrapperStyle={{ backgroundColor: "#14110F", marginBottom: 20 }}
            containerStyle={{ backgroundColor: "#14110F", marginBottom: 20 }}>
            <Card.Title style={styles.cardName}>{cocktail.name}</Card.Title>
            <Card.Divider />
            <Card.Title style={styles.cardHeader}>Ingredients</Card.Title>
            <Card.Divider />
            <View style={{ flexDirection: "column" }}>
              {cocktail.ingredients.map((ingredient, index) => {
                if (ingredient !== null) {
                  return (
                    <Text key={index} style={styles.cardList}>
                      {bull} {ingredient}
                    </Text>
                  );
                }
              })}
            </View>
            <Card.Divider />
            <Text style={styles.cardText}>{cocktail.instructions}</Text>
          </Card>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#34312D",
  },
  header: {
    fontFamily: "CrimsonBold",
    marginTop: 20,
    color: "#D9C5B2",
  },
  cardName: {
    fontFamily: "CrimsonBold",
    color: "#EEF0EB",
    fontSize: 30,
  },
  cardHeader: {
    fontFamily: "Crimson",
    color: "#D9C5B2",
    fontSize: 30,
  },
  cardText: {
    fontFamily: "Crimson",
    color: "#D9C5B2",
    fontSize: 20,
  },
  cardList: {
    fontFamily: "Crimson",
    color: "#D9C5B2",
    fontSize: 18,
    marginLeft: 20,
    marginBottom: 30,
  },
});

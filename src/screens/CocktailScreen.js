import { StyleSheet, View, ScrollView } from "react-native";
import { Card, Text, Tile } from "react-native-elements";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_HOST, API_KEY } from "@env";

export default function CocktailScreen({ route }) {
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
        console.log(response);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Test</Text>
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
});

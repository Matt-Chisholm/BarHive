import { View, StyleSheet } from "react-native";
import React from "react";
import { Card, Text, Tile, Input, Button } from "react-native-elements";
import axios from "axios";
import { API_KEY, API_HOST } from "@env";
import Feather from "react-native-vector-icons/Feather";

export default function SearchScreen() {
  const [results, setResults] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");

  const options = {
    method: "GET",
    url: "https://the-cocktail-db.p.rapidapi.com/filter.php",
    params: { i: searchTerm },
    headers: {
      "x-rapidapi-key": API_KEY,
      "x-rapidapi-host": API_HOST,
    },
  };

  const search = () => {
    axios
      .request(options)
      .then(function (response) {
        const drinks = response.data;
        console.log(drinks);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder='Search for a cocktail by ingredient'
        autoComplete='off'
        value={searchTerm}
        leftIcon={<Feather name='search' size={24} color='#F4F9E9' />}
        inputStyle={{ color: "#F4F9E9" }}
        onChange={(searchTerm) => setSearchTerm(searchTerm)}
      />
      <Button
        buttonStyle={{ backgroundColor: "#F4F9E9" }}
        titleStyle={{ color: "black" }}
        title='Search'
        onPress={search}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
});

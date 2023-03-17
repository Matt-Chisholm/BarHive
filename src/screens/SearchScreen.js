import { View, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { Card, Text, Tile, Input, Button } from "react-native-elements";
import axios from "axios";
import { API_KEY, API_HOST } from "@env";
import Feather from "react-native-vector-icons/Feather";

export default function SearchScreen() {
  const [results, setResults] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [inputValue, setInputValue] = React.useState("");

  const search = () => {
    const formattedSearchTerm = inputValue.trim().toLowerCase();
    setSearchTerm(formattedSearchTerm);
    axios
      .get(
        `https://the-cocktail-db.p.rapidapi.com/filter.php?i=${formattedSearchTerm}`,
        {
          headers: {
            "x-rapidapi-key": API_KEY,
            "x-rapidapi-host": API_HOST,
          },
        }
      )
      .then(function (response) {
        setResults(response.data.drinks);
        console.log(response.data.drinks);
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
        autoCapitalize='none'
        value={inputValue}
        leftIcon={<Feather name='search' size={24} color='#F4F9E9' />}
        inputStyle={{ color: "#F4F9E9" }}
        onChange={(event) => setInputValue(event.nativeEvent.text)}
      />
      <Button
        buttonStyle={{ backgroundColor: "#F4F9E9" }}
        titleStyle={{ color: "black" }}
        title='Search'
        onPress={search}
      />
      {results.length > 0 && (
        <Text style={{ color: "#F4F9E9" }}>
          Showing results for "{searchTerm}"
        </Text>
      )}
      <ScrollView>
        {results.map((result) => (
          <Card
            key={result.idDrink}
            containerStyle={{
              backgroundColor: "black",
              width: "90%",
              marginRight: "20%",
            }}
            wrapperStyle={{ backgroundColor: "black", width: "90%" }}>
            <Card.Title h2>{result.strDrink}</Card.Title>
            <Card.Divider />
            <Tile
              imageSrc={{ uri: result.strDrinkThumb }}
              title={result.strDrink}
              featured
            />
          </Card>
        ))}
      </ScrollView>
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

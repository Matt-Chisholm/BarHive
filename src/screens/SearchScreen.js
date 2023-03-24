import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Card, Text, Tile, Input, Button } from "react-native-elements";
import Feather from "react-native-vector-icons/Feather";
import axios from "axios";
import { API_KEY, API_HOST } from "@env";

export default function SearchScreen({ navigation }) {
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
      <View style={styles.topContainer}>
        <Input
          placeholder='Search by ingredient'
          autoComplete='off'
          autoCapitalize='none'
          value={inputValue}
          leftIcon={
            <Feather
              name='search'
              size={24}
              color='#F4F9E9'
              style={styles.icon}
            />
          }
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.input}
          onChange={(event) => setInputValue(event.nativeEvent.text)}
        />
        <Button
          title='Search'
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
          onPress={search}
        />
      </View>
      {results.length > 0 && (
        <Text style={styles.resultsText}>
          Showing results for "{searchTerm}"
        </Text>
      )}
      <ScrollView style={styles.scrollView}>
        {results.map((result) => (
          <Card
            key={result.idDrink}
            containerStyle={styles.cardContainer}
            wrapperStyle={styles.cardWrapper}>
            <Card.Title h4 style={styles.cardTitle}>
              {result.strDrink}
            </Card.Title>
            <Card.Divider style={styles.cardDivider} />
            <Tile
              imageSrc={{ uri: result.strDrinkThumb }}
              title={result.strDrink}
              width={300}
              featured
              onPress={() => {
                navigation.navigate("Cocktail", {
                  cocktailID: result.idDrink,
                });
              }}
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
    backgroundColor: "#1C1C1E",
  },
  inputContainer: {
    backgroundColor: "#2C2C2E",
    borderRadius: 10,
    borderBottomWidth: 0,
    marginBottom: "-30%",
    marginTop: "20%",
    width: "80%",
    height: "28%",
    alignSelf: "center",
  },
  input: {
    color: "#F4F9E9",
  },
  button: {
    backgroundColor: "#F4F9E9",
    borderRadius: 10,
    width: "30%",
    height: "40%",
    alignSelf: "center",
  },
  buttonTitle: {
    color: "#1C1C1E",
    fontFamily: "CrimsonBold",
  },
  resultsText: {
    color: "#F4F9E9",
    fontSize: 18,
    marginTop: "-60%",
    marginBottom: "5%",
  },
  cardContainer: {
    backgroundColor: "#2C2C2E",
    borderRadius: 10,
    width: "90%",
    height: "auto",
    alignSelf: "center",
    marginBottom: "5%",
  },
  cardWrapper: {
    backgroundColor: "#2C2C2E",
  },
  cardTitle: {
    color: "#F4F9E9",
  },
  cardDivider: {
    backgroundColor: "#F4F9E9",
  },
  scrollView: {
    width: "100%",
    marginBottom: "10%",
    marginTop: "5%",
  },
  topContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "75%",
    backgroundColor: "#1C1C1E",
    justifyContent: "flex-start",
    marginBottom: "-30%",
    borderRadius: 10,
  },
});

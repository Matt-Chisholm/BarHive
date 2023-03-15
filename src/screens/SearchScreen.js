import { View, StyleSheet } from "react-native";
import React from "react";
import { Card, Text, Tile, Input, Button } from "react-native-elements";

export default function SearchScreen() {
  const [results, setResults] = React.useState([]);

  return (
    <View style={styles.container}>
      <Input placeholder='Search for a cocktail by ingredient' />
      <Button
        buttonStyle={{ backgroundColor: "#F4F9E9" }}
        titleStyle={{ color: "black" }}
        title='Search'
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

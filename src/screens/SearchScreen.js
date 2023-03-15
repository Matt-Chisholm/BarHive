import { View, StyleSheet } from "react-native";
import React from "react";
import { Card, Text, Tile } from "react-native-elements";

export default function SearchScreen() {
  return (
    <View style={styles.container}>
      <Text>SearchScreen</Text>
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

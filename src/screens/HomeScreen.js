import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Button } from "@rneui/base";

export default function HomeScreen() {
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button title='Go to Search' />
    </View>
  );
}

const styles = StyleSheet.create({});

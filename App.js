import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { ThemeProvider, createTheme } from "@rneui/themed";
import HomeScreen from "./src/screens/HomeScreen";
import FavoriteScreen from "./src/screens/FavoriteScreen";
import SearchScreen from "./src/screens/SearchScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import CocktailScreen from "./src/screens/CocktailScreen";
import { useFonts } from "expo-font";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const theme = createTheme({
  lightColors: {
    primary: "#D9C5B2",
    secondary: "#F3F3F4",
  },
  darkColors: {
    primary: "#144110F",
    secondary: "#34312D",
  },
  mode: "dark",
  fonts: {
    Sono: "Sono",
    SonoBold: "SonoBold",
    Crimson: "Crimson",
    CrimsonBold: "CrimsonBold",
  },
});

const screenOptions = {
  headerShown: false,
  tabBarStyle: {
    backgroundColor: theme.darkColors.secondary,
    color: theme.darkColors.primary,
    height: 80,
  },
};

export default function App() {
  let [fontsLoaded] = useFonts({
    Sono: require("./assets/fonts/Sono_Proportional-Regular.ttf"),
    SonoBold: require("./assets/fonts/Sono_Proportional-SemiBold.ttf"),
    Crimson: require("./assets/fonts/CrimsonText-Regular.ttf"),
    CrimsonBold: require("./assets/fonts/CrimsonText-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <Tab.Navigator screenOptions={screenOptions}>
          <Tab.Screen
            name='Home'
            component={HomeScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons
                  name='home'
                  color={theme.lightColors.primary}
                  size={size}
                />
              ),
              headerShown: false,
            }}
          />
          <Tab.Screen
            name='Search'
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons
                  name='search'
                  color={theme.lightColors.primary}
                  size={size}
                />
              ),
              headerShown: false,
            }}>
            {(props) => (
              <Stack.Navigator>
                <Stack.Screen
                  name='SearchScreen'
                  component={SearchScreen}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name='Cocktail'
                  component={CocktailScreen}
                  options={{
                    headerShown: false,
                  }}
                />
              </Stack.Navigator>
            )}
          </Tab.Screen>
          <Tab.Screen
            name='Favorite'
            component={FavoriteScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons
                  name='heart'
                  color={theme.lightColors.primary}
                  size={size}
                />
              ),
              headerShown: false,
            }}
          />
        </Tab.Navigator>
      </ThemeProvider>
    </NavigationContainer>
  );
}

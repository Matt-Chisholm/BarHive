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
    primary: "#F4F9E9",
    secondary: "#EEF0EB",
  },
  darkColors: {
    primary: "#153243",
    secondary: "#284B63",
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
    backgroundColor: theme.lightColors.primary,
    color: theme.lightColors.secondary,
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
                  color={theme.darkColors.secondary}
                  size={size}
                />
              ),
              headerShown: false,
            }}
          />
          <Tab.Screen
            name='SearchTab'
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons
                  name='search'
                  color={theme.darkColors.secondary}
                  size={size}
                />
              ),
              headerShown: false,
            }}>
            {(props) => (
              <Stack.Navigator>
                <Stack.Screen
                  name='Search'
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
                  color={theme.darkColors.secondary}
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

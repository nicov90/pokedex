import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome5";
import PokemonNavigation from "./PokemonNavigation";
import FavoriteNavigation from "./FavoriteNavigation";
import AccountNavigation from "./AccountNavigation";

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <Tab.Navigator
      initialRouteName="PokedexNavigation"
      screenOptions={{ tabBarStyle: { backgroundColor: "#ffeeee" } }}
    >
      <Tab.Screen
        name="FavoriteNavigation"
        component={FavoriteNavigation}
        options={{
          headerTitle: "Favorites",
          headerTitleAlign: "center",
          tabBarLabel: "Favorites",
          tabBarInactiveTintColor: "black",
          tabBarActiveTintColor: "#CC0000",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="heart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="PokedexNavigation"
        component={PokemonNavigation}
        options={{
          headerShown: false,
          tabBarInactiveTintColor: "black",
          tabBarLabel: "",
          tabBarIcon: () => renderPokeballImg(),
        }}
      />
      <Tab.Screen
        name="AccountNavigation"
        component={AccountNavigation}
        options={{
          headerTitle: "My Account",
          headerTitleAlign: "center",
          tabBarLabel: "My Account",
          tabBarInactiveTintColor: "black",
          tabBarActiveTintColor: "#CC0000",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const renderPokeballImg = () => (
  <Image
    source={require("../../assets/pokeball.png")}
    style={{
      width: 75,
      height: 75,
      top: -15,
    }}
  />
);

import { View, Text, StyleSheet, Platform } from "react-native";
import React, { useContext } from "react";
import { PokemonDataContext } from "../../context";
import { getColorByPokemonType } from "../../utils/pokemonColors";
import { SafeAreaView } from "react-native-safe-area-context";
import { SvgUri } from "react-native-svg";

export default function Header() {
  const { pokemonData } = useContext<any>(PokemonDataContext);
  const img = pokemonData.sprites.other["dream_world"].front_default;
  const color = getColorByPokemonType(pokemonData.types[0].type.name);

  const containerStyles = { backgroundColor: color, ...styles.container };

  return (
    <SafeAreaView>
      <View style={containerStyles}>
        <SvgUri uri={img} width="65%" height={350} />
        <Text style={styles.mainTitle}>{pokemonData.name}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: Platform.OS === "android" ? -45 : 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingTop: 70,
    paddingBottom: 120,
    paddingHorizontal: 10,
  },
  mainTitle: {
    color: 'black',
    bottom: 15,
    fontWeight: "900",
    fontSize: 36,
    textTransform: 'capitalize',
  }
});

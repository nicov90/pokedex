import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SvgUri } from "react-native-svg";
import React from "react";
import { getColorByPokemonType } from "../utils/pokemonColors";
import { Pressable } from "react-native";

export default function PokemonCard({ data }: Record<string, any>) {
  const navigation = useNavigation<any>();
  const cardColor = getColorByPokemonType(data.types[0].type.name);
  const cardStyles = { backgroundColor: cardColor, ...styles.card };

  const goToPokemon = () => {
    // El Stack Navigator usa el 2do parámetro para pasar información
    // entre Screens
    navigation.navigate("Pokemon", { pokemonData: data });
  };

  return (
    <Pressable style={{ width: "50%" }} onPress={goToPokemon}>
      <View style={cardStyles}>
        <Text style={styles.cardId}>
          {data.id.toString().length > 2 ? (
            <Text style={{ color: 'rgba(0,0,0,0.55)' }}>#0{data.id}</Text>
          ) : (
            <Text style={{ color: 'rgba(0,0,0,0.55)' }}>#00{data.id}</Text>
          )}
        </Text>
        <SvgUri
          width="100%"
          height={100}
          uri={data.sprites.other["dream_world"].front_default}
        />
        <Text style={styles.name}>{data.name}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 170,
    borderRadius: 20,
    margin: 5,
    padding: 15,
  },
  cardId: {
    position: "absolute",
    top: 8,
    left: 10,
    fontWeight: "bold",
    fontSize: 13,
  },
  name: {
    flex: 1,
    transform: [
      {
        translateY: 11,
      },
    ],
    textAlign: "center",
    textTransform: "capitalize",
    color: "black",
    fontWeight: "bold",
    fontSize: 18,
  },
});

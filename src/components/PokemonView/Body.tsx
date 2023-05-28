import { View, ScrollView, SafeAreaView, Text, StyleSheet, Linking } from "react-native";
import React, { useContext } from "react";
import { PokemonType, getColorByPokemonType } from "../../utils/pokemonColors";
import { PokemonDataContext } from "../../context";
import StatsBlock from "./StatsBlock";
import Icon from "react-native-vector-icons/FontAwesome5";

export default function Body() {
  const { pokemonData } = useContext<any>(PokemonDataContext);
  const mainColor = getColorByPokemonType(pokemonData.types[0].type.name);

  const searchPokemonOnYoutube = () => {
    Linking.openURL(`https://www.youtube.com/results?search_query=pokemon+${pokemonData.name}`);
  }
  
  const titleStyles = { color: mainColor, ...styles.titles };
  const getStylesForTypes = (typeName: PokemonType) => {
    return {
      backgroundColor: getColorByPokemonType(typeName),
      padding: 10,
      paddingVertical: 3,
      borderRadius: 10,
      fontSize: 13,
      ...styles.text,
    };
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.centeredView}>
        <View style={styles.div}>
          <View style={styles.topDescriptionContainer}>
            <Text style={titleStyles}>Description</Text>
            <View style={{ flexDirection: "row", gap: 5 }}>
              {pokemonData.types.map((item: any) => (
                <Text
                  key={item.type.url}
                  style={getStylesForTypes(item.type.name)}
                >
                  {item.type.name}
                </Text>
              ))}
            </View>
          </View>
          <Text style={styles.text}>
            Pokemon ID:{" "}
            <Text style={{ fontWeight: "bold" }}>#00{pokemonData.id}</Text>
          </Text>
          <Text style={styles.text}>
            Height:{" "}
            <Text style={{ fontWeight: "bold" }}>
              {pokemonData.height * 10} cm
            </Text>
          </Text>
          <Text style={styles.text}>
            Weight:{" "}
            <Text style={{ fontWeight: "bold" }}>
              {pokemonData.weight / 10} kg
            </Text>
          </Text>
          <Text style={styles.text}>
            Species:{" "}
            <Text style={{ fontWeight: "bold", textTransform: "capitalize" }}>
              {pokemonData.species.name}
            </Text>
          </Text>
          <Text style={styles.text}>
            GExp (Gained Experience):{" "}
            <Text style={{ fontWeight: "bold" }}>
              {pokemonData.base_experience}
            </Text>
          </Text>
        </View>
        <View style={styles.div}>
          <Text style={titleStyles}>Abilities</Text>
          <View>
            {pokemonData.abilities.map((element: any, index: number) => (
              <Text key={element.ability.url} style={styles.text}>
                {index + 1}.{" "}
                <Text style={styles.textCapitalized}>
                  {element.ability.name}
                </Text>
                {element.is_hidden && (
                  <Text
                    style={{
                      fontStyle: "italic",
                      color: "rgba(255,255,255,0.75)",
                    }}
                  >
                    {" "}
                    (hidden)
                  </Text>
                )}
              </Text>
            ))}
          </View>
        </View>
        <View style={styles.div}>
          <StatsBlock titleStyles={titleStyles} />
        </View>
        <View style={{ ...styles.div, marginTop: 25, alignItems: 'center', gap: 5}}>
          <Text style={{ ...styles.text, textAlign: "center"}}>
            Want to watch videos about 
            <Text style={styles.textCapitalized}> {pokemonData.name}?</Text>{" "}
          </Text>
          <View style={{flexDirection: "row", alignItems: 'center', gap: 12}}>
            <Text style={{...styles.text, fontSize: 13}}>Tap here</Text>
            <Icon color='white' name="long-arrow-alt-right" size={30}/>
            <Icon name="youtube" size={45} color='#F11' onPress={searchPokemonOnYoutube}/>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 500,
    gap: 10,
  },
  centeredView: {
    width: "90%",
    backgroundColor: "#222222",
    borderRadius: 10,
    marginTop: -110,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  div: {
    marginHorizontal: 7,
    marginVertical: 6,
  },
  topDescriptionContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  titles: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  text: {
    color: "white",
  },
  textCapitalized: {
    color: "white",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
});

import { View, Text, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { PokemonDataContext } from "../../context";

export default function StatsBlock({titleStyles}: any) {
  const { pokemonData } = useContext<any>(PokemonDataContext);

  const setBarLengthStyle = (stat: string) => {
    let bgColorized;
    let statNum = parseInt(stat);

    if (statNum <= 25) {
      bgColorized = "#ff3e3e";
    } else if (statNum > 25 && statNum < 50) {
      bgColorized = "#FF8700";
    } else if (statNum >= 50 && statNum < 75) {
      bgColorized = "#FFD600";
    } else if (statNum >= 75) {
      bgColorized = "#6EEB83";
    }

    return { 
      width: `${stat}%`,
      backgroundColor: bgColorized,
      ...styles.bar 
    }
  }

  return (
    <View>
      <Text style={titleStyles}>Base Stats</Text>
      <View style={styles.statsBlock}>
        {pokemonData.stats.map((item: any)=> (
          <View key={item.stat.url} style={styles.statsRow}>
            <Text style={styles.statsTitle}>{item.stat.name}</Text>
            <Text style={styles.statsNum}>{item.base_stat}</Text>
            <View style={styles.bgBar}>
              <View style={setBarLengthStyle(item.base_stat)}>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  statsBlock: {
    flexDirection: 'column',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titles: {
    fontSize: 18,
    fontWeight: "bold",
  },
  statsTitle: {
    width: '38%',
    color: 'white',
    textTransform: 'capitalize',
  },
  statsNum: {
    color: 'white',
    fontWeight: 'bold',
    width: 32,
  },
  text: {
    color: 'white',
  },
  bgBar: {
    height: 8,
    borderRadius: 20,
    overflow: 'hidden',
    width: "53%",
    backgroundColor: "#EEEEDE",
  },
  bar: {
    height: 8,
  }
});

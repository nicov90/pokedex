import {
  ActivityIndicator,
  Alert,
  Linking,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { setIsLoading } from "../redux/slices/general";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { pokeApi } from "../api/pokemon";
import PokemonList from "../components/PokemonList";
import { setPokemonList } from "../redux/slices/pokemon";

//! Pagina principal

export default function Pokedex() {
  const pokemonApi = new pokeApi();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state: any) => state.general);
  const { pokemonList } = useSelector((state: any) => state.pokemon);
  // value from api
  const [nextUrl, setNextUrl] = useState<string | null>(null);

  const getPokemons = async () => {
    const { next, newPokemonList } = await pokemonApi.getPokemons(nextUrl);
    setNextUrl(next);
    dispatch(setPokemonList([...pokemonList, ...newPokemonList]));
  };

  useEffect(() => {
    if (pokemonList.length == 0) {
      dispatch(setIsLoading(true));
      (async () => {
        try {
          await getPokemons();
          dispatch(setIsLoading(false));
        } catch (err) {
          Alert.alert(
            "Error",
            "Do you have internet connection? If you do, make sure you have internet permissions enabled and restart the app.",
            [{ text: "Open App Settings", onPress: () => Linking.openSettings() }]
          );
        }
      })();
    }
  }, [pokemonList]);

  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      {isLoading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator animating={isLoading} color="red" size="large" />
        </View>
      )}
      {pokemonList && !isLoading && (
        <PokemonList
          data={pokemonList}
          getPokemons={getPokemons}
          isNext={nextUrl}
        ></PokemonList>
      )}
    </SafeAreaView>
  );
}

//* Solución temporal, arregla el paddingTop
const styles = StyleSheet.create({
  AndroidSafeArea: {
    paddingTop: Platform.OS === "android" ? -55 : 0,
  },
  loaderContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
});

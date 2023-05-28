import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PokemonCard from "../PokemonCard";
import { pokemonListType } from "../../api/pokemon/types";
import { setFavoritesData } from "../../redux/slices/pokemon";
import AnimatedLottieView from "lottie-react-native";
import notFound from '../../../assets/not-found.json';

export default function FavoritesList() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.currentUser);
  const {
    pokemonList,
    favoritesData,
  }: { pokemonList: pokemonListType; favoritesData: pokemonListType } =
    useSelector((state: any) => state.pokemon);
  const { favorites }: { favorites: string[] } = currentUser;

  //* Tengo que enviarle un array con los objetos de favoritos
  useEffect(() => {
    dispatch(
      setFavoritesData(
        pokemonList.filter((pokemon) =>
          favorites.includes(pokemon.id.toString())
        )
      )
    );
  }, [favorites]);

  return (
    <View>
      {favorites.length !== 0 && favoritesData.length !== 0 ? (
        <FlatList
          keyExtractor={(favoritesData) => favoritesData.id}
          data={favoritesData}
          renderItem={({ item }) => <PokemonCard data={item} />}
          numColumns={2}
          showsVerticalScrollIndicator={false}
        ></FlatList>
      ) : (
        <View style={styles.container}>
          <View style={styles.notFoundContainer}>
            <AnimatedLottieView
              style={styles.notFoundGif}
              source={notFound} 
              autoPlay 
              loop
            />
            <Text style={styles.text}>No pokemons here</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(255,255,255,0.65)',
  },
  notFoundContainer: {
    transform: [{
      translateY: -40,
    }],
    alignItems: 'center',
  },
  notFoundGif: {
    height: 175,
    width: 175,
  },
  text: {
    marginTop: -6,
    fontSize: 18,
    fontWeight: "500",
  },
});

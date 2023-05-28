import { ScrollView, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import Header from "../components/PokemonView/Header";
import Body from "../components/PokemonView/Body";
import { PokemonDataContext } from "../context";
import { useDispatch } from "react-redux";
import { setCurrentPokemonId } from "../redux/slices/pokemon";

export default function PokemonPage(props: any) {
  const dispatch = useDispatch();
  const { route } = props;
  const pokemonData = route.params.pokemonData;
  
  useEffect(()=>{
    dispatch(setCurrentPokemonId(pokemonData.id));
  },[]);

  return (
    <PokemonDataContext.Provider value={{pokemonData}}>
      <ScrollView style={bgStyle.page}>
        <Header />
        <Body />
      </ScrollView>
    </PokemonDataContext.Provider>
  );
}
const bgStyle = StyleSheet.create({
  page: {
    backgroundColor: '#333333',
  }
})
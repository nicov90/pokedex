import { FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { useSelector } from 'react-redux';
import React from "react";
import PokemonCard from "./PokemonCard";

export default function PokemonList({ data, getPokemons, isNext }: Record<string, any>) {
  const { isLoading } = useSelector((state: any)=> state.general);
  
  const loadMoreCards = () => {
    getPokemons();
  }

  return (
    <FlatList
      keyExtractor={(data) => data.id}
      data={data}
      renderItem={({ item }) => <PokemonCard data={item} />}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      onEndReached={()=> (!isLoading && isNext) && loadMoreCards()}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        isNext && <ActivityIndicator color='red' size='large' style={styles.spinner} />
      }
    ></FlatList>
  );
}
const styles = StyleSheet.create({
  spinner: {
    marginTop: 20,
    marginBottom: 60,
  }
})
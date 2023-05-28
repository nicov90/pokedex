import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { pokemonListType } from "../../api/pokemon/types";

export type currentPokemonType = {
  pokemonList: pokemonListType,
  currentPokemonId: string,
  favoritesData: pokemonListType,
}

const initialState: currentPokemonType = {
  pokemonList: [],
  currentPokemonId: "",
  favoritesData: [],
}

export const pokemonReducer = createSlice({
  name: "currentPokemon",
  initialState,
  reducers: {
    setPokemonList: (state, action: PayloadAction<pokemonListType>) => {
      state.pokemonList = action.payload;
    },
    setCurrentPokemonId: (state, action: PayloadAction<string>) => {
      state.currentPokemonId = action.payload;
    },
    setFavoritesData: (state, action: PayloadAction<pokemonListType>) => {
      state.favoritesData = action.payload;
    },
  }
})

export const { setCurrentPokemonId, setPokemonList, setFavoritesData } = pokemonReducer.actions;
export default pokemonReducer.reducer;
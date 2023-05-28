import { pokemonListType, pokemonResults } from "./types";
import Constants from 'expo-constants';

export class pokeApi {
  private apiRoot: string = Constants.expoConfig?.extra?.POKEAPI_URL;

  async getPokemons(nextUrl?: string | null) {
    let newPokemonList: pokemonListType = [];
    const limitStr = '30';

    try {
      const {next, results } = 
      await fetch(nextUrl ? nextUrl : `${this.apiRoot}pokemon?offset=0&limit=${limitStr}`)
      .then((res) => res.json());

      const pokemonResults: pokemonResults = results;

      const promises = pokemonResults.map(async (pokemonData) => {
        const pokemon = await fetch(pokemonData.url).then(res => res.json());
        return pokemon;
      });
      newPokemonList = await Promise.all(promises);

      return {next, newPokemonList};
    } catch (error) {
      console.log(error);
      throw new Error("Error al obtener la lista de Pokémon");
    }
  }
  async getPokemon(id: number) {
    try {
      const idStr = id.toString();
      const pokemon = await fetch(`${this.apiRoot}pokemon/${idStr}/`);

      return pokemon;
    } catch (error) {
      console.log(error);
      throw new Error("Error al obtener el pokémon");
    }
  }
}

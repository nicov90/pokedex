export interface pokemonListType extends Array<Record<string, string>> {}
export interface pokemonResults extends pokemonListType {
  name: string,
  url: string,
}
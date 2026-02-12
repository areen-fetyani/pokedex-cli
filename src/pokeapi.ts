export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL ?? `${PokeAPI.baseURL}/location-area`;
    const response = await fetch(url);
    if(!response.ok){
     throw new Error("Failed to fetch locations");
    }
    const data = (await response.json()) as ShallowLocations;
    return data;
  }

  async fetchLocation(locationName: string): Promise<Location> {
    throw new Error("Not implemented yet");
  }
}

export type ShallowLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedAPIResource[];
};

export type Location = {
  name: string;
};

export type NamedAPIResource = {
  name: string;
  url: string;
};

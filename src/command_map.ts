import type { State } from "./state.js";

export async function commandMap(state: State) {
  const data = await state.pokeapi.fetchLocations(state.nextLocationsURL ?? undefined);

  for (const loc of data.results) {
    console.log(loc.name);
  }

  state.nextLocationsURL = data.next;
  state.prevLocationsURL = data.previous;
}

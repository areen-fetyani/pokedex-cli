import { createInterface, type Interface } from "node:readline";
import { getCommands } from "./commands.js";
import { PokeAPI } from "./pokeapi.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => Promise<void>;
};

export type State = {
  rl: Interface;
  commands: Record<string, CLICommand>;
  pokeapi: PokeAPI
  nextLocationsURL: string | null
  prevLocationsURL: string | null
};

export function initState(): State{
  
  const pokeapi = new PokeAPI();
  const nextLocationsURL = null;
  const prevLocationsURL = null;
  
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  }); 
 
  const commands = getCommands();

  return { rl, commands, pokeapi, nextLocationsURL, prevLocationsURL };
}

import { createInterface } from "node:readline";
import { getCommands } from "./commands.js";
import type { State } from "./state.js";

export function cleanInput(input: string): string[]{
  const parts = input.trim().toLowerCase().split(/\s+/);
  return parts;
}

export async function startREPL(state: State) {
  const rl = state.rl;
  const commands = state.commands;

  rl.prompt();
  
  rl.on("line", async (input) => {
   const words = cleanInput(input);

   if ( words.length < 1 ) {
    rl.prompt();
    return;
   }
   
   const command = words[0];
   const commandCallback = commands[command];

   if (!commandCallback) {
    console.log("Unknown command");
   } else {
    try {
     await commandCallback.callback(state);
    } catch (err) {
       console.log(err);
    }
   } 
   rl.prompt();
  });
}



import { createInterface } from "node:readline";
import { getCommands } from "./commands.js";

export function cleanInput(input: string): string[]{
  const parts = input.trim().toLowerCase().split(/\s+/);
  return parts;
}

export function startREPL() {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  rl.prompt();
  
  rl.on("line", (input) => {
   const words = cleanInput(input);

   if ( words.length < 1 ) {
    rl.prompt();
    return;
   }
   const commands = getCommands();
   const command = words[0];
   const commandCallback = commands[command];

   if (!commandCallback) {
    console.log("Unknown command");
   } else {
    try {
     commandCallback.callback(commands);
    } catch (err) {
       console.log(err);
    }
   } 
   rl.prompt();
  });
}



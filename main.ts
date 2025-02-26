/*  CS451 Pet Assignment
*   Vilnis Jatnieks and Chase Morrone
*   main.ts
*
*   This program simulates the Puppy Bowl, our nation's greatest sporting event!
*
*   This file drives the program.
* */


import { Dog, puppyBowl} from './pets';

// Create some pets
const chippy = new Dog("Chippy", 3, "Poodle");
const ollie = new Dog("Ollie", 5, "Labrador");


// Create a competition
const obstacleRace = new puppyBowl(2);
obstacleRace.addParticipant(chippy);
obstacleRace.addParticipant(ollie);

// Start competition
const winner = obstacleRace.startCompetition();
console.log(`The winner is: ${winner.name}!`);


import { Pet, Dog, FoodType, Food, ObstacleCourse} from './pets';

// Create some pets
const chippy = new Dog("Chippy", 3, "Poodle");
const ollie = new Dog("Ollie", 5, "Labrador");


// Create a competition
const obstacleRace = new ObstacleCourse(2);
obstacleRace.addParticipant(chippy);
obstacleRace.addParticipant(ollie);

// Start competition
const winner = obstacleRace.startCompetition();
console.log(`The winner is: ${winner.name}!`);


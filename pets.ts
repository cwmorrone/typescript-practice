/*  CS451 Pet Assignment
*   Vilnis Jatnieks and Chase Morrone
*   pets.ts
*
*   This program simulates the Puppy Bowl, our nation's greatest sporting event!
*
*   ## General overview ##
*   pets.ts:
*       interface Pet
*       class Dog
*       interface Competition
*       class puppyBowl
*   main.ts:
*       create Dog and puppyBowl objects
*       run the simulation
*       output the winner
*   tsconfig.json:
*       set up proper JS version for the libraries we are using
*
*   ## Learning aims ##
*   Writing this program teaches cool things in TS such as:
*       export and import for modularization
*       interfaces
*       classes
*       methods
*       strict equality operator
*       generics
*       union types
*       throw error
*       .filter method for arrays
*       Record to create key, value pairs
*       Object.keys and Object.entries to get key and value arrays
*       random number generation
*
*   ## Stretch goal ##
*   The student is encouraged to expand on the code by:
*       adding additional Pet classes like Cat
*       adding additional Competition classes like catShow or dogRace
*       utilizing the Dog specific Bark method in such competitions
*       adding extra properties or methods
*
*   ## Our goals ##
*   Need to add instructions for setting up and running TS
*   Provide outlines for the stretch goals
*   Overall, make the code easier to understand for a complete beginner
*
*   This file sets up Pet and Competition interfaces to allow the student to experiment by creating their own Classes.
*
* */

export interface Pet {
    name: string;
    species: string;
    age: number;
    energy: number;
    happiness: number;

    play(): void;
    rest(): void;
}

export class Dog implements Pet {
    name: string;
    species = "Dog";
    age: number;
    energy: number;
    happiness: number;
    breed: string;  // Dog-specific property

    constructor(name: string, age: number, breed: string) {
        this.name = name;
        this.age = age;
        this.energy = 100;
        this.happiness = 100;
        this.breed = breed;
    }

    play(): void {
        // Dogs use more energy when playing but get very happy
        this.energy -= 20;
        this.happiness += 25;
    }

    rest(): void {
        this.energy += 30;
    }

    // Dog-specific method
    bark(): string {
        this.energy -= 5;
        return "Woof woof!";
    }
}

export interface Competition<T extends Pet> {
    name: string;
    participants: T[];
    difficultyLevel: 1 | 2 | 3;

    addParticipant(pet: T): void;
    removeParticipant(pet: T): void;
    startCompetition(): T; // Returns the winner
}

export class puppyBowl implements Competition<Dog> {
    name = "Puppy Bowl";
    participants: Dog[] = [];
    difficultyLevel: 1 | 2 | 3; // Union type restricts variable to either 1, 2, or 3

    constructor(difficultyLevel: 1 | 2 | 3 = 1) {
        this.difficultyLevel = difficultyLevel;
    }

    addParticipant(pet: Dog): void {
        this.participants.push(pet);
    }

    removeParticipant(pet: Dog): void {
        this.participants = this.participants.filter(p => p.name !== pet.name);
        // filter is a built-in array method in TS
    }

    startCompetition(): Dog {
        if (this.participants.length === 0) {
            throw new Error("No participants in the competition!");
        }

        /*  Calculate scores based on dog attributes and random factor */
        const scores: Record<string, number> = {}; // Use Record to create key, value pairs

        this.participants.forEach(dog => {  // Use dog => so dog represents the current element

            // Dogs lose energy based on difficulty
            dog.energy -= 10 * this.difficultyLevel;

            // Score calculation includes energy, happiness, and age factors
            const energyFactor = dog.energy / 100;
            const happinessFactor = dog.happiness / 100;
            // Younger dogs perform slightly better
            const ageFactor = 1 - (dog.age / 20); // Assumes dogs don't live past 20

            // Every game has randomness
            const randomFactor = Math.random() * 0.3 + 0.85; // Between 0.85 and 1.15

            // Calculate final score
            scores[dog.name] = (energyFactor * 0.4 + happinessFactor * 0.3 + ageFactor * 0.3) * randomFactor;

            // Dogs get tired but happy after competition
            dog.energy -= 20;
            dog.happiness += 10;
        });

        /* Find winner */
        let winnerName = Object.keys(scores)[0];
        // Retrieves the array of keys from scores and set winnerName to the first value in scores
        let highestScore = scores[winnerName];

        for (const [name, score] of Object.entries(scores)) {
            // Iterates through the array of entries of score
            if (score > highestScore) {
                highestScore = score;
                winnerName = name;
            }
        }

        // Get the top dog
        const winner = this.participants.find(dog => dog.name === winnerName)!;

        // Winner gets extra happiness
        winner.happiness += 15;

        return winner;
    }
}

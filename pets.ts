export interface Pet {
    name: string;
    species: string;
    age: number;
    energy: number;
    happiness: number;

    eat(food: Food): void;
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

    eat(food: Food): void {
        this.energy += food.energyValue;
        // Dogs love meat but are less enthusiastic about vegetables
        if (food.type === "meat") {
            this.happiness += 15;
        } else if (food.type === "vegetable") {
            this.happiness += 5;
        }
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

export type FoodType = "meat" | "vegetable" | "treat";

export interface Food {
    name: string;
    type: FoodType;
    energyValue: number;
}

// Example food implementations
export const dogTreat: Food = {
    name: "Dog Biscuit",
    type: "treat",
    energyValue: 10
};

export const carrot: Food = {
    name: "Carrot",
    type: "vegetable",
    energyValue: 15
};

export interface Competition<T extends Pet> {
    name: string;
    participants: T[];
    difficultyLevel: 1 | 2 | 3;

    addParticipant(pet: T): void;
    removeParticipant(pet: T): void;
    startCompetition(): T; // Returns the winner
}

export class ObstacleCourse implements Competition<Dog> {
    name = "Obstacle Course";
    participants: Dog[] = [];
    difficultyLevel: 1 | 2 | 3;

    constructor(difficultyLevel: 1 | 2 | 3 = 1) {
        this.difficultyLevel = difficultyLevel;
    }

    addParticipant(pet: Dog): void {
        this.participants.push(pet);
    }

    removeParticipant(pet: Dog): void {
        this.participants = this.participants.filter(p => p.name !== pet.name);
    }

    startCompetition(): Dog {
        if (this.participants.length === 0) {
            throw new Error("No participants in the competition!");
        }

        // Calculate scores based on dog attributes and random factor
        const scores: Record<string, number> = {};

        this.participants.forEach(dog => {
            // Dogs lose energy based on difficulty
            dog.energy -= 10 * this.difficultyLevel;

            // Score calculation includes energy, happiness, and age factors
            const energyFactor = dog.energy / 100;
            const happinessFactor = dog.happiness / 100;
            // Younger dogs perform slightly better in obstacle courses
            const ageFactor = 1 - (dog.age / 20); // Assumes dogs don't live past 20

            // Add some randomness
            const randomFactor = Math.random() * 0.3 + 0.85; // Between 0.85 and 1.15

            // Calculate final score
            scores[dog.name] = (energyFactor * 0.4 + happinessFactor * 0.3 + ageFactor * 0.3) * randomFactor;

            // Dogs get tired but happy after competition
            dog.energy -= 20;
            dog.happiness += 10;
        });

        // Find winner
        let winnerName = Object.keys(scores)[0];
        let highestScore = scores[winnerName];

        for (const [name, score] of Object.entries(scores)) {
            if (score > highestScore) {
                highestScore = score;
                winnerName = name;
            }
        }

        const winner = this.participants.find(dog => dog.name === winnerName)!;

        // Winner gets extra happiness
        winner.happiness += 15;

        return winner;
    }
}

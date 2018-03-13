export class User {
    id: number;
    name: string;
    avatar: string;
    numClaps: number;
    skills: string[] = [];
    avatar2: {
        skinPigment: string;
        hairColor: string;
        shirtColor: string;
    };
}

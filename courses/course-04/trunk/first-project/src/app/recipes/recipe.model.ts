export class Recipe {
    public name: string;
    public description: string;
    public imagePath: string;

    constructor(n: string, d: string, ip: string) {
        this.name = n;
        this.description = d;
        this.imagePath = ip;
    }
}

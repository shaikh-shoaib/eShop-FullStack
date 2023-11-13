export class Product {
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public unitPrice: number,
        public imageUrl: string,
        public unitsInStock: number,
        public ratings: number
    ) {}
}
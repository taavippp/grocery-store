export default class Product {
	name: string;
	imageUrl: string;
	price: number;

	constructor(name: string, imageUrl: string, price: number) {
		this.name = name;
		this.imageUrl = imageUrl;
		this.price = price;
	}
}

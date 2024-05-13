import Product from "./Product";

export default class AppState {
	signedIn: boolean = false;
	shoppingCart: Array<Product> = [];
}

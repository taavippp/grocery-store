import { addDoc, deleteDoc, getDocs, query, where } from "firebase/firestore";
import Product from "../model/Product";
import { firebase } from "../main";

export default class ProductCollection {
	static async create(product: Product): Promise<void> {
		await addDoc(firebase.productCollection, { ...product });
	}

	static async findAll(): Promise<Array<Product>> {
		const docs = await getDocs(firebase.productCollection);
		const products: Array<Product> = [];
		docs.forEach((doc) => products.push(doc.data() as Product));
		return products;
	}

	static async deleteById(id: number): Promise<void> {
		const q = query(firebase.productCollection, where("id", "==", id));
		const docs = await getDocs(q);
		docs.forEach((doc) => deleteDoc(doc.ref));
	}
}

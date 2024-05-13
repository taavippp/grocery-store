<script setup lang="ts">
import { inject, toRaw } from "vue";
import ProductCollection from "../collection/ProductCollection";
import AppState from "../model/AppState";
import Product from "../model/Product";

const appState: AppState = inject("appState")!;

const products: Array<Product> = await ProductCollection.findAll();

function addToCart(index: number) {
	const product: Product = products[index];
	appState.shoppingCart.push(product);
	console.log(index, product, toRaw(appState.shoppingCart));
}
</script>

<template>
	<div id="grid">
		<div id="product" v-for="(product, index) in products">
			<img
				:src="product.imageUrl"
				:alt="product.name"
				id="product_image"
			/>
			<p>
				{{ product.name }}
			</p>
			<div id="price_and_add">
				{{ product.price / 100 }} €
				<img
					id="add_button"
					src="../assets/plus-circle.svg"
					@click="addToCart(index)"
				/>
			</div>
		</div>
	</div>
</template>

<style scoped>
div#grid {
	display: grid;
	gap: 1rem 1rem;
	grid-template-columns: auto auto auto;
}

div#product {
	display: flex;
	flex-direction: column;
	align-items: center;
}

img#product_image {
	width: 225px;
	min-width: 100px;
	outline: 1px solid gray;
	border-radius: 10%;
}

p {
	margin: 0;
}

div#price_and_add {
	display: flex;
	min-width: 100px;
	align-items: center;
	justify-content: space-evenly;
}

img#add_button:hover {
	cursor: pointer;
}
</style>

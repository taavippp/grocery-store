<script setup lang="ts">
import { Ref, provide, reactive, ref } from "vue";
import AppState from "./model/AppState";
import UserEntryForm from "./components/UserEntryForm.vue";
import StoreFront from "./components/StoreFront.vue";

const appState: AppState = reactive(new AppState());
provide("appState", appState);
const displayCart: Ref<boolean> = ref(false);
const totalSum: Ref<number> = ref(0);

function onCartClick() {
	displayCart.value = !displayCart.value;
	totalSum.value = 0;
	appState.shoppingCart.forEach((product) => {
		totalSum.value += product.price;
	});
}

function onPurchaseClick() {
	appState.shoppingCart = [];
	totalSum.value = 0;
}
</script>

<template>
	<div>
		<header>
			<h1>The Most Grocery Store Ever</h1>
			<div>
				{{ appState.shoppingCart.length }}
				<img
					src="./assets/cart.svg"
					id="cart_button"
					@click="onCartClick"
				/>
			</div>
		</header>
		<div id="content">
			<UserEntryForm v-if="!appState.signedIn" />
			<Suspense v-else>
				<StoreFront />
			</Suspense>
		</div>
		<div id="cart" v-show="displayCart">
			<table>
				<tr v-for="product in appState.shoppingCart">
					<td>{{ product.name }}</td>
					<td>{{ product.price / 100 }} €</td>
				</tr>
				<tr>
					<td>Total</td>
					<td>{{ totalSum / 100 }} €</td>
				</tr>
			</table>
			<button
				:disabled="appState.shoppingCart.length == 0"
				id="purchase_button"
				@click="onPurchaseClick"
			>
				Purchase
			</button>
		</div>
	</div>
</template>

<style scoped>
div#content {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
}

header {
	border-bottom: 2px solid blue;

	font-family: "Bebas Neue", sans-serif;
	text-align: left;
	font-size: 1.5rem;

	position: sticky;

	margin-bottom: 1rem;

	display: flex;
	justify-content: space-between;
}

img#cart_button {
	width: 3rem;
	margin-right: 1rem;
	margin-top: 0.75rem;
}

img#cart_button:hover {
	cursor: pointer;
}

div#cart {
	position: absolute;
	right: 25%;
	top: 0%;
	left: 25%;

	background-color: #bbbbbb;

	width: 50%;
	height: 100%;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	overflow-y: scroll;
}

td {
	border: 2px solid #888888;
	padding: 0.5rem 1rem 0.5rem 1rem;
}
</style>

<script setup lang="ts">
import { Ref, inject, ref } from "vue";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebase } from "../main";
import AppState from "../model/AppState";

const appState: AppState = inject("appState")!;
const email: Ref<string> = ref("");
const password: Ref<string> = ref("");

async function signUp() {
	createUserWithEmailAndPassword(firebase.auth, email.value, password.value)
		.then((_) => {
			console.log(`User ${email.value} registered`);
			appState.signedIn = true;
		})
		.catch((e) => {
			console.error(
				`Firebase error ${e.code} occurred with Authentication: ${e.message}`
			);
		});
}
</script>

<template>
	<form @submit.prevent="signUp">
		<h2>Sign up</h2>
		<label for="name">Email</label>
		<input type="email" v-model="email" />
		<label for="password">Password</label>
		<input type="password" v-model="password" />
		<input type="submit" value="Sign up" />
	</form>
</template>

<style scoped>
form {
	display: flex;
	flex-direction: column;
	align-items: start;
}

input[type="submit"] {
	margin-top: 0.5rem;
}

input,
h2 {
	align-self: center;
}
</style>

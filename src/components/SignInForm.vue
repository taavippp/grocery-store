<script setup lang="ts">
import { signInWithEmailAndPassword } from "firebase/auth";
import { Ref, inject, ref } from "vue";
import { firebase } from "../main";
import AppState from "../model/AppState";

const appState: AppState = inject("appState")!;
const email: Ref<string> = ref("");
const password: Ref<string> = ref("");

async function signIn() {
	signInWithEmailAndPassword(firebase.auth, email.value, password.value)
		.then((_) => {
			console.log(`User ${email.value} signed in`);
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
	<form @submit.prevent="signIn">
		<h2>Sign in</h2>
		<label for="name">Email</label>
		<input type="email" v-model="email" />
		<label for="password">Password</label>
		<input type="password" v-model="password" />
		<input type="submit" value="Sign in" />
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

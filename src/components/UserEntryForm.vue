<script setup lang="ts">
import SignUpForm from "./SignUpForm.vue";
import SignInForm from "./SignInForm.vue";
import { Ref, ref } from "vue";

const signingIn: Ref<boolean> = ref(true);

function changeUserEntryMethod() {
	signingIn.value = !signingIn.value;
}
</script>

<template>
	<button @click="changeUserEntryMethod">
		Go to sign {{ signingIn ? "up" : "in" }}
	</button>
	<Suspense v-if="signingIn">
		<SignInForm />
	</Suspense>
	<Suspense v-else>
		<SignUpForm />
	</Suspense>
</template>

<style scoped></style>

<script lang="ts">  
	
	import Header from '$lib/Header.svelte';
  	import { onMount } from 'svelte';

	let name = '';
	let email = '';
	let message = '';
	let success = false;

	function handleSubmit() {
		console.log({ name, email, message });
		success = true;
		name = '';
		email = '';
		message = '';
		setTimeout(() => (success = false), 3000);
	}

	let scrolled = false;

	onMount(() => {
		const handleScroll = () => {
		scrolled = window.scrollY > 30;
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>


<Header {scrolled} />

<!-- ✅ Background fixé -->
<img src="/image%20principale/background.png" alt="background" class="fixed w-full h-full object-cover top-0 left-0 -z-10" />

<!-- ✅ Conteneur centré -->
<main class="pt-[8rem] flex justify-center items-start min-h-screen px-4">
	<div class="backdrop-blur-md bg-white/40 border border-white/30 rounded-xl shadow-xl p-8 w-full max-w-xl">
		<h1 class="text-2xl font-bold mb-4 text-center text-gray-800">Contactez-nous</h1>

		{#if success}
			<p class="success text-green-800 bg-green-100 border border-green-300 rounded-md px-4 py-2 mb-4 text-center">
				✅ Votre message a bien été envoyé !
			</p>
		{/if}

		<form on:submit|preventDefault={handleSubmit} class="space-y-4">
			<div class="form-group flex flex-col">
				<label for="name" class="font-semibold mb-1">Nom :</label>
				<input id="name" type="text" bind:value={name} required class="input" />
			</div>

			<div class="form-group flex flex-col">
				<label for="email" class="font-semibold mb-1">Email :</label>
				<input id="email" type="email" bind:value={email} required class="input" />
			</div>

			<div class="form-group flex flex-col">
				<label for="message" class="font-semibold mb-1">Message :</label>
				<textarea id="message" bind:value={message} required class="input min-h-[120px] resize-none"></textarea>
			</div>

			<button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg">
				Envoyer
			</button>
		</form>
	</div>
</main>


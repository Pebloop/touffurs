<script lang="ts">  
	
	import Header from '$lib/Header.svelte';
  	import { onMount } from 'svelte';
	import Footer from '$lib/Footer.svelte';
	import { fade } from 'svelte/transition';

	let Nom = '';
	let Email = '';
	let Message = '';
	let success = false;

	let showPopup = false;

	async function handleSubmit() {
		console.log("✉️ Soumission du formulaire");

		try {
			const response = await fetch('https://app-fff52561-df06-4c55-a0e9-7abe82722bca.cleverapps.io/api/contacts', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					data: {
						Nom,
						Email,
						Message,
					},
				}),
			});

			if (!response.ok) {
				console.error('Erreur lors de l’envoi :', await response.json());
				return;
			}

			success = true;
			showPopup = true;
			Nom = '';
			Email = '';
			Message = '';

			setTimeout(() => {
				success = false;
				showPopup = false;
			}, 5000);

		} catch (error) {
			console.error('Erreur réseau :', error);
		}
	}



</script>


<Header/>

{#if showPopup}
	<div transition:fade class="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white font-semibold py-2 px-4 rounded-lg shadow-lg z-50">
		✅ Message envoyé
	</div>
{/if}

<div class="fixed-background"></div>

<!-- ✅ Conteneur centré -->
<main class="pt-[8rem] flex justify-center items-start min-h-screen px-4 bg-special-green">
	<div class="backdrop-blur-md bg-white/40 border border-white/30 rounded-xl shadow-xl p-8 w-full max-w-xl">
		<h1 class="text-2xl font-bold mb-4 text-center text-gray-800">Contactez-nous</h1>

		{#if success}
			<p class="success text-green-800 bg-green-100 border border-green-300 rounded-md px-4 py-2 mb-4 text-center">
				✅ Votre message a bien été envoyé !
			</p>
		{/if}

		<form on:submit|preventDefault={handleSubmit} class="space-y-4">
			<!-- ✅ Champs du formulaire -->
			<div class="form-group flex flex-col">
				<label for="name" class="font-semibold mb-1">Nom :</label>
				<input id="name" type="text" bind:value={Nom} required class="input" />
			</div>
			
			<div class="form-group flex flex-col">
				<label for="email" class="font-semibold mb-1">Email :</label>
				<input id="email" type="email" bind:value={Email} required class="input" />
			</div>

			<div class="form-group flex flex-col">
				<label for="message" class="font-semibold mb-1">Message :</label>
				<textarea id="message" bind:value={Message} required class="input min-h-[120px] resize-none"></textarea>
			</div>

			<button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg">
				Envoyer
			</button>
		</form>
	</div>
</main>

<Footer/>
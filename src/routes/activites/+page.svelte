<script lang="ts">  
	
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
  	import { onMount } from 'svelte';

</script>

<Header/>

<div class="fixed-background"></div>

<!-- ✅ Conteneur centré -->
<main class="pt-[1rem] flex justify-center items-start min-h-screen px-4 bg-special-green">
    <div class="mt-30 mb-10 prose prose-invert w-[70%] mx-auto p-8 backdrop-blur-md bg-white/40 border border-white/30 rounded-xl shadow-xl">
        <h2 class="text-2xl font-bold text-center mb-4">Page en cours de construction</h2>
        <p class="text-center">Cette page sera bientôt disponible. Merci de votre compréhension !</p>
    </div>	
</main>

<Footer/>
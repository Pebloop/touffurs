<script lang="ts">
	import { onMount } from 'svelte';

	interface SocialLink {
		id: number;
		name: string;
		link: string;
		icon: string;
	}

	let socials: SocialLink[] = [];

	onMount(async () => {
		try {
		const res = await fetch('https://app-fff52561-df06-4c55-a0e9-7abe82722bca.cleverapps.io/api/reseaux-sociauxes?populate=*');
		if (!res.ok) throw new Error(`Erreur HTTP: ${res.status}`);

		const data = await res.json();
		socials = data.data.map((item: any) => ({
			id: item.id,
			name: item.name,
			link: item.link,
			icon: item.miniatureURL
		}));
		} catch (error) {
		console.error('Erreur lors du chargement des réseaux sociaux:', error);
		}
	});
</script>

<!-- src/lib/Footer.svelte -->
<footer class="bg-gray-900 text-white w-full px-6 py-12">
	<div class="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
		
		<!-- Touffurs -->
		<div>
			<h2 class="text-xl font-bold mb-2">Touffurs</h2>
			<p class="text-sm">Une convention organisée par l'association Toulouse Fur.</p>
		</div>

		<!-- À propos -->
		<div>
			<h2 class="text-xl font-bold mb-2">À propos</h2>
			<ul class="space-y-1 text-sm">
				<li><a href="/conditions" class="hover:underline">Termes et conditions</a></li>
				<li><a href="/legal" class="hover:underline">Mentions légales</a></li>
			</ul>
		</div>

		<!-- Contact -->
		<div>
			<h2 class="text-xl font-bold mb-2">Contact</h2>
			<ul class="space-y-1 text-sm">
				<li><a href="staff" class="hover:underline">Staff</a></li>
				<li><a href="safety" class="hover:underline">Safety</a></li>
			</ul>
		</div>

		<!-- Réseaux -->
		<div>
		<h2 class="text-xl font-bold mb-2">Suivez-nous</h2>
		<ul class="space-y-1 text-sm">
			{#each socials as social}
			<li class="flex items-center gap-2">
				<img src={social.icon} alt={social.name} class="w-5 h-5 inline" />
				<a href={social.link} target="_blank" class="hover:underline">{social.name}</a>
			</li>
			{/each}
		</ul>
		</div>
	</div>

	<p class="text-center text-xs text-gray-400 mt-1">
		© {new Date().getFullYear()} Toulouse Fur. Tous droits réservés.
	</p>
</footer>

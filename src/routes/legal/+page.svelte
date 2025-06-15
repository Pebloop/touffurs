<script lang="ts">  
	
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
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

</script>


<Header/>

<div class="fixed-background"></div>

<!-- ✅ Conteneur centré -->
<main class="pt-[1rem] flex justify-center items-start min-h-screen px-4 bg-special-green">
    <div class="mt-30 mb-10 prose prose-invert w-[70%] mx-auto p-8 backdrop-blur-md bg-white/40 border border-white/30 rounded-xl shadow-xl">
		<h1 class="text-3xl font-bold text-center mb-4">Mentions légales</h1>

		<section>
			<h2 class="text-xl font-semibold">Éditeur du site</h2>
			<p>
				Le site <strong>touffurs.fr</strong> est édité par <strong>l'association Toulouse Fur</strong>, association loi 1901 à but non lucratif.
			</p>
			<p>
				Adresse : <em>[adresse complète ici]</em><br />
				Email : <em>[adresse@email.com]</em>
			</p>
			<p>
				Déclarée à la préfecture de Haute-Garonne.
			</p>
		</section>

		<section>
			<h2 class="text-xl font-semibold">Directeur de la publication</h2>
			<p>
				Le directeur de la publication est le président de l’association <strong>Toulouse Fur</strong>.
			</p>
		</section>

		<section>
			<h2 class="text-xl font-semibold">Hébergement</h2>
			<p>
				Le site est hébergé par :<br />
				<strong>Clever Cloud SAS</strong><br />
				3 rue de l’Allier, 44000 Nantes, France<br />
				Site : <a href="https://www.clever-cloud.com" class="underline hover:text-blue-300" target="_blank">clever-cloud.com</a><br />
				Email : <a href="mailto:support@clever-cloud.com" class="underline hover:text-blue-300">support@clever-cloud.com</a>
			</p>
		</section>

		<section>
			<h2 class="text-xl font-semibold">Propriété intellectuelle</h2>
			<p>
				Tous les contenus (textes, images, vidéos, graphismes, logos...) sont la propriété de <strong>Toulouse Fur</strong>, sauf mention contraire. Toute reproduction ou utilisation non autorisée est interdite.
			</p>
		</section>

		<section>
			<h2 class="text-xl font-semibold">Responsabilité</h2>
			<p>
				<strong>Toulouse Fur</strong> ne saurait être tenue responsable des dommages directs ou indirects liés à l'utilisation du site. Les liens externes présents sur le site relèvent de la seule responsabilité de leurs éditeurs.
			</p>
		</section>

		<section>
			<h2 class="text-xl font-semibold">Données personnelles</h2>
			<p>
				Aucune donnée personnelle n’est collectée sans votre consentement. Conformément au RGPD, vous pouvez demander l’accès, la rectification ou la suppression de vos données par email à : <a href="mailto:contact@touffurs.fr" class="underline hover:text-blue-300">contact@touffurs.fr</a>
			</p>
		</section>

		<section>
			<h2 class="text-xl font-semibold">Cookies</h2>
			<p>
				Ce site utilise des cookies pour le fonctionnement et les statistiques. Vous pouvez les gérer dans les paramètres de votre navigateur.
			</p>
		</section>
	</div>	
</main>

<Footer/>
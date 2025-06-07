<script lang="ts">
	import { gsap } from "gsap";
	import { MotionPathPlugin } from "gsap/MotionPathPlugin";
	import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
	import { ScrollTrigger } from "gsap/ScrollTrigger";
	import { onMount } from 'svelte';
	import Header from '$lib/Header.svelte';


</script>

<Header/>

	<div class="">
	<div class="flex flex-col items-center justify-center title w-96">
		<img src="/logo.png" alt="Logo" class="z-10"/>
		<h1 class="text-xl text-white font-bold text-center z-10">Des vacances tout en furs !</h1>
	</div>
	<div class="flex flex-col items-center justify-center dates z-10">
		<h1 class="text-3xl font-bold text-center m-4">Du 10 au 13 juillet 2026</h1>
	</div>
	<div class="flex flex-col items-center justify-center z-10 inscriptions">
		<button class="text-3xl font-bold text-center m-4 mb-0" disabled>Inscriptions fermées</button>
		<h1 class="text-xl font-bold text-center m-4 mt-0">Ouverture le 4 mai 2026 à 18h</h1>
	</div>
	
	<img src="/image%20principale/background.png" alt="background" class="w-full h-auto absolute left-0 top-0" />
	<img src="/image%20principale/chococat_base.png" alt="chococat-base" class="absolute h-auto chococat-base" />
	<img src="/image%20principale/chococat_queue.png" alt="chococat-queue" class="absolute h-auto chococat-queue" />
	<img src="/image%20principale/chococat_bras.png" alt="chococat-bras" class="absolute h-auto chococat-bras" />
	<img src="/image%20principale/chacolatine_base.png" alt="chacolatine" class="absolute h-auto chacolatine-base" />
	<img src="/image%20principale/chacolatine_bras.png" alt="chacolatine-bras" class="absolute h-auto chacolatine-bras" />
	<img src="/image%20principale/chacolatine_queue.png" alt="chacolatine-queue" class="absolute h-auto chacolatine-queue" />
	<img src="/image%20principale/ballon.png" alt="ballon" class="absolute h-auto ballon" />
	</div>

<div class="bg-special-green">
	<div class="h-screen"></div>
	<div class="svg-container">
		<div class="start-div"></div>
		<svg id="svg" viewBox="0 0 900 2500">

			<path id="path" />

			<circle r="15" cx="450" cy="1600" class="bullet-point" />
			<text x="420" y="1600" class="bullet-point-text" text-anchor="end" dominant-baseline="middle">
				15 avril 2026
				annonce de la convention
			</text>

			<circle r="15" cx="450" cy="1800" class="bullet-point" />
			<text x="480" y="1800" class="bullet-point-text" text-anchor="start" dominant-baseline="middle">
				1er mai 2026
				ouverture des inscriptions
			</text>

			<circle r="15" cx="450" cy="2000" class="bullet-point" />
			<text x="420" y="2000" class="bullet-point-text" text-anchor="end" dominant-baseline="middle">
				4 mai 2026
				fermeture des inscriptions
			</text>

			<circle r="15" cx="450" cy="2200" class="bullet-point" />
			<text x="480" y="2200" class="bullet-point-text" text-anchor="start" dominant-baseline="middle">
				10 juillet 2026
				C'est parti pour la touffurs !
			</text>

			<image
				id="bus"
				href="/bus.png"
				x="0"
				y="0"
				width="30"
				height="80"
			>

			</image>
		</svg>
		<div class="end-div"></div>
	</div>

	<div class="location flex flex-row">
		<img src="/lieu.jpg" alt="lieu" class="w-96 relative rounded-full border-8 border-white" />
		<div class="m-6 flex flex-col justify-center">
			<h2 class="text-3xl font-bold">Arpentez les plaines de Okoto</h2>
			<p class="mt-2 w-3/4">
				Explorez les 80 hectares de nature et le grand château de Okoto.
				Profitez de la nature et des paysages magnifiques de la région.
				Parcourez les sentiers de randonnée et découvrez la faune et la flore locales.
				Participez à des activités de plein air telles que la randonnée, le VTT et l'escalade.
				Profitez de la tranquillité et de la beauté de la nature environnante.
				Créez des souvenirs inoubliables avec vos amis et votre famille.
				Rejoignez-nous pour une expérience unique en pleine nature !
			</p>
			<a href="/lieu" class="text-2xl font-bold text-center p-4 mt-6 w-1/2 text-white rounded-2xl bg-blue-900">
				Plus d'informations
			</a>
		</div>
	</div>

	<div class="activite flex flex-col items-end">
		<div class="flex flex-col items-center justify-center w-3/4">
			<img src="/lieu.jpg" alt="activités" class="w-96 relative rounded-full border-8 border-white" />
			<div class="m-6 flex flex-col justify-center items-center">
				<h2 class="text-3xl font-bold">Des activité à s'en donner le tournis !</h2>
				<p class="mt-2 w-3/4">
					Explorez les 80 hectares de nature et le grand château de Okoto.
					Profitez de la nature et des paysages magnifiques de la région.
					Parcourez les sentiers de randonnée et découvrez la faune et la flore locales.
					Participez à des activités de plein air telles que la randonnée, le VTT et l'escalade.
					Profitez de la tranquillité et de la beauté de la nature environnante.
					Créez des souvenirs inoubliables avec vos amis et votre famille.
					Rejoignez-nous pour une expérience unique en pleine nature !
				</p>
				<a href="/lieu" class="text-2xl font-bold text-center p-4 mt-6 w-1/2 text-white rounded-2xl bg-blue-900">
					Plus d'informations
				</a>
			</div>
		</div>
	</div>
</div>

<div class="bg-cyan-700 w-full prix flex flex-col items-center justify-center">
	<h2 class="text-3xl font-bold text-center text-white pt-10">A quel prix ?</h2>
	<p class="text-white text-center">
		La touffurs, c'est un prix unique tout compris !
	</p>
	<p class="text-3xl font-bold text-center text-white rounded-2xl p-3 mt-10 mb-10 bg-blue-950">
		350€
	</p>
	<ul class="text-white text-center mb-10">
		<li class="text-xl">Hébergement au château</li>
		<li class="text-xl">Repas matin, midi et soir</li>
		<li class="text-xl">Accès à toutes les activités</li>
		<li class="text-xl">Accès à la piscine</li>
		<li class="text-xl">Accès à la salle de jeux</li>
		<li class="text-xl">Accès à la salle de spectacle</li>
	</ul>
	<button class="text-2xl font-bold text-center p-4 text-white rounded-2xl bg-blue-900 mb-10" disabled>
		Inscriptions le 4 mai 2026 à 18h
	</button>
</div>

<div class="bg-gray-900 w-full flex flex-col items-center justify-between text-white">
	<div class="flex flex-row justify-between w-full">

		<div class="flex flex-col w-1/2 m-4">
			<h2 class="text-3xl font-bold text-white">Touffurs</h2>
			<p>Une convention par Toulousefurs</p>
		</div>

		<div class="flex flex-col w-1/2 m-4">
			<h2 class="text-3xl font-bold text-white">A propos</h2>
			<a href="/conditions" class="w-1/2 text-white">
				Termes et conditions
			</a>
			<a href="/legal" class="w-1/2 text-white">
				Mentions légales
			</a>
			<a href="/credits" class="w-1/2 text-white">
				Crédits
			</a>
		</div>

		<div class="flex flex-col w-1/2 m-4">
			<h2 class="text-3xl font-bold text-white">Soutenir le projet</h2>
			<a href="/" class="bg-blue-700 text-white rounded-2xl p-4 mt-6 w-1/2 text-center">
				Faire un don
			</a>
		</div>

		<div class="flex flex-col w-1/2 m-4">
			<h2 class="text-3xl font-bold text-white">Nous contacter</h2>
			<a href="/contact/staff" class="w-1/2 text-white">
				Staff
			</a>
			<a href="/contact/safety" class="w-1/2 text-white">
				Safety
			</a>
		</div>

		<div class="flex flex-col w-1/2 m-4">
			<h2 class="text-3xl font-bold text-white">Suivez-nous</h2>
			<a href="https://twitter.com/Touffurs" target="_blank" rel="noreferrer" class="w-1/2 text-white">
				Twitter
			</a>
			<a href="https://www.twitch.tv/touffurs" target="_blank" rel="noreferrer" class="w-1/2 text-white">
				Twitch
			</a>
			<a href="https://www.instagram.com/touffurs/" target="_blank" rel="noreferrer" class="w-1/2 text-white">
				Instagram
			</a>
			<a href="https://www.facebook.com/touffurs/" target="_blank" rel="noreferrer" class="w-1/2 text-white">
				Facebook
			</a>
		</div>

	</div>
</div>


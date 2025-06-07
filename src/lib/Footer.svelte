<!-- src/lib/Footer.svelte -->
<footer class="bg-gray-900 text-white w-full px-6 py-12">
	<div class="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
		
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
				<li><a href="/credits" class="hover:underline">Crédits</a></li>
			</ul>
		</div>

		<!-- Soutien -->
		<div>
			<h2 class="text-xl font-bold mb-2">Soutenir</h2>
			<a href="/" class="inline-block bg-blue-700 hover:bg-blue-600 text-white text-center rounded-xl px-4 py-2 text-sm">
				Faire un don
			</a>
		</div>

		<!-- Contact -->
		<div>
			<h2 class="text-xl font-bold mb-2">Contact</h2>
			<ul class="space-y-1 text-sm">
				<li><a href="/contact/staff" class="hover:underline">Staff</a></li>
				<li><a href="/contact/safety" class="hover:underline">Safety</a></li>
			</ul>
		</div>

		<!-- Réseaux -->
		<div>
			<h2 class="text-xl font-bold mb-2">Suivez-nous</h2>
			<ul class="space-y-1 text-sm">
				<li><a href="https://twitter.com/Touffurs" target="_blank" class="hover:underline">Twitter</a></li>
				<li><a href="https://www.twitch.tv/touffurs" target="_blank" class="hover:underline">Twitch</a></li>
				<li><a href="https://www.instagram.com/touffurs/" target="_blank" class="hover:underline">Instagram</a></li>
				<li><a href="https://www.facebook.com/touffurs/" target="_blank" class="hover:underline">Facebook</a></li>
			</ul>
		</div>

	</div>

	<p class="text-center text-xs text-gray-400 mt-12">
		© {new Date().getFullYear()} Toulouse Fur. Tous droits réservés.
	</p>
</footer>

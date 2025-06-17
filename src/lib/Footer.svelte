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
				<li class="flex items-center gap-2">
					<img src="https://img.icons8.com/lollipop/144/twitterx.png" alt="Twitter" class="w-5 h-5 inline" />
					<a href="https://twitter.com/Touffurs" target="_blank" class="hover:underline">Twitter</a>
				</li>
				<li class="flex items-center gap-2">
					<img src="https://img.icons8.com/fluency/144/instagram-new.png" alt="Instagram" class="w-5 h-5 inline" />
					<a href="https://www.instagram.com/" target="_blank" class="hover:underline">Instagram</a>
				</li>
				<li class="flex items-center gap-2">
					<img src="https://img.icons8.com/color/144/telegram-app--v1.png" alt="Telegram" class="w-5 h-5 inline" />
					<a href="https://t.me/tlsfurs" target="_blank" class="hover:underline">Telegram</a>
				</li>
			</ul>
		</div>

	</div>

	<p class="text-center text-xs text-gray-400 mt-1">
		© {new Date().getFullYear()} Toulouse Fur. Tous droits réservés.
	</p>
</footer>

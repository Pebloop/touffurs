<script lang="ts">
	import { gsap } from "gsap";
	import { MotionPathPlugin } from "gsap/MotionPathPlugin";
	import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
	import { ScrollTrigger } from "gsap/ScrollTrigger";
	import { onMount } from 'svelte';
	import Header from '$lib/Header.svelte';

	onMount(() => {
		gsap.registerPlugin(MotionPathPlugin);
		gsap.registerPlugin(DrawSVGPlugin);
		gsap.registerPlugin(ScrollTrigger);

		const screenWidth = window.innerWidth;
		const screenHeight = window.innerHeight;

		const x1 = screenWidth * 0.25;
		const x2 = screenWidth * 0.7;
		const yBase = screenHeight * 0.45;
		const yPeak = screenHeight * 0.35;

		gsap.registerPlugin(MotionPathPlugin);

		const tl = gsap.timeline({
		repeat: -1,
		defaults: { duration: 2, ease: "power1.inOut" }
		});

		// 💡 Positionne le ballon au point de départ
		gsap.set(".ballon", { x: x1, y: yBase });

		tl.to(".ballon", {
		motionPath: {
			path: [
			{ x: x1, y: yBase },
			{ x: (x1 + x2) / 2, y: yPeak },
			{ x: x2, y: yBase }
			],
			curviness: 1.5,
			autoRotate: true
		},
		rotation: 360
		});

		tl.to(".ballon", {
		motionPath: {
			path: [
			{ x: x2, y: yBase },
			{ x: (x1 + x2) / 2, y: yPeak },
			{ x: x1, y: yBase }
			],
			curviness: 1.5,
			autoRotate: true
		},
		rotation: 720 
		});

		const chococat_arm = gsap.timeline({ repeat: -1, yoyo: true });
		chococat_arm.fromTo(
			".chococat-bras",
			{
				rotation: 0,
				x: 0,
				y: 0
			},
			{
				rotation: -20,
				x: -10,
				y: -10,
				duration: 2,
				ease: "power1.inOut",
			}
		)

		const chacolatine_arm = gsap.timeline({ repeat: -1, yoyo: true });
		chacolatine_arm.fromTo(
			".chacolatine-bras",
			{
				rotation: 20,
				x: 10,
				y: -10
			},
			{
				rotation: 0,
				x: 0,
				y: 0,
				duration: 2,
				ease: "power1.inOut",
			}
		)

		const chococat_tail = gsap.timeline({ repeat: -1, yoyo: true });
		chococat_tail.fromTo(
			".chococat-queue",
			{
				rotation: 0,
				x: 0,
				y: 0
			},
			{
				rotation: -20,
				x: -10,
				y: -10,
				duration: 2,
				ease: "power1.inOut",
			}
		)

		const chacolatine_tail = gsap.timeline({ repeat: -1, yoyo: true });
		chacolatine_tail.fromTo(
			".chacolatine-queue",
			{
				rotation: 20,
				x: 10,
				y: -10
			},
			{
				rotation: 0,
				x: 0,
				y: 0,
				duration: 2,
				ease: "power1.inOut",
			}
		)

		// travel animation
		const anchors = [
			{ x: -100, y: 100 },
			{ x: 800, y: 100 },
			{ x: 800, y: 300 },
			{ x: 200, y: 600 },
			{ x: 100, y: 800 },
			{ x: 200, y: 1000 },
			{ x: 450, y: 1300 },
			{x: 450, y: 1600},
			{ x: 450, y: 3000 },
		]
		const rawPath = MotionPathPlugin.arrayToRawPath(anchors, {
			curviness: 1,
		});

		const path = document.querySelector("#path") as SVGPathElement;
		const svg = document.querySelector("#svg") as SVGSVGElement;
		const bus = document.querySelector("#bus")!;

		path.setAttribute("d", MotionPathPlugin.rawPathToString(rawPath));


		ScrollTrigger.create(
			{
				trigger: svg,
				start: "top center",
				end: "+=5000",
				scrub: 0.5,
				animation: gsap.from(path, {
					drawSVG: "0%",
					ease: pathEase(path, { smooth: 1 }),
				}),
			}
		);

		ScrollTrigger.create({
			trigger: svg,
			start: "top center",
			end: "+=5000",
			scrub: 0.5,
			animation : gsap.to(
				bus,
				{
					ease: pathEase(path, { smooth: 1 }),
					motionPath: {
						path: path,
						align: path,
						alignOrigin: [0.5, 0.5],
						autoRotate: true,
					},
				}
			)
		});


	});

	function pathEase(
		path: SVGPathElement | string,
		config: { smooth?: boolean | number } = {}
	) {
		let axis = "y",
			precision = 1,
			rawPath = MotionPathPlugin.cacheRawPathMeasurements(MotionPathPlugin.getRawPath(gsap.utils.toArray(path)[0] as SVGPathElement), Math.round(precision * 12)),
			useX = axis === "x",
			start = rawPath[0][useX ? 0 : 1],
			end = rawPath[rawPath.length - 1][rawPath[rawPath.length-1].length - (useX ? 2 : 1)],
			range = end - start,
			l = Math.round(precision * 200),
			inc = 1 / l,
			positions = [0],
			a = [0],
			minIndex = 0,
			smooth = [0],
			minChange = (1 / l) * 0.6,
			smoothRange = config.smooth === true ? 7 : Math.round(config.smooth as number) || 0,
			fullSmoothRange = smoothRange * 2,
			getClosest = (p: number) => {
				while (positions[minIndex] <= p && minIndex++ < l) { }
				a.push((p - positions[minIndex-1]) / (positions[minIndex] - positions[minIndex - 1]) * inc + minIndex * inc);
				smoothRange && a.length > smoothRange && (a[a.length - 1] - a[a.length - 2] < minChange) && smooth.push(a.length - smoothRange);
			},
			i = 1;
		for (; i < l; i++) {
			const pos = MotionPathPlugin.getPositionOnPath(rawPath, i / l) as { x: number; y: number };
			positions[i] = ((axis === "x" ? pos.x : pos.y) - start) / range;
		}
		positions[l] = 1;
		for (i = 0; i < l; i++) {
			getClosest(i / l);
		}
		a.push(1); // must end at 1.
		if (smoothRange) { // smooth at the necessary indexes where a small difference was sensed. Make it a linear change over the course of the fullSmoothRange
			smooth.push(l-fullSmoothRange+1);
			smooth.forEach(i => {
				let start = a[i],
					j = Math.min(i + fullSmoothRange, l),
					inc = (a[j] - start) / (j - i),
					c = 1;
				i++;
				for (; i < j; i++) {
					a[i] = start + inc * c++;
				}
			});
		}
		l = a.length-1;
		return (p: number) => {
			let i = p * l,
				s = a[i | 0];
			return i ? s + (a[Math.ceil(i)] - s) * (i % 1) : 0;
		}
	}
</script>

<Header/>

	<div class="">
	<div class="flex flex-col items-center justify-center title w-96">
		<img src="/logo.png" class="z-10"/>
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
			<a href="/mentions" class="w-1/2 text-white">
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

<style lang="postcss">
		@reference "tailwindcss";

		.bg-special-green {
			background-color: #7CF660;
		}

    path {
        stroke-width: 20px;
        stroke: #303030;
        fill: none;
    }

		.bullet-point {
				color: white;
				fill: white;
    }

	.title {
		color: #ffffff;
		text-shadow: 0px 0px 10px #609cf6;
		position: absolute;
		top: calc(var(--spacing) * 30);
		left: calc(50% - var(--spacing) * 40);
	}

	.dates {
		color: #ffffff;
		text-shadow: 0px 0px 10px #609cf6;
		position: absolute;
		top: calc(var(--spacing) * 105);
		left: calc(50% - var(--spacing) * 40);
	}

	.inscriptions {
		color: #ffffff;
		position: absolute;
		top: calc(var(--spacing) * 150);
		left: calc(50% - var(--spacing) * 40);
	}

	.inscriptions button {
		color: #ffffff;
		background-color: #008ad8;
		padding: 20px;
		border-radius: 10px;
	}

	.inscriptions button:hover {
		background-color: #0077b3;
	}

	.inscriptions button:disabled {
		background-color: #3f5059;
	}

	.location {
		position: absolute;
		top: calc(var(--spacing) * 260);
		left: calc(var(--spacing) * 30);
		z-index: 1;
	}

	.activite {
		position: absolute;
		top: calc(var(--spacing) * 450);
		right: calc(var(--spacing) * 30);
		z-index: 1;
	}

	.chococat-base {
		position: absolute;
		bottom: calc(var(--spacing) * 20);
		left: calc(var(--spacing) * 25);
		width: calc(var(--spacing) * 110);
		height: auto;
		z-index: 1;
	}

	.chococat-queue {
		transform-origin: right;
		position: absolute;
		bottom: calc(var(--spacing) * 45);
		left: calc(var(--spacing) * 20);
		width: calc(var(--spacing) * 60);
		height: auto;
		z-index: 1;
	}

	.chococat-bras {
		transform-origin: left;
		position: absolute;
		bottom: calc(var(--spacing) * 80);
		left: calc(var(--spacing) * 108);
		width: calc(var(--spacing) * 30);
		height: auto;
		z-index: 2;
	}

	.chacolatine-base {
		position: absolute;
		bottom: calc(var(--spacing) * 20);
		right: calc(var(--spacing) * 20);
		width: calc(var(--spacing) * 110);
		height: auto;
		z-index: 1;
	}

	.chacolatine-bras {
		transform-origin: right;
		position: absolute;
		bottom: calc(var(--spacing) * 80);
		right: calc(var(--spacing) * 108);
		width: calc(var(--spacing) * 30);
		height: auto;
		z-index: 2;
	}

	.chacolatine-queue {
		transform-origin: left;
		position: absolute;
		bottom: calc(var(--spacing) * 45);
		right: calc(var(--spacing) * 15);
		width: calc(var(--spacing) * 60);
		height: auto;
		z-index: 1;
	}

	.ballon {
		position: absolute;
		width: calc(var(--spacing) * 30);
		height: auto;
		z-index: 1;
	}

</style>
<script lang="ts">  
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
import { gsap } from "gsap";
	import { MotionPathPlugin } from "gsap/MotionPathPlugin";
	import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
	import { ScrollTrigger } from "gsap/ScrollTrigger";
	import { onMount } from 'svelte';
	import Header from '$lib/Header.svelte';

  let scrolled = false;

  onMount(() => {
    const handleScroll = () => {
      scrolled = window.scrollY > 10;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

	onMount(() => {
		gsap.registerPlugin(MotionPathPlugin);
		gsap.registerPlugin(DrawSVGPlugin);
		gsap.registerPlugin(ScrollTrigger);

		const screenWidth = window.innerWidth;
		const screenHeight = window.innerHeight;

		const xballon1 = screenWidth * 0.30;
		const xballon2 = screenWidth * 0.65;
		const yballonBase = screenHeight * 0.25;
		const yballonPeak = screenHeight * 0.15;

		gsap.registerPlugin(MotionPathPlugin);

		const tl = gsap.timeline({
		repeat: -1,
		defaults: { duration: 2, ease: "power1.inOut" }
		});

		// 💡 Positionne le ballon au point de départ
		gsap.set(".ballon", { x: xballon1, y: yballonBase });

		tl.to(".ballon", {
		motionPath: {
			path: [
			{ x: xballon1, y: yballonBase },
			{ x: (xballon1 + xballon2) / 2, y: yballonPeak },
			{ x: xballon2, y: yballonBase }
			],
			curviness: 1.5,
			autoRotate: false
		},
		rotation: "+=360"
		});

		tl.to(".ballon", {
		motionPath: {
			path: [
			{ x: xballon2, y: yballonBase },
			{ x: (xballon1 + xballon2) / 2, y: yballonPeak },
			{ x: xballon1, y: yballonBase }
			],
			curviness: 1.5,
			autoRotate: false
		},
		rotation: "-=720" 
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

<header class={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out
  ${scrolled ? 'py-2 shadow-lg bg-white/20' : 'py-4 shadow-md bg-white/30'}`}>
    <nav class="flex items-center justify-between max-w-screen-xl mx-auto h-full text-white text-sm font-medium px-4 rounded-lg overflow-hidden">
    
    <!-- Logo + texte -->
    <a href="/" class="nav-link-logo flex items-center">
      <img src="/logo.png" alt="Logo" class={`transition-all duration-300 ${scrolled ? 'h-10' : 'h-14'}`} />
      <span class="ml-2 font-bold text-lg drop-shadow-sm">Des vacances tout en furs !</span>
    </a>

    <!-- Liens nav au centre absolu -->
	<div class="absolute left-1/2 transform -translate-x-1/2 h-full flex ml-2 font-bold text-lg drop-shadow-sm">
		<a href="/lieux" class="nav-link">Les lieux</a>
		<a href="/attendees" class="nav-link">Attendees</a>
		<a href="/activites" class="nav-link">Activités</a>
	</div>

    <!-- Contact -->
    <a href="/contact" class="nav-link-contact">
      Contact
    </a>
  </nav>
</header>

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


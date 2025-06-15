<script lang="ts">
  import Header from '$lib/Header.svelte';
  import Footer from '$lib/Footer.svelte';

  interface StaffMember {
    name: string;
    role: string;
    image: string;
  }

  const staffList: StaffMember[] = [
    {
      name: 'Lupin',
      role: 'Président de Touffurs',
      image: 'https://touffurscms.cellar-c2.services.clever-cloud.com/Gya_76a27aeb4b.jpg'
    },
    {
      name: 'Archy',
      role: 'Développeur et gestion IT',
      image: 'https://touffurscms.cellar-c2.services.clever-cloud.com/archy_fa21464b6f.png'
    },
    // Ajoute d'autres membres ici
  ];
</script>

<Header />

<div class="fixed-background"></div>

<main class="pt-[1rem] flex justify-center items-start min-h-screen px-4 bg-special-green">
  <div class="mt-30 mb-10 w-[70%] mx-auto p-8 backdrop-blur-md bg-white/40 border border-white/30 rounded-xl shadow-xl">
    <h2 class="text-3xl font-bold underline mb-6 text-center">L'équipe Touffurs</h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
      {#each staffList as staff}
        <div class="flex flex-col items-center text-center bg-white/60 p-4 rounded-xl shadow">
          <img src={staff.image} alt={staff.name} class="w-32 h-32 rounded-full object-cover mb-4 border-4 border-white shadow-md" />
          <h3 class="text-xl font-semibold">{staff.name}</h3>
          <p class="text-sm text-muted-foreground">{staff.role}</p>
        </div>
      {/each}
    </div>
  </div>
</main>

<Footer/>

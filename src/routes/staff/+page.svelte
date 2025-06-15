  <script lang="ts">
    import Header from '$lib/Header.svelte';
    import Footer from '$lib/Footer.svelte';
    import { onMount } from 'svelte';

    interface StaffMember {
      id: number;
      name: string;
      role: string;
      image: string;
      description: string;
    }

    let staffList: StaffMember[] = [];

    onMount(async () => {
      try {
        const res = await fetch('http://localhost:8080/api/users?populate[avatar]=true&populate[role]=true');
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const users: any[] = await res.json();
        console.log('Fetched users:', users);
        console.log('Filtered staff:', users.filter(user => user.role?.name === 'Staff' && user.avatar));

        staffList = users
          .filter(user => user.role?.name === 'Staff' && user.avatar)
          .map(user => ({
            id: user.id,
            name: user.username,
            role: user.role.name,
            description: user.description_staff,
            image: user.avatar.formats?.medium?.url || user.avatar.url
          }));

      } catch (error) {
        console.error('Fetch error:', error);
      }
    });

  </script>

  <Header/>

  <div class="fixed-background"></div>

  <main class="pt-[1rem] flex justify-center items-start min-h-screen px-4 bg-special-green">
    <div class="mt-30 mb-10 w-[70%] mx-auto p-8 backdrop-blur-md bg-white/40 border border-white/30 rounded-xl shadow-xl">
      <h2 class="text-3xl font-bold underline mb-6 text-center">L'équipe Touffurs</h2>

      {#if staffList.length % 2 !== 0}
        <!-- Cas impair : centrer le premier membre -->
        <div class="grid grid-cols-1 sm:grid-cols-1 mb-6">
          <div class="flex justify-center">
            <div class="flex flex-col items-center text-center bg-white/60 p-4 rounded-xl shadow w-80">
              <img src={staffList[0].image} alt={staffList[0].name} class="w-32 h-32 rounded-full object-cover mb-4 border-4 border-white shadow-md" />
              <h3 class="text-xl font-semibold">{staffList[0].name}</h3>
              <p class="text-sm text-muted-foreground">{staffList[0].description}</p>
            </div>
          </div>
        </div>

        <!-- Le reste affiché normalement en 2 colonnes -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {#each staffList.slice(1) as staff}
            <div class="flex flex-col items-center text-center bg-white/60 p-4 rounded-xl shadow">
              <img src={staff.image} alt={staff.name} class="w-32 h-32 rounded-full object-cover mb-4 border-4 border-white shadow-md" />
              <h3 class="text-xl font-semibold">{staff.name}</h3>
              <p class="text-sm text-muted-foreground">{staff.description}</p>
            </div>
          {/each}
        </div>
      {:else}
        <!-- Cas pair : affichage standard -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {#each staffList as staff}
            <div class="flex flex-col items-center text-center bg-white/60 p-4 rounded-xl shadow">
              <img src={staff.image} alt={staff.name} class="w-32 h-32 rounded-full object-cover mb-4 border-4 border-white shadow-md" />
              <h3 class="text-xl font-semibold">{staff.name}</h3>
              <p class="text-sm text-muted-foreground">{staff.description}</p>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </main>

  <Footer/>

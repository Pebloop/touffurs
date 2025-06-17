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
      // Effectue une requête HTTP GET vers l'API pour récupérer la liste des utilisateurs,
      // en demandant que les champs 'avatar' et 'role' soient inclus dans la réponse
      const res = await fetch('https://app-fff52561-df06-4c55-a0e9-7abe82722bca.cleverapps.io/api/users?populate[avatar]=true&populate[role]=true');
      // Si la réponse n'est pas OK (statut HTTP hors 200-299), lève une erreur
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      // Convertit la réponse JSON en tableau d'utilisateurs
      const users: any[] = await res.json();
      // Affiche tous les utilisateurs récupérés dans la console (pour debug)
      console.log('Fetched users:', users);
      // Affiche dans la console uniquement les utilisateurs ayant le rôle "Staff" et un avatar (pour debug)
      console.log('Filtered staff:', users.filter(user => user.role?.name === 'Staff' && user.avatar));

      // Filtre les utilisateurs pour ne garder que ceux ayant le rôle "Staff" et un avatar,
      // puis crée un nouveau tableau d'objets formatés pour l'affichage
      staffList = users
        .filter(user => user.role?.name === 'Staff' && user.avatar)
        .map(user => ({
          id: user.id, // identifiant unique
          name: user.username, // nom d'utilisateur
          role: user.role.name, // nom du rôle (ici "Staff")
          description: user.description_staff, // description spécifique au staff
          // utilise l'URL de l'avatar en format "medium" si disponible, sinon l'URL par défaut
          image: user.avatar.formats?.medium?.url || user.avatar.url
        }));

    } catch (error) {
      // En cas d'erreur lors de la requête ou du traitement, affiche l'erreur dans la console
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

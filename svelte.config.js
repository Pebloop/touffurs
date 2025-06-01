import adapter from '@sveltejs/adapter-node'; 
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consultez https://svelte.dev/docs/kit/integrations
    // pour plus d'informations sur les préprocesseurs
    preprocess: vitePreprocess(),

    kit: {
        // Configurez l'adaptateur pour Node
        adapter: adapter({
            // Si vous souhaitez définir des options supplémentaires, vous pouvez le faire ici
            out: 'build', // Le répertoire de sortie (par défaut: 'build')
        }),
    }
};

export default config;

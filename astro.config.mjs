import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
    base: 'oauth-docs/',
    integrations: [
        starlight({
            title: 'AURA Oauth documentation',
            // social: {
                //   github: 'https://github.com/withastro/starlight',
                // },
            sidebar: [
                {
                    label: 'Overview',
                    items: [
                        // Each item here is one entry in the navigation menu.
                        { label: 'Introduction', link: '/' },
                    ],
                },
                {
                    label: 'Workflow',
                    autogenerate: { directory: 'workflow' },
                },
            ],
        }),
    ],

    // Process images with sharp: https://docs.astro.build/en/guides/assets/#using-sharp
    image: { service: { entrypoint: 'astro/assets/services/sharp' } },
});

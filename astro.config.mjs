import { defineConfig } from 'astro/config';
import SpeedInsights from "@vercel/speed-insights/astro"
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
    output: 'server',
    adapter: vercel({
        webAnalytics: { enabled: true }
    }),
});
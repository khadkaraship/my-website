// @ts-check
import { defineConfig } from 'astro/config';
import yaml from '@rollup/plugin-yaml';

// If you deploy to a custom domain, put it here (e.g. 'https://rashipkhadka.com.np').
// It is only used to build absolute links in the sitemap / social previews.
const SITE_URL = 'https://example.com';

export default defineConfig({
  site: SITE_URL,
  output: 'static',
  vite: {
    plugins: [yaml()],
  },
  build: {
    // Pretty URLs: /portfolio instead of /portfolio.html
    format: 'directory',
  },
});

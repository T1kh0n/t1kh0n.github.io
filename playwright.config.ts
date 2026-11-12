import { defineConfig } from '@playwright/test';

const base = process.env.BASE_PATH || '';

export default defineConfig({
	webServer: {
		command: 'npm run build && npm run preview -- --port 4173',
		url: `http://localhost:4173${base}/`,
		reuseExistingServer: !process.env.CI
	},
	use: {
		baseURL: 'http://localhost:4173'
	},
	fullyParallel: true,
	workers: 4,
	testMatch: '**/*.e2e.{ts,js}'
});

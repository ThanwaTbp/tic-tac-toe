// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-04-03",
	devtools: { enabled: false },
	ssr: false,
	css: ["~/assets/sass/main.scss"],
	modules: [
		[
			"@pinia/nuxt",
			{
				autoImports: ["defineStore", "definePiniaStore"],
			},
		],
		"@pinia/nuxt",
	],
	runtimeConfig: {
		public: {
			githubClientId: "Ov23lieuoskKZnxkIJip",
			githubClientSecret: "c41b9cc439e8517f356b4b9ea4b5337d4d090b7a",
		},
	},
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
})

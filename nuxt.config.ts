// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-04-03",
	devtools: { enabled: false },
	ssr: false,
	app: {
		head: {
			htmlAttrs: {
				lang: "en",
			},
			charset: "utf-8",
			titleTemplate: "%s | เกม TicTacToe",
			meta: [
				{
					name: "viewport",
					content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
				},
				{
					name: "description",
					content: "เกม TicTacToe",
				},
				{
					name: "keywords",
					content: "เกม TicTacToe",
				},
				{
					name: "author",
					content: "เกม TicTacToe",
				},
				{
					name: "Pragma",
					content: "no-cache",
				},
				{
					name: "Expires",
					content: "-1",
				},
				{
					name: "CACHE-CONTROL",
					content: "NO-CACHE",
				},
			],
		},
	},
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

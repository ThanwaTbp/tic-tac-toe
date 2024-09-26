interface ICredentials {
	username: string
	password: string
}

export const useAuthStore = defineStore("auth", {
	state: () => ({
		token: localStorage.getItem("token") || null,
		user: JSON.parse(localStorage.getItem("user") as string) || null,
	}),
	actions: {
		async login(credentials: ICredentials) {
			const response = await fetch("/api/mock", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					grant_type: "password",
					username: credentials.username,
					password: credentials.password,
				}),
			})

			if (response.ok) {
				const data = await response.json()
				this.token = data.access_token
				this.user = { username: credentials.username }

				// เก็บ token และ user ใน localStorage
				localStorage.setItem("token", this.token !== null ? this.token : "")
				localStorage.setItem("user", this.user !== null ? JSON.stringify(this.user) : "")
			} else {
				console.error("Login failed")
			}
		},
		logout() {
			// ล้างข้อมูล token และ user
			this.token = null
			this.user = null

			// ลบข้อมูลจาก localStorage
			localStorage.removeItem("token")
			localStorage.removeItem("user")

			// Redirect ไปหน้า login
			const router = useRouter()
			router.push("/login")
		},
	},
})

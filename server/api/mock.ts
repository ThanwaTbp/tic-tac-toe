export default defineEventHandler(async (event) => {
	const body = await readBody(event)
	const { username, password } = body

	if (username === "thanwa" && password === "password") {
		return { access_token: "mock-token", expires_in: 3600 }
	}

	return sendError(event, new Error("Invalid credentials"))
})

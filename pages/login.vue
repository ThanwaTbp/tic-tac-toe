<script lang="ts" setup>
import { useAuthStore } from "@/store/auth"

useHead({
	title: "เข้าสู่ระบบ",
})

const username = ref("thanwa")
const password = ref("password")
const authStore = useAuthStore()
const router = useRouter()
const showToast = ref(false)

const login = async () => {
	const credentials = { username: username.value, password: password.value }
	await authStore.login(credentials)

	if (authStore.token) {
		showToast.value = true

		setTimeout(() => {
			showToast.value = false
			router.push("/")
		}, 1500)
	}
}
</script>

<template>
	<div class="relative flex flex-col justify-center h-screen overflow-hidden bg-neutral-content">
		<div class="ml-5 mt-5">Username ที่ใช้ทดสอบ : thanwa</div>
		<div class="ml-5 mt-2">Password ที่ใช้ทดสอบ : password</div>
		<div class="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-lg">
			<h1 class="text-3xl font-semibold text-center text-purple-700">Tic Tac Toe !</h1>
			<form class="space-y-4" @submit.prevent="login">
				<div>
					<label class="label">
						<span class="text-base label-text">ชื่อผู้ใช้งาน</span>
					</label>
					<input
						v-model="username"
						type="text"
						id="username"
						placeholder="Username"
						class="w-full input input-bordered input-primary"
					/>
				</div>
				<div>
					<label class="label">
						<span class="text-base label-text">รหัสผ่าน</span>
					</label>
					<input
						v-model="password"
						type="password"
						id="password"
						placeholder="Password"
						class="w-full input input-bordered input-primary"
					/>
				</div>
				<div>
					<button class="btn btn-primary">เข้าสู่ระบบ</button>
				</div>
			</form>
		</div>

		<div v-if="showToast" class="toast">
			<div class="alert alert-success text-white">
				<span>เข้าสู่ระบบสำเร็จ !!</span>
			</div>
		</div>
	</div>
</template>

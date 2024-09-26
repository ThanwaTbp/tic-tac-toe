<script lang="ts" setup>
import { useAuthStore } from "~/store/auth"
import { useTicTacToeStore } from "~/store/useTictactoe"

definePageMeta({
	middleware: "auth",
})

useHead({
	title: "TicTacToe",
})

const store = useTicTacToeStore()
const authStore = useAuthStore()

const logout = () => {
	authStore.logout()
}

const handleMove = (index: any) => {
	if (store.winner !== null) {
		return
	} else {
		store.makeMove(index)
	}
	store.checkScroll()
}
</script>

<template>
	<div class="absolute top-2 left-2">
		<div class="flex flex-col">
			<span>User = X</span>
			<span>ai = O</span>
		</div>
	</div>
	<div class="absolute top-2 right-2">
		<button v-if="authStore.token" class="btn btn-error" @click="logout">ออกจากระบบ</button>
	</div>
	<div class="game">
		<div v-if="store.winner" class="mb-5">
			<p v-if="store.winner === 'draw'" class="text-5xl">It's a draw!</p>
			<p v-else class="text-5xl">
				<span :class="store.winner === 'X' ? 'text-primary' : 'text-error'">{{ store.winner }}</span> ชนะ !
			</p>
			<button class="btn btn-primary mt-3" @click="store.playAgain">เล่นใหม่อีกครั้ง</button>
		</div>
		<div class="flex justify-center gap-20">
			<h2>
				คะแนนของ X : <span class="text-3xl text-primary font-bold">{{ store.xScroll }}</span>
			</h2>
			<h2>
				คะแนนของ O : <span class="text-3xl text-error font-bold">{{ store.oScroll }}</span>
			</h2>
		</div>
		<div class="board mt-5">
			<div v-for="(cell, index) in store.board" :key="index" class="cell" @click="handleMove(index)">
				{{ cell }}
			</div>
		</div>
		<button class="btn btn-info" @click="store.resetBoard">รีเซ็ทกระดาน</button>
	</div>
</template>

<style lang="scss" scoped>
.game {
	text-align: center;
}
.board {
	display: grid;
	grid-template-columns: repeat(3, 100px);
	justify-content: center;
	gap: 10px;
	margin-bottom: 16px;
}
.cell {
	width: 100px;
	height: 100px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 2rem;
	border: 2px solid black;
	cursor: pointer;
}
</style>

export const useTicTacToeStore = defineStore("tictactoe", {
	state: () => ({
		board: Array(9).fill(null),
		currentPlayer: "X",
		winner: null,
		xScroll: 0,
		oScroll: 0,
		xScrollBonus: 0,
		oScrollBonus: 0,
		xScrollCount: 0,
		oScrollCount: 0,
		xWinStreak: 0,
		oWinStreak: 0,
	}),
	actions: {
		resetBoard() {
			this.board = Array(9).fill(null)
			this.winner = null
			this.xScroll = 0
			this.oScroll = 0
			this.xScrollBonus = 0
			this.oScrollBonus = 0
			this.xScrollCount = 0
			this.oScrollCount = 0
			this.xWinStreak = 0
			this.oWinStreak = 0
		},
		playAgain() {
			this.board = Array(9).fill(null)
			this.currentPlayer = "X"
			this.winner = null
		},
		makeMove(index: number) {
			if (!this.board[index] && !this.winner) {
				this.board[index] = this.currentPlayer
				this.checkWinner()

				if (!this.winner) {
					this.switchPlayer()
				}
			}
		},
		switchPlayer() {
			if (this.currentPlayer === "X") {
				this.currentPlayer = "O"
				this.aiMove()
			} else {
				this.currentPlayer = "X"
			}
		},
		aiMove() {
			const availableMoves = this.board.map((val, index) => (val === null ? index : null)).filter((val) => val !== null)
			if (availableMoves.length > 0) {
				const randomIndex = Math.floor(Math.random() * availableMoves.length)
				this.makeMove(availableMoves[randomIndex])
			}
		},
		checkScroll() {
			// ตรวจสอบถ้าผู้ชนะคือ "X"
			if (this.winner === "X") {
				this.xScrollCount++ // เพิ่มคะแนนให้ X
				this.oScrollCount-- // ลดคะแนนให้ O

				// ถ้า X ชนะต่อเนื่อง 3 ครั้ง จะได้รับโบนัส 1 คะแนน
				if (this.xWinStreak === 2) {
					// ถ้าชนะต่อเนื่องครบ 3 ครั้ง
					this.xScrollBonus++
					this.xWinStreak = 0 // รีเซ็ตสถิติชนะต่อเนื่อง
				} else {
					this.xWinStreak++ // เพิ่มสถิติชนะต่อเนื่อง
				}

				this.oWinStreak = 0 // รีเซ็ตสถิติชนะต่อเนื่องของ O เพราะ O แพ้

				this.xScroll = this.xScrollCount + this.xScrollBonus // คำนวณคะแนนของ X รวมโบนัส
				this.oScroll = this.oScrollCount // คำนวณคะแนนของ O

				// ตรวจสอบถ้าผู้ชนะคือ "O"
			} else if (this.winner === "O") {
				this.oScrollCount++ // เพิ่มคะแนนให้ O
				this.xScrollCount-- // ลดคะแนนให้ X (เพราะ X แพ้)

				// ถ้า O ชนะต่อเนื่อง 3 ครั้ง จะได้รับโบนัส 1 คะแนน
				if (this.oWinStreak === 2) {
					// ถ้าชนะต่อเนื่องครบ 3 ครั้ง
					this.oScrollBonus++
					this.oWinStreak = 0 // รีเซ็ตสถิติชนะต่อเนื่อง
				} else {
					this.oWinStreak++ // เพิ่มสถิติชนะต่อเนื่อง
				}

				this.xWinStreak = 0 // รีเซ็ตสถิติชนะต่อเนื่องของ X เพราะ X แพ้

				this.oScroll = this.oScrollCount + this.oScrollBonus // คำนวณคะแนนของ O รวมโบนัส
				this.xScroll = this.xScrollCount // คำนวณคะแนนของ X
			}
		},

		checkWinner() {
			const winningCombos = [
				[0, 1, 2],
				[3, 4, 5],
				[6, 7, 8],
				[0, 3, 6],
				[1, 4, 7],
				[2, 5, 8],
				[0, 4, 8],
				[2, 4, 6],
			]

			for (const combo of winningCombos) {
				console.log(combo)

				const [a, b, c] = combo
				console.log(a, b, c)

				if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
					this.winner = this.board[a]
					return
				}
			}
			if (!this.board.includes(null)) {
				this.winner = "draw"
			}
		},
	},
})

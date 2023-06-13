<template>
	<div class="board">
		<div class="row1">
			<div v-for="card in range(0,2)" :key="card" :class="sendToBack('row1-pos', card)">
				<single-card :params="cardProps('table', card)" @click="cardClickHandler('table', card)"/>
			</div>
		</div>
		<div class="row2-all">
			<div v-for="group in 3" :key="group" class="row2-pairs">
				<div :class="sendToBack('row2-pos', group+2)">
					<single-card :params="cardProps('table', group+2)" @click="cardClickHandler('table', group+2)"/>
				</div>
				<div :class="sendToBack('row2-pos', group+5)">
					<single-card :params="cardProps('table', group+5)" @click="cardClickHandler('table', group+5)"/>
				</div>
			</div>
		</div>
		<div class="row3">
			<div v-for="card in range(9,17)" :key="card" :class="sendToBack('row3-pos', card)">
				<single-card :params="cardProps('table', card)" @click="cardClickHandler('table', card)"/>
			</div>
		</div>
		<div class="row4">
			<div v-for="card in range(18,27)" :key="card" :class="sendToBack('row4-pos', card)">
				<single-card :params="cardProps('table', card)" @click="cardClickHandler('table', card)"/>
			</div>
		</div>
	</div>
	<div class="stock-waste">
		<div class="waste">
			<single-card :params="cardProps('waste')" class="waste-cards"/>
		</div>
		<div class="stock">
			<div v-for="(card, index) in cardsOnStock"
			:key="card.id"
			:style="{'z-index': 50 - index, 'left': 5 + index * 5 + 'px' }"
			class="stock-cards">
				<single-card :params="{ cover: true }" @click="index === 0 ? cardClickHandler('stock') : null"/>
			</div>
			<div class="game-over"></div>
		</div>
	</div>
	<button class="btn-reset" @click="startGame">New Game</button>
	
	<div class="msg-log">
		<h5 style="color:lightgrey">Log: {{ gameStatus }} Cards left: {{ cardsLeft }}.</h5>
	</div>
</template>

<script setup>
/* Generic Components */
import SingleCard from '@/components/SingleCard'
import cardData from '@/assets/cards/cards.json'

/* Assets & Helpers */
import { ref, onBeforeMount } from 'vue'

/* Data */
const cardsOnStock = ref([])
const cardsOnWaste = ref([])
const cardsOnTable = ref([])
const gameStatus = ref('')
const cardsLeft = ref(0)

/*************************************************
*                    Functions                   *
*************************************************/
const startGame = () => {
	const remainingCards = []
	let arrLen
	
	gameStatus.value = ''
	cardsOnStock.value = [] // Reset decks
	cardsOnWaste.value = [] // Reset decks
	cardsOnTable.value = [] // Reset decks
	
	cardsOnStock.value = fy_shuffle(cardData) // Shuffle deck
	arrLen = cardsOnStock.value.length

	for (let i = 0; i < arrLen; i++) {
		cardsOnStock.value[i].cover = false // Reset flipped cards
		cardsOnStock.value[i].visible = true // Reset flipped cards

		if (i < 28) {
			cardsOnTable.value.push(cardsOnStock.value[i])
			if (i < 18) {
				cardsOnTable.value[i].cover = true // Hide first 3 rows of cards
			}
		}
		else if (i === 28) {
			cardsOnWaste.value.push(cardsOnStock.value[i])
		}
		else {
			remainingCards.push(cardsOnStock.value[i])
		}
	}

	cardsOnStock.value = remainingCards
	cardsLeft.value = cardsOnTable.value.length
	gameStatus.value = 'New game started.'
}

const checkPlay = (cardPosition) => {
	const waste = parseInt(cardsOnWaste.value.slice(-1)[0].id.slice(1, 3))
	const table = parseInt(cardsOnTable.value[cardPosition].id.slice(1, 3))
	
	if (waste === 13 && table === 1 || waste === 1 && table === 13 ||
		waste === table + 1 || waste === table - 1) {
			console.log ('valido')
			cardsOnWaste.value.push(cardsOnTable.value[cardPosition])
			cardsOnTable.value[cardPosition].visible = false
			cardsLeft.value--
			checkVisibility()
			checkWin()
		}
	// console
	gameStatus.value = cardToText(cardsOnTable.value[cardPosition].id) + ' clicked.'
}

/*************************************************
*                     Helpers                    *
*************************************************/
const range = (start, end) => {
	return Array(end - start + 1).fill().map((_, idx) => start + idx)
}

function sendToBack(positionClass, card) {
	if (cardsOnTable.value[card].visible) {
		return positionClass
	}
	return 'send-back'
}

// Fisher-Yates shuffle
const fy_shuffle = (array) => {
	let cardsLeft = array.length, temp, nextCard

	while (cardsLeft) {
		nextCard = Math.floor(Math.random() * cardsLeft--)

		temp = array[cardsLeft]
		array[cardsLeft] = array[nextCard]
		array[nextCard] = temp
	}
	return array
}

function cardProps(whereIsCard, singleCardId) {
	if (whereIsCard === 'table') {
		return {
			cardId: cardsOnTable.value[singleCardId].id,
			cover: cardsOnTable.value[singleCardId].cover
		}
	}
	if (whereIsCard === 'waste') {
		return {
			cardId: cardsOnWaste.value.slice(-1)[0].id,
			cover: false
		}
	}
	
}

function cardToText (card) {
	let cardSuit, cardValue

	switch (card.slice(0, 1)) {
		case '1':
			cardSuit = '♣'
			break
		case '2':
			cardSuit = '♦'
			break
		case '3':
			cardSuit = '♠'
			break
		case '4':
			cardSuit = '♥'
			break
	}

	switch (card.slice(1, 3)) {
		case '01':
			cardValue = 'A'
			break
		case '10':
			cardValue = '10'
			break
		case '11':
			cardValue = 'J'
			break
		case '12':
			cardValue = 'Q'
			break
		case '13':
			cardValue = 'K'
			break
		default:
			cardValue = card.slice(2, 3)
			break
	}
	return cardValue + cardSuit
}

function cardVisible(card) {
	return cardsOnTable.value[card].visible
}

/*************************************************
*                WORK IN PROGRESS                *
*************************************************/
const checkWin = () => {
	// cardsLeft === 0? / cardsOnStock === 0? / !checkLoss?
	// pensar nestas condicoes acima 
	console.log('checkWin')
	//correr checkLoss()
}

const checkVisibility = () => {
	// First row
	if (!cardVisible(3) && !cardVisible(6)) { cardsOnTable.value[0].cover = false }
	if (!cardVisible(4) && !cardVisible(7)) { cardsOnTable.value[1].cover = false }
	if (!cardVisible(5) && !cardVisible(8)) { cardsOnTable.value[2].cover = false }
	// Second row
	if (!cardVisible(9) && !cardVisible(10)) { cardsOnTable.value[3].cover = false }
	if (!cardVisible(10) && !cardVisible(11)) { cardsOnTable.value[6].cover = false }
	if (!cardVisible(12) && !cardVisible(13)) { cardsOnTable.value[4].cover = false }
	if (!cardVisible(13) && !cardVisible(14)) { cardsOnTable.value[7].cover = false }
	if (!cardVisible(15) && !cardVisible(16)) { cardsOnTable.value[5].cover = false }
	if (!cardVisible(16) && !cardVisible(17)) { cardsOnTable.value[8].cover = false }
	// Third row
	if (!cardVisible(18) && !cardVisible(19)) { cardsOnTable.value[9].cover = false }
	if (!cardVisible(19) && !cardVisible(20)) { cardsOnTable.value[10].cover = false }
	if (!cardVisible(20) && !cardVisible(21)) { cardsOnTable.value[11].cover = false }
	if (!cardVisible(21) && !cardVisible(22)) { cardsOnTable.value[12].cover = false }
	if (!cardVisible(22) && !cardVisible(23)) { cardsOnTable.value[13].cover = false }
	if (!cardVisible(23) && !cardVisible(24)) { cardsOnTable.value[14].cover = false }
	if (!cardVisible(24) && !cardVisible(25)) { cardsOnTable.value[15].cover = false }
	if (!cardVisible(25) && !cardVisible(26)) { cardsOnTable.value[16].cover = false }
	if (!cardVisible(26) && !cardVisible(27)) { cardsOnTable.value[17].cover = false }
}

const checkLoss = () => {
	// Verificar se há movimentos possiveis
	console.log('checkMovesLeft')
}

/*************************************************
*                 Click Handlers                 *
*************************************************/
const cardClickHandler = (where, cardPosition) => {
	if (where === 'table') {
		// console
		console.log(cardPosition)
		if (!cardsOnTable.value[cardPosition].cover) {
			checkPlay(cardPosition)
		}
	}
	if (where === 'stock') {
		cardsOnWaste.value.push(cardsOnStock.value.pop())
		gameStatus.value = 'Stock pile clicked.'
		checkWin()
	}
}

onBeforeMount(() => {
	startGame()
})
</script>

<style scoped>
.board {
	top: 30px;
	margin: auto;
	display: flex;
	flex-direction: column;
	gap: 15px;
	width: 700px;
	height: 290px;
	position: relative;
	align-items: center;
	background-color: #257925;
	
}
.row1 {
	display: flex;
	flex-direction: row;
	gap: 125px;
}
.row1-pos { z-index: 1;}
.row2-all {
	position: absolute;
	top: 43px;
	display: flex;
	flex-direction: row;
	gap: 65px;
	margin: auto;
	align-content: center;
}
.row2-pairs {
	display: flex;
	flex-direction: row;
	gap: 5px;
}
.row2-pos { z-index: 2;}
.row3 {
	position: absolute;
	top: 86px;
	display: flex;
	flex-direction: row;
	gap: 5px;
}
.row3-pos { z-index: 3;}
.row4 {
	position: absolute;
	top: 129px;
	display: flex;
	flex-direction: row;
	gap: 5px;
	margin: auto;
}
.row4-pos {	z-index: 4; }
.stock-waste {
	position: relative;
	width: 700px;
	height: 150px;
	margin: auto;
}
.waste {
	position: absolute;
	width: 50%;
	float: left;
}
.stock {
	position: absolute;
	float: right;
	width: 50%;
	display: inline;
}
.waste-cards {
	position: absolute;
	right: 5px;
}
.stock-cards {
	position: absolute;
	left: 5px;
}
.game-over {
	-webkit-box-shadow:inset 0px 0px 0px 4px #ff2020ae;
	-moz-box-shadow:inset 0px 0px 0px 4px #ff2020ae;
	box-shadow:inset 0px 0px 0px 4px #ff2020ae;
	position: absolute;
	border-radius: 50%;
	width: 50px;
	height: 50px;
	top: 18px;
	z-index: -1;
	left: 8px;
}
.msg-log {
	width: 700px;
	margin: auto;
}
.btn-reset {
	align-self: auto;
}
.send-back {
	z-index: -50;
}
</style>
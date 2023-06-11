<template>
	<div class="board">
		<div class="row1">
			<single-card :params="cardProps('table', 0)" @click="cardClickHandler(0)"/>
			<single-card :params="cardProps('table', 1)" @click="cardClickHandler(1)"/>
			<single-card :params="cardProps('table', 2)" @click="cardClickHandler(2)"/>
		</div>
		<div class="row2-all">
			<div class="row2-pairs">
				<single-card :params="cardProps('table', 3)" @click="cardClickHandler(3)"/>
				<single-card :params="cardProps('table', 4)" @click="cardClickHandler(4)"/>
			</div>
			<div class="row2-pairs">
				<single-card :params="cardProps('table', 5)" @click="cardClickHandler(5)"/>
				<single-card :params="cardProps('table', 6)" @click="cardClickHandler(6)"/>
			</div>
			<div class="row2-pairs">
				<single-card :params="cardProps('table', 7)" @click="cardClickHandler(7)"/>
				<single-card :params="cardProps('table', 8)" @click="cardClickHandler(8)"/>
			</div>
		</div>
		<div class="row3">
			<single-card :params="cardProps('table', 9)" @click="cardClickHandler(9)"/>
			<single-card :params="cardProps('table', 10)" @click="cardClickHandler(10)"/>
			<single-card :params="cardProps('table', 11)" @click="cardClickHandler(11)"/>
			<single-card :params="cardProps('table', 12)" @click="cardClickHandler(12)"/>
			<single-card :params="cardProps('table', 13)" @click="cardClickHandler(13)"/>
			<single-card :params="cardProps('table', 14)" @click="cardClickHandler(14)"/>
			<single-card :params="cardProps('table', 15)" @click="cardClickHandler(15)"/>
			<single-card :params="cardProps('table', 16)" @click="cardClickHandler(16)"/>
			<single-card :params="cardProps('table', 17)" @click="cardClickHandler(17)"/>
		</div>
		<div class="row4">
			<single-card :params="cardProps('table', 18)" @click="cardClickHandler(18)"/>
			<single-card :params="cardProps('table', 19)" @click="cardClickHandler(19)"/>
			<single-card :params="cardProps('table', 20)" @click="cardClickHandler(20)"/>
			<single-card :params="cardProps('table', 21)" @click="cardClickHandler(21)"/>
			<single-card :params="cardProps('table', 22)" @click="cardClickHandler(22)"/>
			<single-card :params="cardProps('table', 23)" @click="cardClickHandler(23)"/>
			<single-card :params="cardProps('table', 24)" @click="cardClickHandler(24)"/>
			<single-card :params="cardProps('table', 25)" @click="cardClickHandler(25)"/>
			<single-card :params="cardProps('table', 26)" @click="cardClickHandler(26)"/>
			<single-card :params="cardProps('table', 27)" @click="cardClickHandler(27)"/>
		</div>
	</div>
	<div class="stock-waste">
		<div class="waste">
			<single-card :params="cardProps('waste')" class="waste-cards"/>
		</div>
		<div class="stock">
			<div v-for="(card, index) in cardsOnStock"
			:key="card.id"
			:style="{'z-index': 0 - index, 'left': 5 + index * 5 + 'px' }"
			class="stock-cards">
				<single-card :params="{ cover: true }" />
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
import SingleCard from '@/components/SingleCard'
import cardData from '@/assets/cards/cards.json'

import { ref, onBeforeMount } from 'vue'

const cardsOnStock = ref([])
const cardsOnWaste = ref([])
const cardsOnTable = ref([])
const gameStatus = ref('')
const cardsLeft = ref(0)

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

		if (i < 28) {
			cardsOnTable.value.push(cardsOnStock.value[i])
			if (i < 18)
				cardsOnTable.value[i].cover = true // Hide first 3 rows of cards
		}
		else if (i === 28) 
			cardsOnWaste.value.push(cardsOnStock.value[i])
		else
			remainingCards.push(cardsOnStock.value[i])
	}

	cardsOnStock.value = remainingCards
	cardsLeft.value = cardsOnTable.value.length
	gameStatus.value = 'New game started.'
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
	if (whereIsCard === 'table')
		return {
			cardId: cardsOnTable.value[singleCardId].id,
			cover: cardsOnTable.value[singleCardId].cover
		}
	if (whereIsCard === 'waste')
		return {
			cardId: cardsOnWaste.value.slice(-1)[0].id,
			cover: false
	}
	
}

const cardClickHandler = cardPosition => {
	cardsOnTable.value[cardPosition].cover = !cardsOnTable.value[cardPosition].cover
	gameStatus.value = cardToText(cardsOnTable.value[cardPosition].id) + ' clicked.'
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
}
.row1 {
	display: flex;
	flex-direction: row;
	gap: 125px;
	z-index: 2;
}
.row2-all {
	position: absolute;
	top: 43px;
	display: flex;
	flex-direction: row;
	gap: 65px;
	margin: auto;
	align-content: center;
	z-index: 2;
}
.row2-pairs {
	display: flex;
	flex-direction: row;
	gap: 5px;
}
.row3 {
	position: absolute;
	top: 86px;
	display: flex;
	flex-direction: row;
	gap: 5px;
	z-index: 3;
}
.row4 {
	position: absolute;
	top: 129px;
	display: flex;
	flex-direction: row;
	gap: 5px;
	margin: auto;
	z-index: 4;
}
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
	left: 3px;
	z-index: -1;
	left: 5px;
}
.msg-log {
	width: 700px;
	margin: auto;
}
.btn-reset {
	align-self: auto;
}
</style>
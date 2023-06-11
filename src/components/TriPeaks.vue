<template>
	<div class="board">
		<div class="row1">
			<single-card :params="cardProps(0)" @click="cardClickHandler(0)"/>
			<single-card :params="cardProps(1)" @click="cardClickHandler(1)"/>
			<single-card :params="cardProps(2)" @click="cardClickHandler(2)"/>
		</div>
		<div class="row2-all">
			<div class="row2-pairs">
				<single-card :params="cardProps(3)" @click="cardClickHandler(3)"/>
				<single-card :params="cardProps(4)" @click="cardClickHandler(4)"/>
			</div>
			<div class="row2-pairs">
				<single-card :params="cardProps(5)" @click="cardClickHandler(5)"/>
				<single-card :params="cardProps(6)" @click="cardClickHandler(6)"/>
			</div>
			<div class="row2-pairs">
				<single-card :params="cardProps(7)" @click="cardClickHandler(7)"/>
				<single-card :params="cardProps(8)" @click="cardClickHandler(8)"/>
			</div>
		</div>
		<div class="row3">
			<single-card :params="cardProps(9)" @click="cardClickHandler(9)"/>
			<single-card :params="cardProps(10)" @click="cardClickHandler(10)"/>
			<single-card :params="cardProps(11)" @click="cardClickHandler(11)"/>
			<single-card :params="cardProps(12)" @click="cardClickHandler(12)"/>
			<single-card :params="cardProps(13)" @click="cardClickHandler(13)"/>
			<single-card :params="cardProps(14)" @click="cardClickHandler(14)"/>
			<single-card :params="cardProps(15)" @click="cardClickHandler(15)"/>
			<single-card :params="cardProps(16)" @click="cardClickHandler(16)"/>
			<single-card :params="cardProps(17)" @click="cardClickHandler(17)"/>
		</div>
		<div class="row4">
			<single-card :params="cardProps(18)" @click="cardClickHandler(18)"/>
			<single-card :params="cardProps(19)" @click="cardClickHandler(19)"/>
			<single-card :params="cardProps(20)" @click="cardClickHandler(20)"/>
			<single-card :params="cardProps(21)" @click="cardClickHandler(21)"/>
			<single-card :params="cardProps(22)" @click="cardClickHandler(22)"/>
			<single-card :params="cardProps(23)" @click="cardClickHandler(23)"/>
			<single-card :params="cardProps(24)" @click="cardClickHandler(24)"/>
			<single-card :params="cardProps(25)" @click="cardClickHandler(25)"/>
			<single-card :params="cardProps(26)" @click="cardClickHandler(26)"/>
			<single-card :params="cardProps(27)" @click="cardClickHandler(27)"/>
		</div>
		<div class="stock-waste">
			<div class="inside-border">
				<single-card />
			</div>
			<div class="inside-border">
				<single-card randomCard/>
			</div>
		</div>
		<button class="btn-reset" @click="startGame">New Game</button>
	</div>
	<div class="msg-log">
		<h5 style="color:lightgrey">Log: {{ gameStatus }}</h5>
	</div>

	<!-- <div class="msg-log">
		STACK
		<span v-for="(card, index) in cardsOnStack" :key="card.id">
			{{ index }} / {{ cardsOnStack.length }}:	{{ cardToText(card.id) }}
		</span>
		TABLE
		<span v-for="(card, index) in cardsOnTable" :key="card.id">
			{{ index }} / {{ cardsOnTable.length }}:{{ cardToText(card.id) }}
		</span>
	</div> -->
</template>

<script setup>
import SingleCard from '@/components/SingleCard'
import cardData from '@/assets/cards/cards.json'

import { ref, onBeforeMount } from 'vue'

const cardsOnStack = ref([])
const cardsOnTable = ref([])
const gameStatus = ref('')

const startGame = () => {
	const remainingCards = []
	let arrLen
	
	gameStatus.value = ''
	cardsOnStack.value = [] // Reset decks
	cardsOnTable.value = [] // Reset decks
	
	cardsOnStack.value = fy_shuffle(cardData) // Shuffle deck
	arrLen = cardsOnStack.value.length

	for (let i = 0; i < arrLen; i++) {
		cardsOnStack.value[i].cover = false // Reset flipped cards

		if (i < 28) {
			cardsOnTable.value.push(cardsOnStack.value[i])
			if (i < 18)
				cardsOnTable.value[i].cover = true // Hide first 3 rows of cards
		}
		else
			remainingCards.push(cardsOnStack.value[i])
	}

	cardsOnStack.value = remainingCards
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

function cardProps(singleCardId) {
	return {
		cardId: cardsOnTable.value[singleCardId].id,
		cover: cardsOnTable.value[singleCardId].cover
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
.msg-log {
	display: flex;
	width: 700px;
	margin: auto;
	position: relative;
	top: 50px;
	z-index: 100;
}
.btn-reset {
	position: fixed;
	top: 350px;
	align-self: flex-start;
	z-index: 100;
}
.board {
	top: 30px;
	margin: auto;
	display: flex;
	flex-direction: column;
	gap: 15px;
	width: 700px;
	height: 360px;
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
	position: absolute;
	top: 250px;
	display: flex;
	flex-direction: row;
	gap: 10px;
	margin: auto;
	z-index: 5;
}
.inside-border {
	-webkit-box-shadow:inset 0px 0px 0px 3px #ffffff82;
	-moz-box-shadow:inset 0px 0px 0px 3px #ffffff82;
	box-shadow:inset 0px 0px 0px 3px #ffffff82;
}
</style>
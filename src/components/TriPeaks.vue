<template>
	<div class="board">
		<div class="row1">
			<single-card :cardId="cardsOnTable[0].id" @click="cardClickHandler(cardsOnTable[0])" :cover="cardsOnTable[0].cover"/>
			<!-- amanha: passar isto tudo para dentro de uma funcao ou computed ou assim que receba parametros -->
			<single-card :cardId="cardsOnTable[1].id"/>
			<single-card :cardId="cardsOnTable[2].id"/>
		</div>
		<div class="row2-all">
			<div class="row2-pairs">
				<single-card :cardId="cardsOnTable[3].id" @click="cardClickHandler(cardsOnTable[3])" :cover="cardsOnTable[3].cover"/>
				<single-card :cardId="cardsOnTable[4].id"/>
			</div>
			<div class="row2-pairs">
				<single-card :cardId="cardsOnTable[5].id"/>
				<single-card :cardId="cardsOnTable[6].id"/>
			</div>
			<div class="row2-pairs">
				<single-card :cardId="cardsOnTable[7].id"/>
				<single-card :cardId="cardsOnTable[8].id"/>
			</div>
		</div>
		<div class="row3">
			<single-card :cardId="cardsOnTable[9].id"/>
			<single-card :cardId="cardsOnTable[10].id"/>
			<single-card :cardId="cardsOnTable[11].id"/>
			<single-card :cardId="cardsOnTable[12].id"/>
			<single-card :cardId="cardsOnTable[13].id"/>
			<single-card :cardId="cardsOnTable[14].id"/>
			<single-card :cardId="cardsOnTable[15].id"/>
			<single-card :cardId="cardsOnTable[16].id"/>
			<single-card :cardId="cardsOnTable[17].id"/>
		</div>
		<div class="row4">
			<single-card :cardId="cardsOnTable[18].id"/>
			<single-card :cardId="cardsOnTable[19].id"/>
			<single-card :cardId="cardsOnTable[20].id"/>
			<single-card :cardId="cardsOnTable[21].id"/>
			<single-card :cardId="cardsOnTable[22].id"/>
			<single-card :cardId="cardsOnTable[23].id"/>
			<single-card :cardId="cardsOnTable[24].id"/>
			<single-card :cardId="cardsOnTable[25].id"/>
			<single-card :cardId="cardsOnTable[26].id"/>
			<single-card :cardId="cardsOnTable[27].id"/>
		</div>
		<div class="stock-waste">
			<single-card randomCard/>
			<single-card cover/>
		</div>
		<button class="btn-reset" @click="startGame">New Game</button>
	</div>
	<div class="msg-log">
		bla bla bla
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

const startGame = () => {
	console.log('start game.')
	const remainingCards = []
	let arrLen
	
	cardsOnStack.value = fy_shuffle(cardData) // Shuffle deck
	cardsOnTable.value = [] // Clear cards on table
	arrLen = cardsOnStack.value.length

	for (let i = 0; i < arrLen; i++) {
		if (i < 28)
			cardsOnTable.value.push(cardsOnStack.value[i])
		else
			remainingCards.push(cardsOnStack.value[i])
	}

	cardsOnStack.value = remainingCards
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

const cardClickHandler = card => {
	const index = cardsOnTable.value.findIndex(el => el.id === card.id)

	cardsOnTable.value[index].cover = !cardsOnTable.value[index].cover
}
// function cardToText (card) {
// 	let cardSuit, cardValue

// 	switch (card.slice(0, 1)) {
// 		case '1':
// 			cardSuit = '♣'
// 			break
// 		case '2':
// 			cardSuit = '♦'
// 			break
// 		case '3':
// 			cardSuit = '♠'
// 			break
// 		case '4':
// 			cardSuit = '♥'
// 			break
// 	}

// 	switch (card.slice(1, 3)) {
// 		case '01':
// 			cardValue = 'A'
// 			break
// 		case '10':
// 			cardValue = '10'
// 			break
// 		case '11':
// 			cardValue = 'J'
// 			break
// 		case '12':
// 			cardValue = 'Q'
// 			break
// 		case '13':
// 			cardValue = 'K'
// 			break
// 		default:
// 			cardValue = card.slice(2, 3)
// 			break
// 	}
// 	return '[' + cardValue + cardSuit + ']'
// }

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
	gap: 5px;
	margin: auto;
	z-index: 5;
}
</style>
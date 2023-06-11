<template>
	<div class="card-base" @cardClicked="emit('cardClicked', props.cardId)">
		<img :src="getCardPath()" v-if="!emptyCard"/>
	</div>
</template>

<script setup>
import { ref } from 'vue'

import cardData from '@/assets/cards/cards.json'
import cardExtras from '@/assets/cards/cardsExtras.json'

/* Vars */
const emptyCard = ref(false)

/* Props
@params.cardId { String } Id of specific card
@params.cover { Boolean } Returns fliped card
@randomCard { Boolean } Returns random Card
*/
const props = defineProps({
	params: Object,
	randomCard: Boolean
})

const getCardPath = () => {
	if (props.params) {
		if (props.params.cover) return require('../assets/cards/' + cardExtras[1].filename) // Deck cover 1
		if (props.params.cardId) return require('../assets/cards/' + cardData[cardData.findIndex(card => card.id === props.params.cardId)].filename) // Find index where id = prop and returns it's filename
	}
	if (props.randomCard) return require('../assets/cards/' + cardData[randomCardPicker(0, 51)].filename)
	else {
		emptyCard.value = true
		return require('../assets/cards/' + cardData[0].filename) // Return empty card
	}
}

const randomCardPicker = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1) + min)
}

</script>

<style scoped>
.card-base {
	width: 56px;
	height: 86px;
	margin: 0;
}
img {
	border-radius: 7px;
	width: 56px;
	height: 86px;
	box-shadow: 3px 3px 5px rgb(49, 48, 48);
}
</style>
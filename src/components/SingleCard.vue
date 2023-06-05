<template>
	<div class="card-base">
		<img :src="getCardPath()"/>
	</div>
</template>

<script setup>
import cardData from '@/assets/cards/cards.json'

/* Props
@cover { Boolean } Returns fliped card
*/
const props = defineProps({
	cover: Boolean
})

const getCardPath = () => {
	if (props.cover) return require('../assets/cards/' + cardData[0].filename)

	const card = randomCardPicker(1, 52)
	return require('../assets/cards/' + cardData[card].filename)
}

const randomCardPicker = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1) + min)
}

</script>

<style scoped>
.card-base {
	outline: 4px solid rgba(255, 255, 255, 0.75);
	outline-offset: -4px;
	border-radius: 7px;
	width: 70px;
	height: 105px;
	margin: 0;
}
img {
	width: 70px;
	height: 105px;
}
</style>
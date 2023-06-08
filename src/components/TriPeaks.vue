<template>
	<div class="board">
		<div class="row1">
			<single-card deckCover/>
			<single-card deckCover/>
			<single-card deckCover/>
		</div>
		<div class="row2-all">
			<div class="row2-pairs">
				<single-card deckCover/>
				<single-card deckCover/>
			</div>
			<div class="row2-pairs">
				<single-card deckCover/>
				<single-card deckCover/>
			</div>
			<div class="row2-pairs">
				<single-card deckCover/>
				<single-card deckCover/>
			</div>
		</div>
		<div class="row3">
			<single-card deckCover/>
			<single-card deckCover/>
			<single-card deckCover/>
			<single-card deckCover/>
			<single-card deckCover/>
			<single-card deckCover/>
			<single-card deckCover/>
			<single-card deckCover/>
			<single-card deckCover/>
		</div>
		<div class="row4">
			<single-card randomCard/>
			<single-card randomCard/>
			<single-card randomCard/>
			<single-card randomCard/>
			<single-card randomCard/>
			<single-card randomCard/>
			<single-card randomCard/>
			<single-card randomCard/>
			<single-card randomCard/>
			<single-card randomCard/>
		</div>
		<div class="stock-waste">
			<single-card randomCard/>
			<single-card deckCover/>
		</div>
	</div>
</template>

<script setup>
import SingleCard from '@/components/SingleCard'
</script>

<style scoped>
.board {
	top: 30px;
	margin: auto;
	display: flex;
	flex-direction: column;
	gap: 15px;
	width: 700px;
	height: 100%;
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
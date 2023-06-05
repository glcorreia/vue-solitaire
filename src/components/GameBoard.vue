<template>
	<div class="board">
		<div class="foundation">
			<single-card/>
			<single-card/>
			<single-card/>
			<single-card/>
		</div>

		<div class="stock-waste">
			<single-card/>
			<single-card cover/>
		</div>

		<div class="tableau">
			<single-card/>
			<single-card/>
			<single-card/>
			<single-card/>
			<single-card/>
			<single-card/>
			<single-card/>
		</div>
	</div>
</template>

<script setup>
import SingleCard from '@/components/SingleCard'
</script>

<style scoped>
.board {
	margin: auto;
	border: 3px solid gray;
	display: flex;
	flex-direction: column;
	gap: 15px;
	width: 700px;
	height: 400px;
	background-color: #047c04;
	position: relative;
}
.foundation {
	display: flex;
	flex-direction: row;
	gap: 15px;
	margin: 20px 0 0 60px;
}
.stock-waste {
	position: absolute;
	right: 0;
	top: 0;
	display: flex;
	flex-direction: row;
	gap: 15px;
	margin: 20px 60px 0 0;
}
.tableau {
	display: flex;
	flex-direction: row;
	gap: 15px;
	margin: 20px 0 0 60px;
}
</style>
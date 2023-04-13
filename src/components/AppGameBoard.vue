<script setup lang="ts">
import { GameState } from "../models/GameState";

interface IAppGameBoardProps {
  gameState: GameState;
}

const props = defineProps<IAppGameBoardProps>();
</script>

<template>
  <div class="game">
    <div class="game__square" v-for="square in gameState.gameboard"></div>
  </div>
</template>

<style scoped></style>

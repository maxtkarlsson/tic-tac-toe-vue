<script setup lang="ts">
import { ref } from "vue";
import { GameState } from "../models/GameState";
import { Player } from "../models/Player";
import AppRegistration from "./AppRegistration.vue";

const state = ref<GameState>({
  players: [],
  gameboard: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  currentPlayer: 0,
  isGamerOver: false,
});

const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
};

const addPlayer = (name: string) => {
  const playerToAdd = new Player(0, name, 0);
  const playerlist = state.value.players;
  let currentPlayer = state.value.currentPlayer;

  if (playerlist.length < 3) {
    if (playerlist.length === 0) {
      playerToAdd.id = 1;
      playerlist.push(playerToAdd);
    } else if (playerlist.length === 1) {
      playerToAdd.id = 2;
      playerlist.push(playerToAdd);
      currentPlayer = getRandomInt(1, 3);
      console.log(currentPlayer);
    }
  }

  console.log(state.value);
};

const placeGamePiece = (clickedSquare: number) => {
  console.log("Du klickade på ruta: ", clickedSquare);
};
</script>

<template>
  <AppRegistration @add-player="addPlayer" />
  <div class="game">
    <div
      class="game__square"
      v-for="(square, index) in state.gameboard"
      @click="placeGamePiece(index)"
    >
      {{ square }}
    </div>
  </div>
</template>

<style scoped>
.game {
  border: 2px solid brown;
  display: flex;
  flex-wrap: wrap;
  width: 156px;
  height: 156px;
}
.game__square {
  border: 1px solid white;
  width: 50px;
  height: 50px;
}
</style>

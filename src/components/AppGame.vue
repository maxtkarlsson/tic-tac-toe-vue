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

const addPlayer = (name: string) => {
  const playerToAdd = new Player(0, name, 0);
  const playerlist = state.value.players;

  if (playerlist.length < 3) {
    if (playerlist.length === 0) {
      playerToAdd.id = 1;
      playerlist.push(playerToAdd);
    } else if (playerlist.length === 1) {
      playerToAdd.id = 2;
      playerlist.push(playerToAdd);
    }
  }
  console.log(state.value);
};
</script>

<template>
  <AppRegistration @add-player="addPlayer" />
</template>

<style scoped></style>

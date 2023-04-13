<script setup lang="ts">
import { ref } from "vue";
import { GameState } from "../models/GameState";
import { Player } from "../models/Player";
import AppRegistration from "./AppRegistration.vue";
import { getRandomInt } from "../helpers/functions";

const state = ref<GameState>({
  players: [],
  gameboard: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  currentPlayer: 0,
  isGamerOver: false,
});

const addPlayer = (name: string) => {
  const playerToAdd = new Player(0, name, 0);
  const playerlist = state.value.players;
  //Måste ändra till staten

  if (playerlist.length < 3) {
    if (playerlist.length === 0) {
      playerToAdd.id = 1;
      playerlist.push(playerToAdd);
    } else if (playerlist.length === 1) {
      playerToAdd.id = 2;
      playerlist.push(playerToAdd);
      state.value.currentPlayer = getRandomInt(1, 3);
      console.log("CurrentPlayer har satts till: ", state.value.currentPlayer);
    }
  }

  console.log(state.value);
};

const placeGamePiece = (clickedSquare: number) => {
  console.log("Du klickade på ruta: ", clickedSquare);
  console.log("Current player är: ", state.value.currentPlayer);
  state.value.gameboard[clickedSquare] = state.value.currentPlayer;
  if (state.value.currentPlayer === 1) {
    state.value.currentPlayer = 2;
  } else if (state.value.currentPlayer === 2) {
    state.value.currentPlayer = 1;
  }
};
</script>

<template>
  <AppRegistration @add-player="addPlayer" />
  <div class="game">
    <div
      class="game__square"
      v-for="(square, index) in state.gameboard"
      @click.once="placeGamePiece(index)"
    >
      {{ square }}
    </div>
  </div>
  <div>
    <p>
      Current player:<br />
      {{ state.currentPlayer }}
    </p>
    <p>
      Gameboard:<br />
      {{ state.gameboard }}
    </p>
    <p>
      Players:<br />
      {{ state.players }}
    </p>
    <p>
      isGameOver:<br />
      {{ state.isGamerOver }}
    </p>
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

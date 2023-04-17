<script setup lang="ts">
import { ref } from "vue";
import { GameState } from "../models/GameState";
import { Player } from "../models/Player";
import AppRegistration from "./AppRegistration.vue";
import { getRandomInt } from "../helpers/functions";

const state = ref<GameState>({
  players: [],
  gameboard: [10, 20, 30, 40, 50, 60, 70, 80, 90],
  currentPlayer: 0,
  isGamerOver: false,
  moveCount: 0,
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
      state.value.currentPlayer = getRandomInt(1, 3);
      console.log("CurrentPlayer har satts till: ", state.value.currentPlayer);
    }
  }

  console.log(state.value);
};

const gameOver = () => {
  state.value.isGamerOver = true;

  if (state.value.moveCount > 8) {
    return;
  }

  if (state.value.currentPlayer === 1) {
    state.value.players[0].score++;
  }
  if (state.value.currentPlayer === 2) {
    state.value.players[1].score++;
  }
};

const newRound = () => {
  state.value.gameboard = [10, 20, 30, 40, 50, 60, 70, 80, 90];
  state.value.currentPlayer = getRandomInt(1, 3);
  state.value.isGamerOver = false;
  state.value.moveCount = 0;
};

const resetGame = () => {
  state.value.players = [];
  state.value.gameboard = [10, 20, 30, 40, 50, 60, 70, 80, 90];
  state.value.currentPlayer = 0;
  state.value.isGamerOver = false;
  state.value.moveCount = 0;
};

const checkGameBoard = () => {
  // [0][1][2]
  // [3][4][5]
  // [6][7][8]
  const board = state.value.gameboard;

  //Check first row
  if (board[0] === board[1] && board[1] === board[2]) {
    console.log("Första raden matchar");
    gameOver();
  }

  //Check second row
  if (board[3] === board[4] && board[4] === board[5]) {
    console.log("Andra raden matchar");
    gameOver();
  }

  //Check third row
  if (board[6] === board[7] && board[7] === board[8]) {
    console.log("Tredje raden matchar");
    gameOver();
  }

  //Check first column
  if (board[0] === board[3] && board[3] === board[6]) {
    console.log("Första kolumnen matchar");
    gameOver();
  }

  //Check second column
  if (board[1] === board[4] && board[4] === board[7]) {
    console.log("Andra kolumnen matchar");
    gameOver();
  }

  //Check third column
  if (board[2] === board[5] && board[5] === board[8]) {
    console.log("Tredje kolumnen matchar");
    gameOver();
  }

  //Check first diagonal
  if (board[6] === board[4] && board[4] === board[2]) {
    console.log("Första diagonalen matchar");
    gameOver();
  }

  //Check second diagonal
  if (board[0] === board[4] && board[4] === board[8]) {
    console.log("Andra diagonalen matchar");
    gameOver();
  }
};

const placeGamePiece = (clickedSquare: number) => {
  console.log("Du klickade på ruta: ", clickedSquare);
  console.log("Current player är: ", state.value.currentPlayer);
  state.value.gameboard[clickedSquare] = state.value.currentPlayer;
  state.value.moveCount++;
  checkGameBoard();
  if (state.value.moveCount === 9) {
    gameOver();
  }
  if (state.value.currentPlayer === 1) {
    state.value.currentPlayer = 2;
  } else if (state.value.currentPlayer === 2) {
    state.value.currentPlayer = 1;
  }
};
</script>

<template>
  <AppRegistration @add-player="addPlayer" v-if="state.players.length < 2" />
  <div
    class="game"
    v-if="state.isGamerOver === false && state.players.length > 1"
  >
    <div
      class="game__square"
      v-for="(square, index) in state.gameboard"
      @click.once="placeGamePiece(index)"
    >
      <p v-if="state.gameboard[index] === 1">X</p>
      <p v-if="state.gameboard[index] === 2">O</p>
    </div>
  </div>

  <div class="game-over" v-if="state.isGamerOver === true">
    <p v-if="state.currentPlayer === 1 && state.moveCount < 9">
      The winner is {{ state.players[1].name }}!
    </p>
    <p v-if="state.currentPlayer === 2 && state.moveCount < 9">
      The winner is {{ state.players[0].name }}!
    </p>
    <p v-if="state.moveCount > 8">It is a draw!</p>

    <button @click="newRound">Play again</button>
  </div>

  <div class="game-stats">
    <p class="game-stats__header" v-if="state.isGamerOver === false">
      Current player is:
    </p>
    <div class="game-stats__text" v-for="(player, index) in state.players">
      <p
        v-if="state.currentPlayer === player.id && state.isGamerOver === false"
      >
        {{ player.name }}
      </p>
    </div>
    <p class="game-stats__header">Score:</p>
    <div class="game-stats__text" v-for="(player, index) in state.players">
      <p>{{ player.name }} has a score of {{ player.score }}.</p>
    </div>
  </div>
  <div class="nav">
    <button class="nav__btn-reset" @click="resetGame">Reset game</button>
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

.game-over p {
  font-size: 50px;
}

.game-stats__header {
  font-size: 20px;
  font-weight: bold;
}
</style>

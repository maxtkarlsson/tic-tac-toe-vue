<script setup lang="ts">
import { ref } from "vue";
import { Player } from "../models/Player";

let state = ref<Player>({ id: 0, name: "", score: 0 });
const players = ref<Player[]>([]);

const addPlayer = () => {
  players.value.push(state.value);
  localStorage.setItem("players", JSON.stringify(players));
  state.value = { id: 0, name: "", score: 0 };
  console.log(players);
  let playersFromLS = JSON.parse(localStorage.getItem("players") || "[]");
  console.log(playersFromLS);
};
</script>

<template>
  <form @submit.prevent="addPlayer">
    <input type="text" v-model="state.name" />
    <button>Add player</button>
    <p>{{ state }}</p>
  </form>
</template>

<style scoped></style>

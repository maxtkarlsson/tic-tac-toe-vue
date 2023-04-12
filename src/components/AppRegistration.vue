<script setup lang="ts">
import { ref } from "vue";

const name = ref("");

const emit = defineEmits(["addPlayer"]);

function handleSubmit(playername: string) {
  emit("addPlayer", playername);
}
</script>

<template>
  <form @submit.prevent="handleSubmit(name)">
    <input type="text" v-model="name" />
    <button type="submit">Add player</button>
    <p>{{ name }}</p>
  </form>
</template>

<style scoped></style>

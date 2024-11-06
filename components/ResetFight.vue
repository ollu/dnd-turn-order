<template>
  <button @click="resetFight" class="text-sm uppercase underline text-gray-400">Reset</button>
</template>
<script setup>
import { useTurnOrderStore } from '~/stores/turnOrder';

function resetFight() {
  const store = useTurnOrderStore()
  store.resetFight()
}
</script>

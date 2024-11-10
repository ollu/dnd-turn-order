<template>
  <a href="#" @click="resetTurnCounter" class="md:self-center rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Reset turn counter</a>
  <a href="#" @click="resetFight" class="md:self-center rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Reset fight</a>
  <a href="#" @click="deleteAllHeroes" class="md:self-center rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Delete all heroes</a>
</template>
<script setup>
const store = useTurnOrderStore()
const emit = defineEmits(["toggleMenu"]);

function deleteAllHeroes() {
  store.deleteAllHeroes()
  emit('toggleMenu')
}

function resetFight() {
  store.resetFight()
  emit('toggleMenu')
}

function resetTurnCounter() {
  store.resetTurnCounter()
  emit('toggleMenu')
}
</script>

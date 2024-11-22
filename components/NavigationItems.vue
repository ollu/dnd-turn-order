<template>
  <NuxtLink to="/fumble-charts" @click="closeMenu" class="md:self-center rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Fumble charts</NuxtLink>
  <a href="#" @click="deleteAllHeroes" class="md:self-center rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Delete all heroes</a>
  <a href="#" @click="resetFight" class="md:self-center rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Reset fight</a>
  <a href="#" @click="resetTurnCounter" class="md:self-center rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Reset turn counter</a>
</template>
<script setup>
const store = useTurnOrderStore()
const emit = defineEmits(["toggleMenu"]);

function deleteAllHeroes() {
  store.deleteAllHeroes()
  closeMenu()
}

function closeMenu() {
  emit('toggleMenu')
}

function resetFight() {
  store.resetFight()
  closeMenu()
}

function resetTurnCounter() {
  store.resetTurnCounter()
  closeMenu()
}
</script>

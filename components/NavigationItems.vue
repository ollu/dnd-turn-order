<template>
  <NuxtLink to="/fumble-charts" @click="closeMenu" class="md:self-center rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Fumble charts</NuxtLink>
  <a href="#" @click="deleteAllHeroes" class="md:self-center rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Delete all heroes</a>
  <a href="#" @click="resetFight" class="md:self-center rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Reset fight</a>
  <a href="#" @click="resetTurnCounter" class="md:self-center rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Reset turn counter</a>
  <a href="#" @click="userLogout" class="md:self-center rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Log out</a>
</template>
<script setup>
const store = useSupabaseStore()
const emit = defineEmits(["toggleMenu"])
const { auth } = useSupabaseClient()

const userLogout = async () => {
  await auth.signOut();
};

function deleteAllHeroes() {
  store.deleteAllHeroes()
  closeMenu()
}

function closeMenu() {
  emit('toggleMenu')
}

function resetFight() {
  store.deleteAllMonsters()
  store.ResetInitiative()
  closeMenu()
}

function resetTurnCounter() {
  store.resetTurnCounter()
  closeMenu()
}
</script>

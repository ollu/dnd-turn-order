<template>
<div class="flex flex-col h-screen">
  <VitePwaManifest />
  <nav class="bg-gray-800 border-gray-700">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4 pr-4">
      <span href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="../assets/dragon.png" class="w-12 h-12 ml-4" alt="">
        <h1 class="text-xl text-blood font-semibold text-center ml-4 capitalize">Cavemen turn order</h1>
      </span>
      <button @click="toggleMenu" type="button" class="inline-flex items-center justify-center p-2 w-10 h-10 text-sm rounded-lg focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600">
        <span class="sr-only">Mellon</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
      </button>
      <div :class="{'hidden': !isMenuOpen, 'block': isMenuOpen}">
        <ul class="pl-4 flex flex-col font-medium mt-4 bg-gray-800 border-gray-700">
          <li><a href="#" @click="resetTurnCounter" class="block py-2 px-4 text-gray-400 hover:bg-gray-700">Reset turn counter</a></li>
          <li><a href="#" @click="resetFight" class="block py-2 px-4 text-gray-400 hover:bg-gray-700">New fight</a></li>
          <li><a href="#" @click="deleteHeroes" class="block py-2 px-4 text-gray-400 hover:bg-gray-700">Delete all heroes</a></li>
          <li><a href="#" class="block py-2 px-4 text-gray-400 hover:bg-gray-700">Edit/add conditions</a></li>
        </ul>
      </div>
    </div>
  </nav>
  <main class="flex-1 overflow-auto pb-24">
    <div v-if="store.players.length == 0" class="mt-10 mx-4 text-xl">
      <p>Add some players and monsters to start the fight!</p>
    </div>
    <div v-else>
      <PlayerList class="mx-2" />
    </div>
  </main>
  <OFooter />
</div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useTurnOrderStore } from '~/stores/turnOrder'
import PlayerList from '~/components/PlayerList.vue'
const store = useTurnOrderStore()
const isMenuOpen = ref(false)

function resetFight() {
  toggleMenu()
  store.resetFight()
}

function deleteHeroes() {
  console.log('deleteHeroes')
  toggleMenu()
  // store.deleteAllHeroes()
}

onMounted(() => {
  store.loadFromLocalStorage()
})

function resetTurnCounter() {
  store.resetTurnCounter()
  toggleMenu()
}

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

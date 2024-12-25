<template>
  <ul class="flex flex-col gap-1 md:w-4/12 md:mx-auto">
    <li><NuxtLink to="/fumble-charts" @click="closeMenu" class="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Fumble charts</NuxtLink></li>
    <li><a href="#" @click="deleteAllHeroes" class="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Delete all heroes</a></li>
    <li><a href="#" @click="resetFight" class="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Reset fight</a></li>
    <li><a href="#" @click="resetTurnCounter" class="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Reset turn counter</a></li>
    <li class=""><a href="#" @click="userLogout" class="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Log out<OIcon size="small" :icon="iconLogOut" /></a></li>
  </ul>
</template>
<script setup>
import { iconLogOut } from '~/assets/icons.js'
const store = useSupabaseStore()
const emit = defineEmits(["toggleMenu"])
const { auth } = useSupabaseClient()

const userLogout = async () => {
  await auth.signOut();
};

function deleteAllHeroes() {
  let isHero = true
  store.deletePlayersOfType(isHero)
  closeMenu()
}

function closeMenu() {
  emit('toggleMenu')
}

function resetFight() {
  let isHero = false
  store.deletePlayersOfType(isHero)
  store.ResetPlayerValues()
  store.resetTurnCounter()
  closeMenu()
}

function resetTurnCounter() {
  store.resetTurnCounter()
  closeMenu()
}
</script>

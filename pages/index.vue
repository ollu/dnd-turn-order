<template>
  <main class="pb-24">
    <div v-if="store.players.length === 0" class="mt-10 mx-4 text-xl">
      <p>Add some players and monsters to start the fight!</p>
    </div>
    <div v-else>
      <PlayersList />
    </div>
  </main>
</template>

<script setup>
import { onMounted } from 'vue'
import { useSupabaseStore } from '~/stores/supabase'
const store = useSupabaseStore()

let subscriptionPlayers;
let subscriptionGame;

onMounted(async () => {
  if (store.players.length === 0) {
    await store.loadGameData()
  }
  subscriptionPlayers = store.subscribeToPlayersChanges()
  subscriptionGame = store.subscribeToGameChanges()
})

onUnmounted(() => {
  if (subscriptionPlayers && subscriptionGame) {
    subscriptionPlayers.unsubscribe()
    subscriptionGame.unsubscribe()
  }
})
</script>

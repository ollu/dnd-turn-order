<template>
  <main class="pb-24">
    <div v-if="store.players?.length === 0" class="mt-10 mx-4 text-xl">
      <p>Add some players and monsters to start the fight!</p>
    </div>
    <div v-else>
      <PlayersList />
    </div>
  </main>
</template>

<script setup>
import { onMounted } from 'vue'
const store = useSupabaseStore()

onMounted(async () => {
  if (!store.players?.length) {
    const data = await store.loadTurnOrder()
    store.players = data
  }
})
</script>

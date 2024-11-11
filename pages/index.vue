<template>
  <main class="flex-1 overflow-auto pb-24">
    <div v-if="store.players.length == 0" class="mt-10 mx-4 text-xl">
      <p>Add some players and monsters to start the fight!</p>
    </div>
    <div v-else>
      <PlayersList class="mx-2" />
    </div>
  </main>
</template>

<script setup>
import { onMounted } from 'vue'
const store = useTurnOrderStore()

onMounted(() => {
  store.loadFromLocalStorage()
})

</script>

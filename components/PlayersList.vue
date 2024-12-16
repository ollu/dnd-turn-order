<template>
  <div class="mx-auto max-w-2xl">
    <ul class="mx-2 md:mx-4">
      <li v-for="player in store.players" :key="player.id" class="flex gap-2 h-16 border rounded p-2 my-2 odd:bg-gray-100 even:bg-gray-200 relative">
        <div v-if="isDead(player.conditions)" class="animate-rise grid grid-flow-row">
          <OIcon color="medium" :icon="iconTombStone" size="x-large"/>
        </div>
        <div @click="openEditPlayer(player.id)" class="shrink w-full z-50 cursor-pointer">
          <div class="grid gap-2">
            <div class="flex">
              <span class="capitalize font-bold flex items-center gap-1">
                <OIcon v-if="player.isHero" color="hero" size="small" :icon="iconPacman" />
                <OIcon v-if="!player.isHero" color="dark" size="small" :icon="iconGhost" />
                {{ player.name }}
              </span>
            </div>
            <div v-if="player.conditions.length > 0" class="text-xs uppercase">
              <span v-for="(condition, index) in player.conditions.filter(c => c !== 'Dead')" :key="index" class="pr-1">&nbsp;{{ condition }}</span>
            </div>
            <div v-else class="text-xs uppercase text-gray-300">No conditions</div>
          </div>
        </div>
        <div class="shrink-0 w-14 h-full flex items-center justify-center text-center text-2xl rounded bg-white/10 border-l border-t border-gray-400 z-40 font-semibold cursor-pointer">
          <span v-if="editingIndex !== player.id" @click="editInitiative(player.id)">{{ player.initiative }}</span>
          <input v-else type="tel" v-model.number="newInitiative" @blur="saveInitiative(player.id)" @keyup.enter="saveInitiative(player.id)" class="w-full h-full rounded text-center bg-white/90 border-none focus:outline-none">
        </div>
      </li>
    </ul>
    <ModalEditPlayer v-if="editModal" :playerID="currentPlayerIndex" @close="closeEditModal"/>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { iconGhost, iconPacman, iconTombStone } from '~/assets/icons.js'

const store = useSupabaseStore()
const editModal = ref(false)
const currentPlayerIndex = ref(null)
const editingIndex = ref(null)
const newInitiative = ref(0)

function openEditPlayer(index) {
  currentPlayerIndex.value = index
  editModal.value = true
}

function closeEditModal() {
  editModal.value = false
}

/**
 * @param pid Player ID
 */
function editInitiative(pid) {
  let player = store.getPlayerById(pid)
  editingIndex.value = pid
  newInitiative.value = player.initiative
}

/**
 * @param pid Player ID
 */
function saveInitiative(pid) {
  // Only save if the value is a number
  if (parseInt(newInitiative.value)) {
    let player = store.getPlayerById(pid)
    player.initiative = newInitiative.value
    store.updatePlayer(player)
  }

  editingIndex.value = null
}

function isDead(conditions) {
  return conditions.some(c => c === 'Dead')
}

</script>
<style scoped>
.bounce-enter-active {
  animation: bounce-in 0.25s;
  transition: opacity 0.25s;
}
.bounce-leave-active {
  animation: bounce-in 0.25s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.10);
  }
  100% {
    transform: scale(1);
  }
}
</style>

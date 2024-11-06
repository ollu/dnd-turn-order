<template>
  <div>
    <ul>
      <li v-for="(player, index) in store.players" :key="index" class="flex gap-2 h-16 border rounded p-2 my-2 odd:bg-gray-100 even:bg-gray-200">
        <div class="shrink w-full">
          <div class="grid grid-rows-2 gap-2">
            <div>
              <button @click="openEditPlayer(index)" class="capitalize font-bold flex gap-2">
                <OIcon color="medium" :icon="iconAccountEdit" />
                {{ player.name }}
              </button>
            </div>
            <div class="text-xs uppercase">
              <button @click="openConditionsModal(index)" class="uppercase text-gray-400"><span class="text-sm font-semibold">+</span>Cond</button>
              <span v-if="player.conditions.length > 0">
                <span v-for="condition in player.conditions" :key="condition" class="pr-1">{{ condition }}</span>
              </span>
            </div>
          </div>
        </div>
        <div class="w-14 h-full flex items-center justify-center text-center text-2xl rounded bg-white/5 border-l border-t border-gray-400">
          <span v-if="editingIndex !== index" @click="editInitiative(index)">{{ player.initiative }}</span>
          <input v-else type="tel" v-model.number="newInitiative" @blur="saveInitiative(index)" @keyup.enter="saveInitiative(index)" class="w-full text-center bg-transparent border-none focus:outline-none">
        </div>
      </li>
    </ul>
    <ModalConditions v-if="conditionsModal" :playerIndex="currentPlayerIndex" @close="closeConditionsModal"/>
    <ModalEditPlayer v-if="editModal" :playerIndex="currentPlayerIndex" @close="closeEditModal"/>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTurnOrderStore } from '~/stores/turnOrder'
import ModalConditions from './ModalConditions.vue'
import { iconAccountEdit } from '~/assets/icons.js'

const store = useTurnOrderStore()
const conditionsModal = ref(false)
const editModal = ref(false)
const currentPlayerIndex = ref(null)
const editingIndex = ref(null)
const newInitiative = ref(0)

function openConditionsModal(index) {
  currentPlayerIndex.value = index
  conditionsModal.value = true
}

function openEditPlayer(index) {
  currentPlayerIndex.value = index
  editModal.value = true
}

function closeEditModal() {
  editModal.value = false
}

function closeConditionsModal() {
  conditionsModal.value = false
}

function editInitiative(index) {
  editingIndex.value = index
  newInitiative.value = store.players[index].initiative
}

function saveInitiative(index) {
  store.players[index].initiative = newInitiative.value
  store.sortPlayers()
  store.saveToLocalStorage()
  editingIndex.value = null
}

function removePlayer(index) {
  store.removePlayer(index)
}
</script>

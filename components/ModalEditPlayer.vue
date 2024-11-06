<template>
  <ModalWrapper @close="closeModal">
    <template #title>Update hero/monster</template>
    <template #body>
      <label for="hero-name" class="pl-2 block text-sm font-medium text-gray-900">Hero name</label>
      <input v-model="heroName" type="text" id="hero-name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
      <label for="hero-initiative" class="mt-2 pl-2 block text-sm font-medium text-gray-900">Hero initiative</label>
      <input v-model="initiative" type="text" id="hero-initiative" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
    </template>
    <template #footer>
      <button class="btn primary" @click="updatePlayer">Update</button>
    </template>
  </ModalWrapper>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { useTurnOrderStore } from '~/stores/turnOrder'
const props = defineProps({
  playerIndex: {
    type: Number,
    required: true
  }
})
const emit = defineEmits(["close"]);
const store = useTurnOrderStore()
const heroName = ref("")
const initiative = ref(0)

function updatePlayer() {
  store.players[props.playerIndex].name = heroName.value
  store.players[props.playerIndex].initiative = initiative.value
  store.sortPlayers()
  store.saveToLocalStorage()
  closeModal()
}

onMounted(() => {
  heroName.value = store.players[props.playerIndex].name
  initiative.value = store.players[props.playerIndex].initiative
})

function closeModal() {
  emit("close");
}
</script>

<template>
  <ModalWrapper @close="closeModal">
    <template #title>Update hero/monster</template>
    <template #body>
      <label for="hero-name" class="pl-2 block text-sm font-medium text-gray-900">Name</label>
      <input v-model="heroName" @keyup.enter="updatePlayer" type="text" id="hero-name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
      <p v-if="noName" class="text-blood text-sm pl-2">No fantasy, maybe <em>Stupid</em> could work?</p>
      <label for="hero-initiative" class="mt-2 pl-2 block text-sm font-medium text-gray-900">Initiative</label>
      <input v-model="initiative" @keyup.enter="updatePlayer" type="tel" id="hero-initiative" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
      <Conditions :playerID="playerID" @update:conditions="handleSelectedConditions" />
    </template>
    <template #footer>
      <button class="btn secondary" @click="deletePlayer">Delete player</button>
      <button class="btn primary" @click="updatePlayer">Update</button>
    </template>
  </ModalWrapper>
</template>
<script setup>
import { onMounted, ref } from 'vue'
const props = defineProps({
  playerID: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(["close"]);
const store = useSupabaseStore()
const heroName = ref("")
const initiative = ref(0)
const noName = ref(false)
const player = ref(null)
const selectedConditions = ref([])

function updatePlayer() {
  if (!heroName.value) {
    noName.value = true
    return
  }

  store.updatePlayer({
    id: props.playerID, 
    name: heroName.value, 
    initiative: initiative.value,
    conditions: [...selectedConditions.value],
    isHero: player.value.isHero
  })
  noName.value = false
  closeModal()
}

onMounted(() => {
  player.value = store.getPlayerById(props.playerID)
  
  heroName.value = player.value.name
  initiative.value = player.value.initiative
})


function handleSelectedConditions(conditions) {
  selectedConditions.value = conditions
}

function deletePlayer() {
  store.deletePlayerById(props.playerID)
  closeModal()
}

function closeModal() {
  emit("close");
}
</script>

<template>
  <ModalWrapper @close="closeModal">
    <template #title>Update hero/monster</template>
    <template #body>
      <label for="hero-name" class="pl-2 block text-sm font-medium text-gray-900">Name</label>
      <input v-model="heroName" @keyup.enter="updatePlayer" type="text" id="hero-name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
      <p v-if="noName" class="text-blood text-sm pl-2">No fantasy, maybe <em>Stupid</em> could work?</p>
      <span class="grid grid-cols-2 gap-2">
        <span>
          <label for="hero-initiative" class="mt-2 pl-2 block text-sm font-medium text-gray-900">Initiative</label>
          <input v-model="initiative" @keyup.enter="updatePlayer" type="tel" id="hero-initiative" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
        </span>
        <span>
          <label for="hero-initiative" class="mt-2 pl-2 block text-sm font-medium text-gray-900">Last in turn</label>
          <button
            @click="toggleSortLastInTurn"
            :class="buttonClass"
            class="btn w-full h-[42px]"
          >
            <span class="flex items-center justify-center gap-2">{{ isLastInTurn ? 'Yes' : 'No' }}<OIcon v-if="isLastInTurn" color="dark" size="small" :icon="iconLastInTurn" /></span>
          </button>
        </span>
      </span>
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
import { iconLastInTurn } from '~/assets/icons';
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
const isLastInTurn = ref(false)

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
    isHero: player.value.isHero,
    lastInTurn: isLastInTurn.value
  })
  noName.value = false
  closeModal()
}

const buttonClass = computed(() => {
  return isLastInTurn.value ? 'bg-yellow-300' : 'bg-gray-300'
})

function toggleSortLastInTurn() {
  isLastInTurn.value = !isLastInTurn.value
}

onMounted(() => {
  player.value = store.getPlayerById(props.playerID)
  
  heroName.value = player.value.name
  initiative.value = player.value.initiative
  isLastInTurn.value = player.value.lastInTurn
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

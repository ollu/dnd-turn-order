<template>
  <ModalWrapper @close="closeModal">
    <template #title>Select Conditions</template>
    <template #body>
      <div class="grid grid-cols-3 gap-1">
        <label v-for="(condition, index) in store.conditions" :key="index" class="flex items-center">
          <input
            type="checkbox"
            :value="condition"
            v-model="localSelectedConditions"
            class="mr-1"
            :disabled="canSelectCondition(condition)"
          >
          {{ condition }}
        </label>
      </div>
      <p v-if="localSelectedConditions.length >= maxConditions" class="text-gray-800 text-sm mt-4">Max number of conditions selected ({{ maxConditions }}).</p>
    </template>
    <template #footer>
      <button @click="clearConditions" class="btn secondary">Clear conditions</button>
      <button @click="saveConditions" class="btn primary" @keyup.enter="saveConditions">Save</button>
    </template>
  </ModalWrapper>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  playerID: {
    type: Number,
    required: true
  }
})
const emit = defineEmits(["close"]);
const store = useSupabaseStore()
const localSelectedConditions = ref([])
const maxConditions = 3

watch(() => props.playerID, (newPlayerID) => {
  if (newPlayerID !== null) {
    const player = store.getPlayerById(newPlayerID)

    if (player) {
      localSelectedConditions.value = [...player.conditions]
      console.log(localSelectedConditions.value);
      
    } else {
      console.error(`Player with ID ${newPlayerID} not found`)
    }
  }
}, { immediate: true })

function canSelectCondition(condition) {
  const isConditionSelected = localSelectedConditions.value.some(c => c === condition);
  const hasReachedMaxConditions = localSelectedConditions.value.length >= maxConditions;

  return hasReachedMaxConditions && !isConditionSelected;
}

function closeModal() {
  emit('close')
}

function clearConditions() {
  localSelectedConditions.value = []
  saveConditions()
}

function saveConditions() {
  const player = store.getPlayerById(props.playerID)
  player.conditions = [...localSelectedConditions.value]
  store.updatePlayer(player)
  closeModal()
}

onMounted(async () => {
  if(store.conditions.length === 0) {
    await store.loadConditions()
  }
})
</script>

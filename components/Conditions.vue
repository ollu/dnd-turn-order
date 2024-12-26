<template>
  <main class="px-2 mt-2">
    <h4 class="text-sm font-medium text-gray-900">Select conditions</h4>
    <div class="grid grid-cols-3 gap-1">
      <label v-for="(condition, index) in store.conditions" :key="index" class="flex items-center">
        <input
          type="checkbox"
          :value="condition"
          v-model="localSelectedConditions"
          class="mr-1"
          :disabled="canSelectCondition(condition)"
          @change="emitSelectedConditions"
        >
        <details v-if="condition.description">
          <summary>{{ condition.name }}</summary>
          <p>{{ condition.description }}</p>
        </details>
        <span v-else>{{ condition.name }}</span>
      </label>
    </div>
    <p v-if="localSelectedConditions.length >= maxConditions" class="text-gray-800 text-sm mt-4">Max number of conditions selected ({{ maxConditions }}).</p>
  </main>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  playerID: {
    type: Number,
    required: true
  }
})
const emit = defineEmits(["update:conditions"])
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

function emitSelectedConditions() {
  emit('update:conditions', localSelectedConditions.value)
}

onMounted(async () => {
  if(store.conditions.length === 0) {
    await store.loadConditions()
  }
})
</script>

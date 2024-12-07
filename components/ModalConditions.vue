<template>
  <ModalWrapper @close="closeModal">
    <template #title>Select Conditions</template>
    <template #body>
      <div class="grid grid-cols-3 gap-1">
        <label v-for="condition in conditions" :key="condition.id" class="flex items-center">
          <input
            type="checkbox"
            :value="condition"
            v-model="localSelectedConditions"
            class="mr-1"
            :disabled="canSelectCondition(condition.name)"
          >
          {{ condition.name }}
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
import { useTurnOrderStore } from '~/stores/turnOrder'
import { useSupabaseStore } from '@/stores/supabase'

const props = defineProps({
  playerIndex: {
    type: Number,
    required: true
  }
})
const emit = defineEmits(["close"]);
const store = useTurnOrderStore()
const storeSupabase = useSupabaseStore()
const conditions = ref()
const localSelectedConditions = ref([])
const maxConditions = 3

watch(() => props.playerIndex, (newIndex) => {
  if (newIndex !== null) {
    localSelectedConditions.value = [...store.players[newIndex].conditions]
  }
}, { immediate: true })

function canSelectCondition(condition) {
  const isConditionSelected = localSelectedConditions.value.some(c => c.name === condition);
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
  store.players[props.playerIndex].conditions = [...localSelectedConditions.value]
  store.saveToLocalStorage()
  closeModal()
}

onMounted(async () => {
  if(!conditions.value) {
    conditions.value = await storeSupabase.loadConditions()
  }
})
</script>

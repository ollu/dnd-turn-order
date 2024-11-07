<template>
  <ModalWrapper @close="closeModal">
    <template #title>Select Conditions</template>
    <template #body>
      <div class="grid grid-cols-3 gap-1">
        <label v-for="condition in conditions" :key="condition" class="flex items-center">
          <input
            type="checkbox"
            :value="condition"
            v-model="localSelectedConditions"
            class="mr-1"
            :disabled="isConditionDisabled(condition)"
          >
          {{ condition }}
        </label>
      </div>
      <p v-if="localSelectedConditions.length >= maxConditions" class="text-gray-800 text-sm mt-4">Max number of conditions selected ({{ maxConditions }}).</p>
    </template>
    <template #footer>
      <button @click="saveConditions" class="btn primary" @keyup.enter="saveConditions">Save</button>
    </template>
  </ModalWrapper>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useTurnOrderStore } from '~/stores/turnOrder'

const props = defineProps({
  playerIndex: {
    type: Number,
    required: true
  }
})
const emit = defineEmits(["close"]);
const store = useTurnOrderStore()
const conditions = ref(["Blind", "Charm", "Dead", "Deaf", "Fright", "Grapple", "Invis", "Paralyze", "Petrify", "Poison", "Prone", "Restrain", "Stun", "Unconscious"])
const localSelectedConditions = ref([])
const maxConditions = 3

watch(() => props.playerIndex, (newIndex) => {
  if (newIndex !== null) {
    localSelectedConditions.value = [...store.players[newIndex].conditions]
  }
}, { immediate: true })

const isConditionDisabled = (condition) => {
  return localSelectedConditions.value.length >= maxConditions && !localSelectedConditions.value.includes(condition)
}

function closeModal() {
  emit('close')
}

function saveConditions() {
  store.players[props.playerIndex].conditions = [...localSelectedConditions.value]
  store.saveToLocalStorage()
  closeModal()
}
</script>

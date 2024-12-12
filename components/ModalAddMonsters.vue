<template>
  <ModalWrapper @close="closeModal">
    <template #title>Add monsters</template>
    <template #body>
      <label for="hero-name" class="pl-2 block text-sm font-medium text-gray-900">Monster name</label>
      <input v-model="monsterName" ref="monsterNameRef" @keyup.enter="addMonster" type="text" id="hero-name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
      <p v-if="noName" class="text-blood text-sm pl-2">No fantasy, maybe <em>Stupid</em> could work?</p>
      <label for="hero-initiative" class="mt-2 pl-2 block text-sm font-medium text-gray-900">Monster initiative</label>
      <input v-model="initiative" @keyup.enter="addMonster" type="tel" id="hero-initiative" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
    </template>
    <template #footer>
      <button class="btn secondary" @click="addMonsterAndClose">Add and close</button>
      <button class="btn primary" @click="addMonster">Add monster</button>
    </template>
  </ModalWrapper>
</template>
<script setup>
import { ref } from 'vue'

const emit = defineEmits(["close"]);
const store = useSupabaseStore()
const monsterName = ref("")
const monsterNameRef = ref(null)
const initiative = ref(0)
const noName = ref(false)

onMounted(() => {
  nextTick(() => monsterNameRef.value.focus())
})

function addMonster(reFocus = true) {
  if (!monsterName.value) {
    noName.value = true
    return
  }

  store.addPlayer({name: monsterName.value, initiative: initiative.value, isHero: false })
  monsterName.value = ""
  initiative.value = 0
  noName.value = false
  if (reFocus) nextTick(() => monsterNameRef.value.focus())
}

function addMonsterAndClose() {
  if (monsterName.value) addMonster(false)
  closeModal()
}

function closeModal() {
  emit("close");
}
</script>

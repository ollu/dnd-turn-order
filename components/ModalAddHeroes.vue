<template>
  <ModalWrapper @close="closeModal">
    <template #title>Add heroes</template>
    <template #body>
      <label for="hero-name" class="pl-2 block text-sm font-medium text-gray-900">Hero name</label>
      <input v-model="heroName" @keyup.enter="addHero" type="text" id="hero-name" ref="heroNameRef" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
      <p v-if="noName" class="text-blood text-sm pl-2">No fantasy, maybe <em>Stupid</em> could work?</p>
      <label for="hero-initiative" class="mt-2 pl-2 block text-sm font-medium text-gray-900">Hero initiative</label>
      <input v-model="initiative" @keyup.enter="addHero" type="tel" id="hero-initiative" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
    </template>
    <template #footer>
      <button class="btn secondary" @click="addHeroAndClose">Add and close</button>
      <button class="btn primary" @click="addHero">Add hero</button>
    </template>
  </ModalWrapper>
</template>
<script setup>
import { ref, nextTick } from 'vue'

const emit = defineEmits(["close"]);
const store = useSupabaseStore()
const heroName = ref("")
const heroNameRef = ref(null)
const initiative = ref(0)
const noName = ref(false)

onMounted(() => {
  nextTick(() => heroNameRef.value.focus())
})

function addHero(reFocus = true) {
  if (!heroName.value) {
    noName.value = true
    return
  }

  store.addPlayer({name: heroName.value, initiative: initiative.value, isHero: true })
  heroName.value = ""
  initiative.value = 0
  noName.value = false
  if (reFocus) nextTick(() => heroNameRef.value.focus())
}

function addHeroAndClose() {
  if (heroName.value) addHero(false)
  closeModal()
}

function closeModal() {
  emit("close");
}
</script>

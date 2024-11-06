<template>
  <ModalWrapper @close="closeModal">
    <template #title>Add heroes</template>
    <template #body>
      <label for="hero-name" class="pl-2 block text-sm font-medium text-gray-900">Hero name</label>
      <input v-model="heroName" type="text" id="hero-name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
      <label for="hero-initiative" class="mt-2 pl-2 block text-sm font-medium text-gray-900">Hero initiative</label>
      <input v-model="initiative" type="tel" id="hero-initiative" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
    </template>
    <template #footer>
      <button class="btn secondary" @click="addHeroAndClose">Add and close</button>
      <button class="btn primary" @click="addHero">Add hero</button>
    </template>
  </ModalWrapper>
</template>
<script setup>
import { ref } from 'vue'
import { useTurnOrderStore } from '~/stores/turnOrder'

const emit = defineEmits(["close"]);
const store = useTurnOrderStore()
const heroName = ref("")
const initiative = ref(0)

function addHero() {
  if (heroName.value) {
    store.addPlayer({name: heroName.value, initiative: initiative.value, type: "hero"});
    heroName.value = ""
    initiative.value = 0
  } else {
    alert("WTF");
  }
}

function addHeroAndClose() {
  if (heroName.value) addHero()
  closeModal()
}

function closeModal() {
  emit("close");
}
</script>

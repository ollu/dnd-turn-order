<template>
  <div>
    <footer class="fixed bottom-0 left-0 z-50 w-full h-20 border-t bg-gray-800 border-gray-700">
      <div class="grid h-full max-w-lg grid-cols-3 mx-auto gap-x-0.5">
        <OButton @click.native="heroModal = true">
          <template #icon>
            <OIcon :icon="iconPacman" />
          </template>
          <template #text>
            <span class="text-sm">+ </span>Hero
          </template>
        </OButton>
        <OButton @click.native="incrementTurn" class="border-r border-l">
          <template #icon>
            <span v-if="store.isLoaded" class="font-bold text-gray-50">{{ store.theGame.turnCounter }}</span>
            <span v-else="store.isLoaded" class="font-bold text-gray-50">0</span>
          </template>
          <template #text>
            Turn <span class="text-sm">+</span>
          </template>
        </OButton>
        <OButton @click.native="monsterModal = true">
          <template #icon>
            <OIcon :icon="iconGhost" />
          </template>
          <template #text>
            <span class="text-sm">+ </span>Monster
          </template>
        </OButton>
      </div>
    </footer>
    <ModalAddMonsters v-if="monsterModal" @close="monsterModal = false" />
    <ModalAddHeroes v-if="heroModal" @close="heroModal = false" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import OButton from '~/components/OButton.vue'
import OIcon from './OIcon.vue'
import ModalAddMonsters from './ModalAddMonsters.vue'
import ModalAddHeroes from './ModalAddHeroes.vue'
import { iconGhost, iconPacman } from '~/assets/icons'

const store = useSupabaseStore()
const monsterModal = ref(false)
const heroModal = ref(false)

function incrementTurn() {
  store.changeTurn(1)
}
</script>

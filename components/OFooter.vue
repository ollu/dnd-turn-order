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
        <OButton class="border-r border-l">
          <template #icon>
            <img src="/assets/dice20.svg" alt="D20 Icon" class="w-6 h-6" />
          </template>
          <template #text>Fumble</template>
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

const monsterModal = ref(false)
const heroModal = ref(false)
</script>

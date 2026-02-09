<template>
  <div>
    <footer class="fixed bottom-0 left-0 z-50 w-full h-20 border-t bg-gray-800 border-gray-700">
      <div class="grid h-full max-w-lg grid-cols-4 mx-auto gap-x-0.5">
        <NuxtLink to="/" @click="fumbleMenu = false">
          <OButton class="h-full w-full">
            <template #icon>
              <OIcon :icon="iconHome" />
            </template>
            <template #text>
              Home
            </template>
          </OButton>
        </NuxtLink>
        <div class="relative h-full">
          <Transition name="fumble-menu">
            <div
              v-if="fumbleMenu"
              class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-800 border border-gray-600 rounded-lg shadow-lg overflow-hidden min-w-[160px]"
            >
              <NuxtLink
                to="/fumble-charts?type=hero"
                class="flex items-center gap-2 w-full px-4 py-3 text-sm text-gray-100 hover:bg-gray-700 transition-colors"
                @click="fumbleMenu = false"
              >
                <OIcon :icon="iconPacman" class="w-5 h-5" />
                Heroes
              </NuxtLink>
              <NuxtLink
                to="/fumble-charts?type=monster"
                class="flex items-center gap-2 w-full px-4 py-3 text-sm text-gray-100 hover:bg-gray-700 transition-colors border-t border-gray-700"
                @click="fumbleMenu = false"
              >
                <OIcon :icon="iconGhost" class="w-5 h-5" />
                Monster
              </NuxtLink>
              <NuxtLink
                to="/fumble-charts-manual?type=hero"
                class="flex items-center gap-2 w-full px-4 py-3 text-sm text-gray-100 hover:bg-gray-700 transition-colors border-t border-gray-700"
                @click="fumbleMenu = false"
              >
                <OIcon :icon="iconNumeric" class="w-5 h-5" />
                Manual input
              </NuxtLink>
            </div>
          </Transition>
          <OButton class="border-l h-full w-full" @click.native="fumbleMenu = !fumbleMenu">
            <template #icon>
              <img src="/assets/dice20.svg" alt="D20 Icon" class="w-6 h-6" />
            </template>
            <template #text>Fumble</template>
          </OButton>
        </div>
        <OButton class="border-x" @click.native="heroModal = true; fumbleMenu = false">
          <template #icon>
            <OIcon :icon="iconPacman" />
          </template>
          <template #text>
            + Hero
          </template>
        </OButton>
        <OButton @click.native="monsterModal = true; fumbleMenu = false">
          <template #icon>
            <OIcon :icon="iconGhost" />
          </template>
          <template #text>
            + Fiend
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
import { iconGhost, iconPacman, iconHome, iconNumeric } from '~/assets/icons'

const monsterModal = ref(false)
const heroModal = ref(false)
const fumbleMenu = ref(false)
</script>

<style scoped>
.fumble-menu-enter-active,
.fumble-menu-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.fumble-menu-enter-from,
.fumble-menu-leave-to {
  opacity: 0;
  transform: translate(-50%, 4px);
}
.fumble-menu-enter-to,
.fumble-menu-leave-from {
  transform: translate(-50%, 0);
}
</style>

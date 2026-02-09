<template>
  <main class="flex-1 overflow-auto pb-24">
    <div class="mx-auto max-w-xl">
      <h1 class="text-4xl text-center mt-6">{{ fumbleChart.header }}</h1>
      <div class="flex justify-center items-center h-40">
        <input
          v-model.number="inputValue"
          type="number"
          min="1"
          max="20"
          placeholder="1–20"
          class="w-32 h-20 text-4xl text-center rounded-lg border-2 border-gray-400 focus:border-gray-600 focus:outline-none bg-white text-gray-800"
          @input="onInput"
        />
      </div>
      <p class="grid content-center my-4 text-xl bg-slate-300 p-4 h-32 mb-2">
        <span v-if="fumbleResult">
          <h3 class="text-center font-semibold">Result for {{ inputValue }}:</h3>
          <p class="italic">{{ fumbleResult }}</p>
        </span>
        <span v-else>
          <h3 class="text-center font-semibold">Enter a number (1–20) to see the fumble result.</h3>
        </span>
      </p>
      <div class="grid grid-cols-2 gap-2 p-2">
        <NuxtLink :to="`/fumble-charts?type=${fumbleChart.type}`" class="btn-large primary text-center">
          Back to D20 Roll
        </NuxtLink>
        <button @click="switchChart" class="btn-large bg-slate-600 text-white">
          Switch to <OIcon size="small" :icon="fumbleChart.type === 'monster' ? iconPacman : iconGhost" class="inline-block align-middle" />
        </button>
      </div>
      <ul v-for="(description, index) in fumbleChart.descriptions" :key="index">
        <li class="text-sm py-1 px-4">— {{ description }}</li>
      </ul>
    </div>
  </main>
</template>
<script setup>
import fumbleChartMonster from '~/assets/fumble-chart-monster.json'
import fumbleChartPlayer from '~/assets/fumble-chart-player.json'
import { iconGhost, iconPacman } from '~/assets/icons'

const route = useRoute()
const fumbleChart = ref(route.query.type === 'monster' ? fumbleChartMonster : fumbleChartPlayer)
const inputValue = ref(null)
const fumbleResult = ref(null)

function onInput() {
  if (inputValue.value >= 1 && inputValue.value <= 20) {
    fumbleResult.value = fumbleChart.value.fumbles[inputValue.value - 1]
  } else {
    fumbleResult.value = null
  }
}

function switchChart() {
  fumbleChart.value = fumbleChart.value.type === "monster" ? fumbleChartPlayer : fumbleChartMonster
  inputValue.value = null
  fumbleResult.value = null
}
</script>

<template>
  <main class="flex-1 overflow-auto pb-24">
    <div class="mx-auto max-w-xl">
      <h1 class="text-4xl text-center mt-6">{{ fumbleChart.header }}</h1>
      <div class="w-48 m-auto my-10">
        <div class="grid gap-4">
          <span class="grid grid-rows-2 bg-slate-300 rounded-md p-5 text-center">
            <span class="uppercase text-xs font-semibold">Your Result</span>
            <span class="text-4xl leading-none font-bold">{{ roll }}</span>
          </span>
        </div>
      </div>
      <p class="grid content-center my-4 text-xl sm:rounded-md bg-slate-300 p-4 h-32 mb-10">
        <span v-if="showFumble">{{ fumbleChart.fumbles[roll-1] }}</span>
      </p>
      <ul v-for="(description, index) in fumbleChart.descriptions" :key="index">
        <li class="text-sm py-1 px-4">— {{ description }}</li>
      </ul>
    </div>
  </main>
  <footer class="bg-slate-800 p-2 grid grid-cols-2 gap-4 min-h-24">
    <button @click="rollDice" class="btn-large" :class="[isActive ? 'primary' : 'secondary' ]" :disabled="!isActive">
      Roll d20
    </button>
    <button @click="switchChart" class="btn-large bg-slate-600 text-white">
      Switch to {{ fumbleChart.type === "monster" ? "Heroes" : "Monsters" }}
    </button>
  </footer>
</template>
<script setup>
import fumbleChartMonster from '~/assets/fumble-chart-monster.json'
import fumbleChartPlayer from '~/assets/fumble-chart-player.json'
const roll = ref(666)
const showFumble = ref(false)
const isActive = ref(true)
const fumbleChart = ref(fumbleChartPlayer)
definePageMeta({
  layout: 'fumble-chart',
})

function switchChart() {
  fumbleChart.value = fumbleChart.value.type === "monster" ? fumbleChartPlayer : fumbleChartMonster
  roll.value = 666
}

function rollDice() {
  showFumble.value = false
  isActive.value = false
  const interval = setInterval(() => {
    roll.value = Math.floor(Math.random() * 20 + 1)
  }, 50)

  setTimeout(() => {
    clearInterval(interval)
    showFumble.value = true
    isActive.value = true
  }, 500)
}
</script>

<template>
  <div class="mx-4">
    <h1 class="text-4xl text-center mt-6">{{ fumbleChart.header }}</h1>
    <div class="w-48 m-auto my-10">
      <div class="grid grid-cols-2 gap-4">  
      <p class="grid grid-rows-2 border rounded-md p-2 text-center">
        <span class="uppercase text-xs font-semibold">Result</span>
        <span class="text-2xl leading-none font-bold">{{ roll }}</span>
      </p>
      <p>
        <button @click="rollDice" class="btn-large w-20 h-20" :class="[isActive ? 'primary' : 'secondary' ]" :disabled="!isActive">
          Roll d20
        </button>
      </p>
      <button @click="switchChart" class="btn bg-slate-600 text-white col-span-2">
        {{ fumbleChart.type === "monster" ? "Player" : "Monster" }} Chart
      </button>
      </div>
    </div>
    <p class="my-4 text-xl border-blood bg-slate-300 rounded-md p-4 h-32 mb-10">
      <span v-if="showFumble">{{ fumbleChart.fumbles[roll-1] }}</span>
    </p>
    <ul v-for="(description, index) in fumbleChart.descriptions" :key="index">
      <li class="text-sm py-1 px-4">— {{ description }}</li>
    </ul>
  </div>
</template>
<script setup>
import fumbleChartMonster from '~/assets/fumble-chart-monster.json'
import fumbleChartPlayer from '~/assets/fumble-chart-player.json'
const roll = ref(666)
const showFumble = ref(false)
const isActive = ref(true)
const fumbleChart = ref(fumbleChartPlayer)

function switchChart() {
  fumbleChart.value = fumbleChart.value.type === "monster" ? fumbleChartPlayer : fumbleChartMonster
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

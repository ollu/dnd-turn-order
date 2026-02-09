<template>
  <main class="flex-1 overflow-auto pb-24">
    <div class="mx-auto max-w-xl">
      <h1 class="text-4xl text-center mt-6">{{ fumbleChart.header }}</h1>
      <div id="dice-box" class="w-full h-40 relative"></div>
      <p class="grid content-center my-4 text-xl bg-slate-300 p-4 h-32 mb-2">
        <span v-if="showFumble">
          <h3 class="text-center font-semibold">{{ roll ? `You rolled a ${roll}!` : 'Roll the dice to see your fumble result.' }}</h3>
          <p class="italic">{{ fumbleChart.fumbles[roll-1] }}</p>
        </span>
      </p>
      <div class="grid grid-cols-2 gap-2 p-2">
        <button @click="rollDice" class="btn-large" :class="[isActive ? 'primary' : 'secondary' ]" :disabled="!isActive">
          Roll d20
        </button>
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

const roll = ref(null)
const showFumble = ref(false)
const isActive = ref(false)
const route = useRoute()
const fumbleChart = ref(route.query.type === 'monster' ? fumbleChartMonster : fumbleChartPlayer)

let diceBox = null

onMounted(async () => {
  const { default: DiceBox } = await import('@3d-dice/dice-box')
  diceBox = new DiceBox('#dice-box', {
    assetPath: '/assets/dice-box/',
    theme: 'default',
    themeColor: '#D01118',
    scale: 25,
  })
  await diceBox.init()
  diceBox.onRollComplete = (results) => {
    roll.value = results[0].value
    showFumble.value = true
    isActive.value = true
  }
  isActive.value = true
})

function switchChart() {
  fumbleChart.value = fumbleChart.value.type === "monster" ? fumbleChartPlayer : fumbleChartMonster
  roll.value = null
  showFumble.value = false
  if (diceBox) diceBox.clear()
}

function rollDice() {
  if (!diceBox) return
  showFumble.value = false
  isActive.value = false
  diceBox.clear()
  diceBox.roll('1d20')
}
</script>

<style>
#dice-box canvas {
  width: 100% !important;
  height: 100% !important;
}
</style>

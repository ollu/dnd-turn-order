<template>
  <div class="bg-red-900/50 rounded-t py-1 grid grid-cols-3 text-center text-white">
    <button @click="changeTurn(1)" class="text-xl">+</button>
    <span class="text-sm uppercase leading-7">Turn {{ store.turnCounter }}</span>
    <button @click="changeTurn(-1)" class="text-xl">-</button>
  </div>
</template>

<script>
import { useTurnOrderStore } from '~/stores/turnOrder'

export default {
  setup() {
    const store = useTurnOrderStore()
    return { store }
  },
  methods: {
    changeTurn(val) {
      const store = useTurnOrderStore()
      store.changeTurn(val)
    }
  }
}
</script>

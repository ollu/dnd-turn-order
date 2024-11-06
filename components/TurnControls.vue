<template>
  <button @click="incrementTurn">Next Turn</button>
</template>

<script>
import { useTurnOrderStore } from '~/stores/turnOrder'

export default {
  setup() {
    const store = useTurnOrderStore()
    return { store }
  },
  methods: {
    incrementTurn() {
      const store = useTurnOrderStore()
      store.incrementTurn()
    }
  }
}
</script>

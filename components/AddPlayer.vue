<template>
  <div class="flex gap-2">
    <div class="shrink w-full">
      <input v-model="name" type="text" name="email" id="name" class="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" placeholder="Player/monster" />
    </div>
    <div class="w-12 flex-none">
      <input v-model.number="initiative" type="text" placeholder="init" class="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" />
    </div>
    <div class="flex-none">
      <button @click="addPlayer" type="button" class="rounded-md bg-green-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700/50">Add</button>
    </div>
  </div>
</template>

<script>
import { useTurnOrderStore } from '~/stores/turnOrder'

export default {
  data() {
    return {
      name: '',
      initiative: '',
    }
  },
  methods: {
    addPlayer() {
      const store = useTurnOrderStore()
      store.addPlayer({ name: this.name.toLowerCase(), initiative: this.initiative })
      this.name = ''
      this.initiative = 0
    }
  }
}
</script>

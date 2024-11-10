<template>
<nav class="bg-gray-800">
  <div class="mx-auto max-w-4xl px-4">
    <div class="flex h-16 items-center justify-between">
      <div class="flex">
        <div class="shrink-0">
          <span href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="../assets/dragon.png" class="w-12 h-12" alt="">
            <h1 class="text-xl text-blood font-semibold text-center ml-4 capitalize">Cavemen turn order</h1>
          </span>
        </div>
        <div class="hidden md:ml-4 md:flex flex-row">
          <NavigationItems />
        </div>
      </div>
      <div class="-mr-2 flex md:hidden">
        <!-- Mobile menu button -->
        <button @click="toggleMenu" type="button" class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
          <span class="absolute -inset-0.5"></span>
          <span class="sr-only">Mellon</span>
          <!--
            Icon when menu is closed.

            Menu open: "hidden", Menu closed: "block"
          -->
          <svg class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          <!--
            Icon when menu is open.

            Menu open: "block", Menu closed: "hidden"
          -->
          <svg class="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </div>

  <!-- Mobile menu, show/hide based on menu state. -->
  <div :class="{'hidden': !isMenuOpen, 'flex justify-start flex-col': isMenuOpen}" class="md:hidden ml-2 mb-2 md:mb-0" id="mobile-menu">
    <NavigationItems @toggleMenu="toggleMenu"/>
  </div>
</nav>
</template>
<script setup>
const isMenuOpen = ref(false)

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

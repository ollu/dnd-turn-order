<template>
<nav class="bg-gray-800">
  <div class="mx-auto max-w-3xl px-4">
    <div class="flex h-16 justify-end items-center flex-row-reverse">
      <div class="flex">
        <div class="shrink-0">
          <span href="#" class="flex items-center rtl:space-x-reverse relative">
            <img src="../assets/breath.svg" :class="[isMenuOpen ? 'w-10 h-10 absolute top-4 -left-8 animate-grow-right-to-left delay-500' : 'hidden' ]">
            <img src="../assets/dragon.png" class="w-12 h-12 duration-75" :class="{ '-scale-x-100 duration-75 rotate-45': isMenuOpen }">
            <img src="../assets/logo-text.png" class="w-48 h-full ml-4">
            <!--h1 class="text-xl text-blood font-semibold text-center ml-4 capitalize">Cavemen turn order</h1-->
          </span>
        </div>
        <div class="hidden md:ml-4 md:flex flex-row">
          <NavigationItems />
        </div>
      </div>
      <div class="flex md:hidden mr-4">
        <!-- Mobile menu button -->
        <button @click="toggleMenu" value="hamburger" class="flex flex-col justify-around h-8 w-8 p-1 rounded">
          <!-- Hamburger Icon (3 lines) -->
          <span 
          :class="{ 'translate-y-3 -rotate-45': isMenuOpen }"
          class="h-0.5 rounded duration-100 bg-gray-400 w-full"></span>
          <span 
          :class="{ 'opacity-0': isMenuOpen }"
          class="h-0.5 rounded duration-100 bg-gray-400 w-full"></span>
          <span 
          :class="{ '-translate-y-1 rotate-45': isMenuOpen }"
          class="h-0.5 rounded duration-100 bg-gray-400 w-full"></span>
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
<style scoped>
@keyframes grow {
  0% {
    transform: scale(0);
    transform-origin: right;
  }
  100% {
    transform: scale(1);
    transform-origin: right;
  }
}
</style>

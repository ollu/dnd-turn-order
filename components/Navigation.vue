<template>
<nav class="bg-gray-800 flex flex-col md:justify-center">
  <div class="mx-auto max-w-3xl px-4">
    <div class="flex h-16 justify-end items-center flex-row-reverse">
      <div class="flex">
        <div class="shrink-0">
          <span href="#" class="flex items-center rtl:space-x-reverse relative">
            <img src="../assets/breath.svg" :class="[isMenuOpen ? 'w-10 h-10 absolute top-4 -left-8 animate-grow z-0' : 'hidden' ]">
            <img src="../assets/dragon.png" class="w-12 h-12 duration-75" :class="{ '-scale-x-100 duration-75 rotate-45': isMenuOpen }">
            <NuxtLink to="/" @click="toggleMenu()"><img src="../assets/logo-text.png" class="w-48 h-full ml-4"></NuxtLink>
          </span>
        </div>
      </div>
      <div class="mr-4 z-10">
        <!-- Mobile menu button -->
        <button @click="toggleMenu()" class="flex flex-col justify-around h-8 w-8 p-1 rounded">
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
  <div 
    :class="{'hidden': !isMenuOpen, 'flex flex-col': isMenuOpen}" 
    class="ml-2 mb-2 md:mb-0" 
    id="mobile-menu">
    <NavigationItems @toggleMenu="toggleMenu()" />
  </div>
</nav>
</template>
<script setup>
const isMenuOpen = ref(false)

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value

  if (isMenuOpen.value) {
    setTimeout(() => {
      isMenuOpen.value = false
    }, 10000)
  }
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

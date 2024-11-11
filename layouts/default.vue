<template>
  <div class="flex flex-col h-screen">
    <Navigation />
    <main class="flex-1 overflow-auto pb-24">
      <slot />
    </main>
  </div>
  <OFooter />
</template>

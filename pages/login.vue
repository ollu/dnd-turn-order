<template>
  <main>
    <section class="container mx-auto flex flex-wrap items-center justify-center px-5 py-24 text-gray-400">
      <FormLogin v-if="isLogin" @switchToRegister="switchLogin" />
      <FormRegister v-if="!isLogin" @switchToLogin="switchLogin" />
    </section>
  </main>
</template>

<script setup>
definePageMeta({
  layout: 'no-access'
})

const isLogin = ref(true)

function switchLogin() {
  isLogin.value = !isLogin.value
}
</script>

<template>
  <form @submit.prevent="userRegister" class="mt-10 flex w-full flex-col rounded-lg bg-gray-800 p-8 md:mt-0 md:w-1/2 lg:w-2/6">
    <h2 class="mb-5 text-4xl text-center uppercase font-medium text-gray-50">Register</h2>
    <div class="relative mb-4">
      <label for="email" class="text-sm leading-7 text-gray-400">Email</label>
      <input
        v-model="email"
        type="email"
        id="email"
        name="email"
        class="bg-opacity-20 w-full rounded border border-gray-600 bg-transparent py-1 px-3 text-base leading-8 text-gray-100 outline-none transition-colors duration-200 ease-in-out focus:border-[#42d392] focus:bg-transparent focus:ring-2 focus:ring-transparent"
        required
      />
    </div>
    <div class="relative mb-4">
      <label for="password" class="text-sm leading-7 text-gray-400">Password</label>
      <input
        v-model="password"
        type="password"
        id="password"
        name="password"
        class="bg-opacity-20 w-full rounded border border-gray-600 bg-transparent py-1 px-3 text-base leading-8 text-gray-100 outline-none transition-colors duration-200 ease-in-out focus:border-[#42d392] focus:bg-transparent focus:ring-2 focus:ring-transparent"
        required
      />
    </div>
    <div class="relative mb-4">
      <label for="confirmPassword" class="text-sm leading-7 text-gray-400">Confirm password</label>
      <input
        v-model="confirmPassword"
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        class="bg-opacity-20 w-full rounded border border-gray-600 bg-transparent py-1 px-3 text-base leading-8 text-gray-100 outline-none transition-colors duration-200 ease-in-out focus:border-[#42d392] focus:bg-transparent focus:ring-2 focus:ring-transparent"
        required
      />
    </div>
    <button type="submit" class="btn primary">Register</button>
    <span
      class="bg-opacity-50 absolute right-8 top-8 rounded-lg bg-[#242424] p-8 px-4 py-2 text-red-500"
      v-if="errorMsg"
      >{{ errorMsg }}</span
    >
    <p class="mt-3 text-xs">Do you have an account?</p>
    <a @click.prevent="$emit('switchToLogin')" class="w-fit text-sm text-white hover:text-blood cursor-pointer">Login</a>
  </form>
</template>

<script setup>
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMsg = ref('')
const client = useSupabaseClient()

const userRegister = async () => {
  if (password.value !== confirmPassword.value) {
    errorMsg.value = 'Passwords do not match!'
    password.value = ''
    confirmPassword.value = ''
    setTimeout(() => {
      errorMsg.value = ''
    }, 3000)
    return
  }

  try {
    const { error } = await client.auth.signUp({
      email: email.value,
      password: password.value,
      emailRedirectTo: 'http://localhost:3000/login',
    })
    email.value = ''
    password.value = ''
    confirmPassword.value = ''

    if (error) throw error
  } catch (error) {
    errorMsg.value = error.message
    setTimeout(() => {
      errorMsg.value = ''
    }, 3000)
  }
}
</script>

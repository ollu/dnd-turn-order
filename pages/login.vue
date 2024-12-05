<template>
  <main>
    <section
      class="container mx-auto flex flex-wrap items-center justify-center px-5 py-24 text-gray-400"
    >
      <form
        @submit.prevent="userLogin"
        class="mt-10 flex w-full flex-col rounded-lg bg-gray-800 p-8 md:mt-0 md:w-1/2 lg:w-2/6"
      >
        <h2 class="mb-5 text-4xl text-center uppercase font-medium text-gray-50">Login</h2>
        <div class="relative mb-4">
          <label for="full-name" class="text-sm leading-7 text-gray-400">Email</label>
          <input
            v-model="email"
            type="email"
            id="email"
            name="email"
            class="bg-opacity-20 w-full rounded border border-gray-600 bg-transparent py-1 px-3 text-base leading-8 text-gray-100 outline-none transition-colors duration-200 ease-in-out focus:border-[#42b883] focus:bg-transparent focus:ring-2 focus:ring-transparent"
            required
          />
        </div>

        <div class="relative mb-4">
          <label for="password" class="text-sm leading-7 text-gray-400">Password</label>
          <input
            id="password"
            v-model="password"
            name="password"
            type="password"
            class="bg-opacity-20 w-full rounded border border-gray-600 bg-transparent py-1 px-3 text-base leading-8 text-gray-100 outline-none transition-colors duration-200 ease-in-out focus:border-[#42b883] focus:bg-transparent focus:ring-2 focus:ring-transparent"
            required
          />
        </div>

        <button class="btn primary">Mellon</button>

        <span
          class="bg-opacity-50 absolute right-8 top-8 rounded-lg bg-[#242424] p-8 px-4 py-2 text-red-500"
          v-if="errorMsg"
          >{{ errorMsg }}</span
        >

        <p class="mt-3 text-xs">No account yet?</p>
        <nuxt-link class="w-fit text-sm text-white hover:text-blood" to="/register"
          >Register</nuxt-link
        >
      </form>
    </section>
  </main>
</template>
<script setup>
definePageMeta({
  layout: 'no-access',
})
  const user = useSupabaseUser();
  const email = ref('');
  const password = ref('');
  const errorMsg = ref('');
  const client = useSupabaseClient();

  const userLogin = async () => {
    try {
      const { error } = await client.auth.signInWithPassword({
        email: email.value,
        password: password.value,
      });

      email.value = '';
      password.value = '';

      if (error) throw error;
    } catch (error) {
      errorMsg.value = error.message;
      setTimeout(() => {
        errorMsg.value = '';
      }, 3000);
    }
  };

  watchEffect(() => {
    if (user.value) {
      return navigateTo('/');
    }
  });
</script>

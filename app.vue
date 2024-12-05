<template>
  <VitePwaManifest />
  <NuxtLayout />
</template>
<script setup>
const { auth } = useSupabaseClient();
const user = useSupabaseUser();

watchEffect(() => {
  if (!user.value) {
    return navigateTo('/login');
  }
});

definePageMeta({
  middleware: 'auth',
});
</script>

export default defineNuxtRouteMiddleware((to, from) => {
  const publicPaths = ["/register"];

  if (publicPaths.includes(to.path)) {
    return;
  }
  
  const user = useSupabaseUser();

  if (!user.value) {
    return navigateTo("/login");
  }
});

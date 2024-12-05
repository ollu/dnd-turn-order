export default defineNuxtRouteMiddleware((to, from) => {
  const publicPaths = ["/register"];
console.log(to.path);

  if (publicPaths.includes(to.path)) {
    return;
  }
  
  const user = useSupabaseUser();

  if (!user.value) {
    return navigateTo("/login");
  }
});

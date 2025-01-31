export default defineNuxtRouteMiddleware((to, from) => {
    const user = useSupabaseUser();
    if(user.value) {
        return ;
    }else {
        if(to.name != 'login')
        return navigateTo('/login');
    }
})

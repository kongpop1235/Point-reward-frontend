export default defineNuxtRouteMiddleware((to, from) => {
    const token = useCookie('auth_token').value

    if (!token && to.path !== '/login') {
        return navigateTo('/login')
    }

    if (token && to.path === '/login') {
        return navigateTo('/dashboard')
    }
})

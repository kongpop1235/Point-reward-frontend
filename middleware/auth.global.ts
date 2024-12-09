import { useProfileStore } from '@/store/profile'
import { useCookie } from '#app'
import { useAdvertisedProductsStore } from '@/store/advertisedProducts'

export default defineNuxtRouteMiddleware(async (to, from) => {
    const token = useCookie('auth_token').value

    if (!token && to.path !== '/login') {
        return navigateTo('/login')
    }

    if (token && to.path === '/login') {
        return navigateTo('/home')
    }

    if (token) {
        const profileStore = useProfileStore()
        if (!profileStore.profile) {
            try {
                await profileStore.fetchProfile()
            } catch (error) {
                console.error('Failed to fetch profile:', error)
                useCookie('auth_token').value = null
                return navigateTo('/login')
            }
        }

        const advertisedProductsStore = useAdvertisedProductsStore()
        if (!advertisedProductsStore.products.length) {
            try {
                await advertisedProductsStore.fetchAdvertisedProducts()
            } catch (error) {
                console.error('Failed to fetch advertised products:', error)
            }
        }
    }
})

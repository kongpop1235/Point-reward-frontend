<template>
  <div class="flex items-center justify-center h-screen">
    <div class="text-center">
      <h1 class="text-2xl font-bold mb-4 text-white">{{ $t('auth.welcome') }}, {{ profile?.name }}</h1>

      <div class="mb-4">
        <p><strong>{{ $t('profile.username') }} :</strong> {{ profile?.username }}</p>
        <p><strong>{{ $t('profile.points') }} :</strong> {{ profile?.points }}</p>
        <p><strong>{{ $t('profile.role') }} :</strong> {{ profile?.role }}</p>
      </div>

      <div v-if="profile?.redeemedItems?.length" class="mb-4">
        <h2 class="text-xl font-bold mb-2">{{ $t('profile.redeemedItems') }}</h2>
        <ul>
          <li v-for="item in profile?.redeemedItems" :key="item._id" class="mb-2">
            {{ item.title }} - {{ item.quantity }} pcs
          </li>
        </ul>
      </div>

      <button
        @click="handleLogout"
        class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        {{ $t('auth.logout') }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCookie } from '#app'
import { useProfileStore } from '@/store/profile'

// Pinia Store
const profileStore = useProfileStore()
const profile = profileStore.profile

const router = useRouter()

// Save user profile when in home page
onMounted(async () => {
  const token = useCookie('auth_token').value
  if (token && !profileStore.profile) {
    try {
      await profileStore.fetchProfile()
    } catch (error) {
      console.error('Error fetching profile:', error)
      useCookie('auth_token').value = null
      router.push('/login')
    }
  }
})

// Logout
const handleLogout = () => {
  const tokenCookie = useCookie('auth_token')
  tokenCookie.value = null
  profileStore.clearProfile()
  router.push('/login')
}
</script>

<style scoped>
</style>

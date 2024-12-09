<template>
  <div>
    <NuxtPage class="mb-[80px]"/>
    <BottomNavbar />
  </div>
</template>

<script setup>
import { useProfileStore } from '@/store/profile'
import { useCookie } from '#app'
import BottomNavbar from '@/components/BottomNavbar.vue'

const token = useCookie('auth_token').value

if (token) {
  const profileStore = useProfileStore()
  profileStore.fetchProfile().catch(() => {
    console.error('Failed to fetch profile at app startup')
    useCookie('auth_token').value = null
  })
}
</script>

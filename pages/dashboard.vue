<script setup>
import { useCookie } from '#app'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleLogout = () => {
  const tokenCookie = useCookie('auth_token')
  tokenCookie.value = null
  router.push('/login')
}
</script>

<template>
  <div class="flex items-center justify-center h-screen">
    <div class="text-center">
      <h1 class="text-2xl font-bold mb-4">{{ $t('auth.welcome') }}</h1>
      <button
        @click="handleLogout"
        class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  </div>
</template>

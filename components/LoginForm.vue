<template>
  <div>
    <form @submit.prevent="handleLogin">
      <div class="mb-4 relative">
        <label class="block text-gray-300 mb-2" for="username">{{ $t('forms.username') }}</label>
        <input
          v-model="loginUsername"
          type="text"
          id="username"
          class="w-full border rounded p-2 bg-darkGray text-white"
          required
        />
      </div>
      <div class="mb-4 relative">
        <label class="block text-gray-300 mb-2" for="password">{{ $t('forms.password') }}</label>
        <div class="relative">
          <input
            v-model="loginPassword"
            :type="isPasswordVisible ? 'text' : 'password'"
            id="password"
            class="w-full border rounded p-2 bg-darkGray text-white"
            required
          />
          <div 
            class="absolute top-2 right-3 w-6 h-6 cursor-pointer"
            @click="togglePasswordVisibility"
          >
            <eyeIcon 
              v-if="isPasswordVisible" 
              class="w-6 h-6 transition-all duration-300 text-white group-hover:translate-y-[-10px]"
            />
            <eyeOffIcon 
              v-else 
              class="w-6 h-6 transition-all duration-300 text-white group-hover:translate-y-[-10px]"
            />
          </div>
        </div>
      </div>
      <div class="w-full text-center">
        <button
          type="submit"
          class="w-1/3 text-white py-2 rounded-md bg-primary hover:bg-red-700"
        >
          {{ $t('buttons.login') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCookie } from '#app'
import homeIcon from '@/assets/icon/home.svg'
import eyeIcon from '@/assets/icon/eye.svg'
import eyeOffIcon from '@/assets/icon/eye-off.svg'

// State for login
const loginUsername = ref('')
const loginPassword = ref('')
const router = useRouter()

// State For managing showing/hiding passwords
const isPasswordVisible = ref(false)

// Toggle function for displaying passwords
const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value
}

// Login management function
const handleLogin = async () => {
  
  try {
    const response = await $fetch('/users/login', {
      baseURL: useRuntimeConfig().public.apiBase,
      method: 'POST',
      body: { username: loginUsername.value, password: loginPassword.value },
    })
    if (response.token) {
      
      const tokenCookie = useCookie('auth_token')
      tokenCookie.value = response.token
      router.push('/home')
    }
  } catch (error) {
    console.error('Error:', error)
    alert(error?.data?.message || 'Invalid username or password')
  }
}
</script>

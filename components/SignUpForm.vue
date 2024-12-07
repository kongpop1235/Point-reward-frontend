<template>
  <div>
    <form @submit.prevent="handleSignUp">
      <div class="mb-4">
        <label class="block mb-2" for="signup-username">{{ $t('forms.username') }}</label>
        <input
          v-model="signupUsername"
          type="text"
          id="signup-username"
          class="w-full border rounded-md p-2 bg-darkGray text-white"
          required
        />
      </div>
      <div class="mb-4 relative">
        <label class="block mb-2" for="signup-password">{{ $t('forms.password') }}</label>
        <div class="relative">
          <input
            v-model="signupPassword"
            :type="isPasswordVisible ? 'text' : 'password'"
            id="signup-password"
            class="w-full border rounded-md p-2 bg-darkGray text-white"
            required
          />
          <!-- Icon Show/hide password -->
          <img
            :src="isPasswordVisible ? eyeIcon : eyeOffIcon"
            alt="toggle password visibility"
            class="absolute top-2 right-3 w-6 h-6 cursor-pointer"
            @click="togglePasswordVisibility"
          />
        </div>
      </div>
      <div class="mb-4">
        <label class="block mb-2" for="signup-name">{{ $t('forms.name') }}</label>
        <input
          v-model="signupName"
          type="text"
          id="signup-name"
          class="w-full border rounded-md p-2 bg-darkGray text-white"
          required
        />
      </div>
      <div class="w-full text-center">
        <button
          type="submit"
          class="w-1/3 text-white py-2 rounded-md bg-primary hover:bg-red-700"
        >
          {{ $t('buttons.signup') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCookie } from '#app'

// State for form data
const signupUsername = ref('')
const signupPassword = ref('')
const signupName = ref('')
const router = useRouter()

// State For showing/hiding password
const isPasswordVisible = ref(false)
import eyeIcon from '@/assets/icon/eye.svg'
import eyeOffIcon from '@/assets/icon/eye-off.svg'

// Toggle function for displaying passwords
const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value
}

const handleSignUp = async () => {
  try {
    const response = await $fetch('/users/register', {
      baseURL: useRuntimeConfig().public.apiBase,
      method: 'POST',
      body: {
        username: signupUsername.value,
        password: signupPassword.value,
        name: signupName.value,
      },
    })
    if (response.token) {
      alert('Registration successful! Please login.')
      signupUsername.value = ''
      signupPassword.value = ''
      signupName.value = ''
      const tokenCookie = useCookie('auth_token')
      tokenCookie.value = response.token
      router.push('/dashboard')
    }
  } catch (error) {
    alert(error?.data?.message || 'Registration failed')
  }
}
</script>

<template>
  <div>
    <form @submit.prevent="handleSignUp">
      <!-- Username Input -->
      <div class="mb-4 relative">
        <label class="block mb-2" for="signup-username">{{ $t('forms.username') }}</label>
        <div class="relative">
          <input
            v-model="signupUsername"
            type="text"
            id="signup-username"
            class="w-full border rounded-md p-2 bg-darkGray text-white"
            maxlength="20"
            required
            @input="validateUsername"
          />
          <div class="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-sm">
            {{ signupUsername.length }}/20
          </div>
        </div>
      </div>

      <!-- Password Input -->
      <div class="mb-4 relative">
        <label class="block mb-2" for="signup-password">{{ $t('forms.password') }}</label>
        <div class="relative">
          <input
            v-model="signupPassword"
            :type="isPasswordVisible ? 'text' : 'password'"
            id="signup-password"
            class="w-full border rounded-md p-2 bg-darkGray text-white"
            maxlength="20"
            required
            @input="validatePassword"
          />
          <div 
            class="absolute top-2 right-3 w-6 h-6 cursor-pointer"
            @click="togglePasswordVisibility"
          >
            <eyeIcon v-if="isPasswordVisible" class="w-6 h-6 text-white" />
            <eyeOffIcon v-else class="w-6 h-6 text-white" />
          </div>
          <div class="absolute right-11 top-1/2 transform -translate-y-1/2 text-white text-sm">
            {{ signupPassword.length }}/20
          </div>
        </div>
      </div>

      <!-- Name Input -->
      <div class="mb-4 relative">
        <label class="block mb-2" for="signup-name">{{ $t('forms.name') }}</label>
        <div class="relative">
          <input
            v-model="signupName"
            type="text"
            id="signup-name"
            class="w-full border rounded-md p-2 bg-darkGray text-white"
            maxlength="50"
            required
            @input="validateName"
          />
          <div class="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-sm">
            {{ signupName.length }}/50
          </div>
        </div>
      </div>

      <!-- Submit Button -->
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

const isPasswordVisible = ref(false)
import eyeIcon from '@/assets/icon/eye.svg'
import eyeOffIcon from '@/assets/icon/eye-off.svg'

// Toggle password visibility
const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value
}

const validateUsername = () => {
  signupUsername.value = signupUsername.value.replace(/[^a-zA-Z0-9_.]/g, '')
  if (signupUsername.value.length > 20) {
    signupUsername.value = signupUsername.value.slice(0, 20)
  }
}

const validatePassword = () => {
  if (signupPassword.value.length > 20) {
    signupPassword.value = signupPassword.value.slice(0, 20)
  }
}

const validateName = () => {
  signupName.value = signupName.value.replace(/[^a-zA-Zก-๙\s]/g, '')
  if (signupName.value.length > 50) {
    signupName.value = signupName.value.slice(0, 50)
  }
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
      router.push('/home')
    }
  } catch (error) {
    alert(error?.data?.message || 'Registration failed')
  }
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-darkerGray">
    <!-- Container -->
    <div 
      class="relative w-full max-w-sm md:max-w-4xl bg-darkGray py-6 md:p-8 rounded-md overflow-hidden flex flex-col md:flex-row"
      :class="isMobile ? 'h-auto' : 'h-[450px]'"
    >
      <div 
        v-if="!isMobile"
        class="absolute top-0 left-0 w-1/2 h-full bg-zinc-700 flex items-center justify-center z-10 transition-transform duration-500"
        :class="{
          'translate-x-full': isOverlayOnSignUp,
          'translate-x-0': !isOverlayOnSignUp
        }"
      >
        <div class="text-center">
          <h1 class="text-3xl font-bold mb-5">
            {{ isOverlayOnSignUp ? $t('forms.signup_text') : $t('forms.login_text') }}
          </h1>
          <button 
            @click="toggleOverlay"
            class="px-6 py-2 text-white rounded-md bg-primary hover:bg-red-700 transition-colors duration-300"
          >
            {{ isOverlayOnSignUp ? $t('auth.signup') : $t('auth.login') }}
          </button>
        </div>
      </div>

      <!-- Toggle button for mobile screen -->
      <div 
        v-if="isMobile"
        class="flex justify-center px-6 mb-6"
      >
        <button
          @click="showLogin"
          :class="{
            'bg-primary text-white': isLogin,
            'bg-gray-600 text-gray-300': !isLogin
          }"
          class="px-4 py-2 rounded-l-md transition-colors duration-300 w-1/2"
        >
          {{ $t('auth.login') }}
        </button>
        <button
          @click="showSignUp"
          :class="{
            'bg-primary text-white': !isLogin,
            'bg-gray-600 text-gray-300': isLogin
          }"
          class="px-4 py-2 rounded-r-md transition-colors duration-300 w-1/2"
        >
          {{ $t('auth.signup') }}
        </button>
      </div>

      <div 
        class="w-full flex transition-transform duration-500 md:transition-none md:flex-row min-h-[calc(100%)]"
        :class="{
          'translate-x-0': isLogin || !isMobile,
          '-translate-x-2/4': !isLogin && isMobile
        }"
        style="width: 200%;"
      >
        <!-- Login -->
        <div class="w-full md:w-1/2 max-md:px-6 md:pr-8 overflow-auto">
          <h1 v-if="!isMobile" class="text-2xl font-bold text-center mb-6">{{ $t('auth.login') }}</h1>
          <LoginForm />
        </div>

        <!-- Sign Up -->
        <div class="w-full md:w-1/2 max-md:px-6 md:pl-8 overflow-auto">
          <h1 v-if="!isMobile" class="text-2xl font-bold text-center mb-6">{{ $t('auth.signup') }}</h1>
          <SignUpForm />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import LoginForm from '@/components/LoginForm.vue'
import SignUpForm from '@/components/SignUpForm.vue'

// State For checking screen size
const isMobile = ref(false)
const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768
}

// Check the screen size when first loading. And when there is change
onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})
onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})

// State for display
const isLogin = ref(true) // status for Mobile
const isOverlayOnSignUp = ref(true) // status for Desktop

// Page swap function for Mobile
const showLogin = () => {
  isLogin.value = true
}
const showSignUp = () => {
  isLogin.value = false
}

const toggleOverlay = () => {
  isOverlayOnSignUp.value = !isOverlayOnSignUp.value
}
</script>

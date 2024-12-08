import { defineStore } from 'pinia'

export const useProfileStore = defineStore('profile', {
  state: () => ({
    profile: null,
  }),

  actions: {
    async fetchProfile() {
      try {
        const response = await $fetch('/users/profile', {
          baseURL: useRuntimeConfig().public.apiBase,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${useCookie('auth_token').value}`
          }
        })
        this.profile = response
      } catch (error) {
        console.error('Error fetching profile:', error)
        throw error
      }
    },

    setProfile(data) {
      this.profile = data
    },

    clearProfile() {
      this.profile = null
    }
  },

  getters: {
    getFullName: (state) => state.profile ? `${state.profile.name}` : '',
    isAuthenticated: (state) => !!state.profile // If you have a profile, it means you're already logged in.
  }
})

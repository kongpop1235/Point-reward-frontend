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
        useCookie('auth_token').value = null
        throw error
      }
    },

    setProfile(data) {
      this.profile = data
    },

    clearProfile() {
      this.profile = null
    },

    setPoints(points) {
      if (this.profile) {
        this.profile.points = points
      }
    }
  },

  getters: {
    getFullName: (state) => state.profile ? `${state.profile.name}` : '',
    getPoints: (state) => state.profile ? state.profile.points : 0,
    isAuthenticated: (state) => !!state.profile
  }
})

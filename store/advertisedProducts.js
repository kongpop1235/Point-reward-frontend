import { defineStore } from 'pinia'

export const useAdvertisedProductsStore = defineStore('advertisedProducts', {
  state: () => ({
    products: []
  }),

  actions: {
    async fetchAdvertisedProducts() {
      try {
        const response = await $fetch('/advertised-products', {
          baseURL: useRuntimeConfig().public.apiBase,
          method: 'GET'
        })
        this.products = response
      } catch (error) {
        console.error('Error fetching advertised products:', error)
        throw error
      }
    },

    setProducts(data) {
      this.products = data
    },

    clearProducts() {
      this.products = []
    }
  },

  getters: {
    getAllProducts: (state) => state.products
  }
})

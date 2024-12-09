import { defineStore } from 'pinia'

export const useProductsStore = defineStore('Products', {
  state: () => ({
    products: []
  }),

  actions: {
    async fetchProducts() {
      try {
        const response = await $fetch('/products', {
          baseURL: useRuntimeConfig().public.apiBase,
          method: 'GET'
        })
        this.products = response
      } catch (error) {
        console.error('Error fetching  products:', error)
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

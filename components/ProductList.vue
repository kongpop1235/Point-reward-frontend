<template>
  <div class="w-full">
    <!-- button Toggle View -->
    <div
      class="flex items-center mb-5"
      :class="route.path !== '/home' ? 'justify-between' : 'justify-end'"
    >
      <div 
        v-if="route.path !== '/home'" 
        class="flex items-center justify-between p-5 rounded-xl h-[50px] bg-darkGray"
      >
        <div class="flex items-center">
          <PointIcon class="h-8 w-8"/>
          <p>{{ points }}</p>
        </div>
      </div>

      <!-- Search Bar -->
      <div 
        v-if="route.path === '/reward'" 
        class="flex-1 px-5"
      >
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Search for a product..." 
          class="w-full h-[50px] rounded-lg bg-darkGray px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <!-- View Mode Toggle -->
      <div class="relative flex bg-darkGray rounded-lg w-[100px] h-[50px] items-center">
        <!-- Background -->
        <div
          class="absolute bg-primary w-[40px] h-[40px] rounded-lg transition-all duration-300 top-1/2 -translate-y-1/2" 
          :class="viewMode === 'grid' ? 'left-[7px]' : 'left-[calc(100%-45px)]'"
        ></div>

        <!-- Grid View Button -->
        <button 
          @click="setGridView"
          class="w-1/2 flex justify-center items-center relative z-10 text-white"
        >
          <GridIcon class="w-6 h-6"/>
        </button>

        <!-- List View Button -->
        <button 
          @click="setListView"
          class="w-1/2 flex justify-center items-center relative z-10 text-white"
        >
          <ListIcon class="w-6 h-6"/>
        </button>
      </div>
    </div>

    <!-- Product List -->
    <div 
      :class="viewMode === 'grid' ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5' : 'flex flex-col space-y-5'"
    >
      <div 
        v-for="product in filteredProducts" 
        :key="product._id" 
        class="product-card p-5 bg-darkGray rounded-md shadow-md relative overflow-hidden"
        :class="viewMode === 'list' ? 'flex flex-row items-center justify-between gap-4' : 'flex flex-col items-center'"
        @click="openProductDetail(product.id)"
      >
        <!-- Product Image -->
        <img 
          :src="product.imageUrl" 
          :alt="product.title" 
          class="object-contain md:object-cover rounded-md flex-shrink-0"
          :class="viewMode === 'grid' ? 'w-60 h-60 max-sm:scale-150' : 'w-24 h-24 md:w-40 md:h-40'"
        />

        <!-- Product Details -->
        <div 
          class="flex-1 text-left gap-y-3 h-full w-full flex flex-col"
          :class="viewMode === 'grid' ? 'p-5' : 'lg:ml-10'"
        >
          <h3 class="text-sm md:text-xl font-semibold">{{ product.title }}</h3>
          <p class="max-md:hidden text-gray-500 mb-5">{{ product.description }}</p>
          <p class="max-md:text-xs font-semibold text-primary mt-auto">
            {{ product.pointsRequired }} Points
          </p>
        </div>

        <!-- Hover Effect -->
        <div 
          class="max-md:hidden absolute cursor-pointer bottom-[-100%] left-0 w-full h-full bg-red-600 flex items-center justify-center transition-all duration-300 product-overlay"
        >
          <p class="text-white text-3xl font-semibold tracking-widest uppercase">Detail</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useProductsStore } from '@/store/products'
import { useProfileStore } from '@/store/profile'
import GridIcon from '@/assets/icon/grid.svg'
import ListIcon from '@/assets/icon/list.svg'
import PointIcon from '@/assets/icon/point-coin.svg'

const route = useRoute()

const productsStore = useProductsStore()
const products = productsStore.getAllProducts

const profileStore = useProfileStore()
const points = computed(() => profileStore.profile?.points ?? 0)

const viewMode = ref('grid')
const searchQuery = ref('')
const selectedProductId = ref(null)

// Filtered products based on search query
const filteredProducts = computed(() => {
  if (!searchQuery.value) return products
  return products.filter(product => 
    product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const setGridView = () => {
  viewMode.value = 'grid'
}

const setListView = () => {
  viewMode.value = 'list'
}

const openProductDetail = (productId) => {
  selectedProductId.value = productId
}

const closeProductDetail = () => {
  selectedProductId.value = null
}
</script>

<style scoped>
.product-card:hover .product-overlay {
  bottom: 0;
}

input::placeholder {
  color: #A0A0A0; 
}

.fade-enter-from, 
.fade-leave-to {
  opacity: 0;
}

input[type="text"] {
  transition: border-color 0.2s ease-in-out;
}
</style>

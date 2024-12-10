<template>
  <div class="my-5 mx-5 md:mx-16 2xl:mx-80">
    <!-- Profile Info Section -->
    <div class="flex items-center justify-between p-5 rounded-xl bg-darkGray">
      <div class="flex items-center gap-x-2">
        <UserCircleIcon class="h-8 w-8"/>
        <p>{{ profile?.name }}</p>
      </div>
      <div class="flex items-center gap-x-2">
        <PointIcon class="h-8 w-8"/>
        <p>{{ profile?.points }}</p>
      </div>
    </div>

    <!-- Redeemed Products Section -->
    <div>
      <div class="flex items-center justify-between my-5">
        <h2 class="text-xl font-bold">Redeemed Products</h2>
        <LogoutIcon
          class="h-8 w-8 cursor-pointer text-red-600 hover:text-gray-600 transition-all duration-300"
          @click="handleLogout"
        />
      </div>
      <div v-if="redeemedProducts.length" class="space-y-4">
        <div 
          v-for="(product, index) in redeemedProducts" 
          :key="index" 
          class="p-5 bg-darkGray rounded-md shadow-md flex flex-col md:flex-row items-center"
        >
          <img 
            :src="product.imageUrl" 
            alt="Product Image" 
            class="w-24 h-24 object-cover rounded-md mb-4 md:mb-0 md:mr-4"
          />
          <div class="flex-1">
            <h3 class="text-lg font-bold">{{ product.title }}</h3>
            <p class="text-gray-400 text-sm mb-2">{{ product.description }}</p>
            <p class="text-gray-500 text-xs">Expiry Date : {{ formatExpiryDate(product.expiryDate) }}</p>
          </div>
        </div>
      </div>

      <div v-else class="text-center text-gray-400">
        No Redeemed Products
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useProfileStore } from '@/store/profile'
import { useProductsStore } from '@/store/products'
import { useCookie } from '#app'
import { useRouter } from 'vue-router'
const router = useRouter()

// Import Icon
import UserCircleIcon from '@/assets/icon/user-circle.svg'
import PointIcon from '@/assets/icon/point-coin.svg'
import LogoutIcon from '@/assets/icon/logout.svg'

const profileStore = useProfileStore()
const productsStore = useProductsStore()

const profile = computed(() => profileStore.profile)
const redeemedProducts = computed(() => {
  if (!profile.value || !profile.value.redeemedItems) return []

  // Match redeemed products from profile with product data from the product store
  return profile.value.redeemedItems.map(item => {
    const product = productsStore.products.find(p => p._id === item.productId)
    if (product) {
      return {
        ...product,
        redeemedAt: item.redeemedAt
      }
    }
    return null
  }).filter(Boolean) // Remove nulls
})

const handleLogout = () => {
  const tokenCookie = useCookie('auth_token')
  tokenCookie.value = null
  profileStore.clearProfile()
  router.push('/login')
}

// Format expiry date in readable format
const formatExpiryDate = (date) => {
  if (!date) return 'N/A'
  const parsedDate = new Date(date)
  return parsedDate.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

onMounted(async () => {
  try {
    if (!profileStore.profile) {
      await profileStore.fetchProfile()
    }
    if (!productsStore.products.length) {
      await productsStore.fetchProducts()
    }
  } catch (error) {
    console.error('Error fetching profile or products:', error)
  }
})
</script>

<style scoped>
/* Style to make it look clean */
img {
  width: 100px;
  height: 100px;
  object-fit: cover;
}

button {
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s;
}

button[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>

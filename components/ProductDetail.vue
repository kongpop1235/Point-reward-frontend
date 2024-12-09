<template>
  <div v-if="product" class="h-auto mx-10 md:m-0 md:w-1/2 p-5 bg-darkGray rounded-lg shadow-md">
    <img 
      :src="product.imageUrl" 
      :alt="product.title" 
      class="w-full h-64 object-cover rounded-md mb-5"
    />

    <div class="text-left">
      <h2 class="text-2xl font-bold mb-2">{{ product.title }}</h2>
      <p class="text-gray-300 mb-4">{{ product.description }}</p>
    </div>
    <div class="flex items-center justify-between mb-4">
      <span class="text-primary font-semibold text-lg">
        {{ product.pointsRequired }} {{ $t('points') }}
      </span>
      <span class="text-gray-400 text-sm">
        {{ $t('expiryDate') }}: {{ formattedExpiryDate }}
      </span>
    </div>

    <button 
      @click="openConfirmationModal"
      :disabled="!canRedeem"
      class="w-full bg-primary text-white py-3 rounded-md hover:bg-red-500 transition-colors duration-300"
      :class="!canRedeem ? 'opacity-50 cursor-not-allowed' : ''"
    >
      {{ hasRedeemed ? $t('Already Redeemed') : $t('Redeem') }}
    </button>
  </div>

  <div v-else class="p-5">
    <p class="text-white">{{ $t('productNotFound') }}</p>
  </div>
  
  <transition name="fade">
    <ConfirmationModal 
      v-if="isModalOpen" 
      :title="$t('Confirm Redemption')" 
      :message="$t('Are you sure you want to redeem this product?')" 
      @confirm="redeemProduct"
      @cancel="closeConfirmationModal"
    />
  </transition>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useProductsStore } from '@/store/products'
import { useProfileStore } from '@/store/profile'
import ConfirmationModal from '@/components/ConfirmationModal.vue'

const props = defineProps({
  productId: {
    type: String,
    required: true
  }
})

const productsStore = useProductsStore()
const profileStore = useProfileStore()

const product = ref(null)
const isModalOpen = ref(false)

const findProductById = () => {
  product.value = productsStore.products.find((item) => item._id === props.productId)
}

onMounted(() => {
  if (!productsStore.products.length) {
    productsStore.fetchProducts()
      .then(() => findProductById())
      .catch((error) => {
        console.error('Failed to load products:', error)
      })
  } else {
    findProductById()
  }
})

const openConfirmationModal = () => {
  isModalOpen.value = true
}

const closeConfirmationModal = () => {
  isModalOpen.value = false
}

const redeemProduct = async () => {
  if (!product.value) return

  try {
    const response = await $fetch('/products/redeem', {
      baseURL: useRuntimeConfig().public.apiBase,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${useCookie('auth_token').value}`
      },
      body: { productId: product.value.id }
    })
    console.log('🎉 Redeem successful:', response)
    alert('Redeem successful! 🎉')

    await profileStore.fetchProfile()
  } catch (error) {
    console.error('❌ Redeem failed:', error)
    alert('Failed to redeem the product. Please try again later.')
  } finally {
    closeConfirmationModal()
  }
}

const formattedExpiryDate = computed(() => {
  if (!product.value?.expiryDate) return ''
  const date = new Date(product.value.expiryDate)
  return date.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
})

const hasRedeemed = computed(() => {
  if (!profileStore.profile || !product.value) return false
  return profileStore.profile.redeemedItems.some(
    (item) => item.productId === product.value._id
  )
})


const hasEnoughPoints = computed(() => {
  if (!profileStore.profile || !product.value) return false
  return profileStore.profile.points >= product.value.pointsRequired
})

const canRedeem = computed(() => hasEnoughPoints.value && !hasRedeemed.value)
</script>

<style scoped>
img {
  width: 100%;
  height: auto;
  border-radius: 8px;
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

.fade-enter-active, 
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from, 
.fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>

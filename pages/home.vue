<template>
  <div class="flex items-center justify-center h-auto w-full">
    <div class="text-center w-full h-auto">
      <!-- Swiper -->
      <div class="relative w-full mx-auto">
        <swiper 
          :modules="modules"
          ref="swiperRef"
          class="mySwiper" 
          :parallax="true" 
          :speed="1000" 
          :autoplay="{ delay: 3000 }"
          effect="slide"
          :loop="true" 
          :pagination="true" 
          :navigation="true" 
        >
          <swiper-slide 
            v-for="product in products" 
            :key="product._id"
            class="relative"
            @click="openProductDetail(product.productId)"
          >
            <div 
              class="absolute inset-0 w-full h-full bg-center bg-no-repeat bg-contain bg-xl-to-2xl-cover"
              :style="{ 'background-image': `url(${product.imageUrl})` }"
              data-swiper-parallax="-50%"
            ></div>

            <div class="content absolute bottom-10 left-10 text-start text-white">
              <h2 class="text-2xl font-bold" v-if="product.title" data-swiper-parallax="-200">
                {{ product.title }}
              </h2>
              <p class="mt-2" v-if="product.description" data-swiper-parallax="-300">
                {{ product.description }}
              </p>
            </div>
          </swiper-slide>
        </swiper>

        <!-- Modal Product Detail -->
        <transition name="fade">
          <div 
            v-if="selectedProductId" 
            class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            @click.self="closeProductDetail"
          >
            <ProductDetail 
              :productId="selectedProductId" 
              @close="closeProductDetail"
            />
          </div>
        </transition>

        <div class="my-5 mx-5 md:mx-16 2xl:mx-80">
          <div class="flex items-center justify-between mb-5 p-5 rounded-xl bg-darkGray">
            <div class="flex items-center gap-x-2">
              <UserCircleIcon class="h-8 w-8"/>
              <p>{{ profile?.name }}</p>
            </div>
            <div class="flex items-center gap-x-2">
              <PointIcon class="h-8 w-8"/>
              <p>{{ profile?.points }}</p>
            </div>
          </div>
          <ProductList />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCookie } from '#app'
const router = useRouter()

//import component
import ProductList from '@/components/ProductList.vue'
import ProductDetail from '@/components/ProductDetail.vue'

//import Swiper
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Scrollbar, Autoplay, A11y, Parallax } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

// 🔥 Swiper Ref
const swiperRef = ref(null)

// Import Store
import { useProfileStore } from '@/store/profile'
const profileStore = useProfileStore()
const profile = profileStore.profile

import { useAdvertisedProductsStore } from '@/store/advertisedProducts'
const advertisedProductsStore = useAdvertisedProductsStore()
const products = advertisedProductsStore.getAllProducts

// Import Icon
import UserCircleIcon from '@/assets/icon/user-circle.svg'
import PointIcon from '@/assets/icon/point-coin.svg'

const selectedProductId = ref(null)

onMounted(async () => {
  const token = useCookie('auth_token').value
  if (token && !profileStore.profile) {
    try {
      await profileStore.fetchProfile()
    } catch (error) {
      console.error('Error fetching profile:', error)
      useCookie('auth_token').value = null
      router.push('/login')
    }
  }

  if (!advertisedProductsStore.products.length) {
    try {
      await advertisedProductsStore.fetchAdvertisedProducts()
    } catch (error) {
      console.error('Failed to load advertised products:', error)
    }
  }
})

const openProductDetail = (productId) => {
  selectedProductId.value = productId
}

const closeProductDetail = () => {
  selectedProductId.value = null
}

const modules = [Navigation, Pagination, Scrollbar, Autoplay, A11y, Parallax]
</script>

<style scoped>
.mySwiper {
  width: 100%;
  height: 400px;
}

.swiper-slide {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 18px;
  background: #000; 
  color: #fff;
  cursor: pointer;
}

@media (min-width: 800px) and (max-width: 1600px) {
  .bg-xl-to-2xl-cover {
    background-size: cover;
  }
}

.content {
  position: absolute;
  bottom: 20px;
  left: 20px;
}

.fade-enter-active, 
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, 
.fade-leave-to {
  opacity: 0;
}
</style>

<template>
  <!-- ซ่อน Navbar ถ้าไม่มี Token -->
  <nav v-if="hasToken" class="fixed bottom-0 left-0 w-full bg-darkGray text-white h-16 flex items-center">
    <div class="flex justify-center w-full gap-x-12">
      <!-- ปุ่ม Home -->
      <router-link 
        to="/home" 
        class="group flex flex-col items-center transition-all duration-300 overflow-hidden"
        :class="{ 'text-primary': isActiveRoute('/home') }"
      >
        <div class="relative flex w-10 h-10 items-center justify-center">
          <!-- ไอคอน -->
          <homeIcon 
            class="w-6 h-6 cursor-pointer transition-all duration-300 group-hover:translate-y-[-10px]"
          />
          <!-- ข้อความ -->
          <span 
            class="absolute bottom-[-20px] text-xs transition-all duration-300 group-hover:bottom-[0px]"
          >
            Home
          </span>
        </div>
      </router-link>

      <!-- ปุ่ม Reward -->
      <router-link 
        to="/reward" 
        class="group flex flex-col items-center transition-all duration-300 overflow-hidden"
        :class="{ 'text-primary': isActiveRoute('/reward') }"
      >
        <div class="relative flex w-10 h-10 items-center justify-center">
          <!-- ไอคอน -->
          <rewardIcon 
            class="w-6 h-6 cursor-pointer transition-all duration-300 group-hover:translate-y-[-10px]"
          />
          <!-- ข้อความ -->
          <span 
            class="absolute bottom-[-20px] text-xs transition-all duration-300 group-hover:bottom-[0px]"
          >
            Reward
          </span>
        </div>
      </router-link>

      <!-- ปุ่ม Profile -->
      <router-link 
        to="/profile" 
        class="group flex flex-col items-center transition-all duration-300 overflow-hidden"
        :class="{ 'text-primary': isActiveRoute('/profile') }"
      >
        <div class="relative flex w-10 h-10 items-center justify-center">
          <!-- ไอคอน -->
          <UserIcon 
            class="w-6 h-6 cursor-pointer transition-all duration-300 group-hover:translate-y-[-10px]"
          />
          <!-- ข้อความ -->
          <span 
            class="absolute bottom-[-20px] text-xs transition-all duration-300 group-hover:bottom-[0px]"
          >
            Profile
          </span>
        </div>
      </router-link>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCookie } from '#app'
import homeIcon from '@/assets/icon/home.svg'
import rewardIcon from '@/assets/icon/reward.svg'
import UserIcon from '@/assets/icon/user.svg'

// ตรวจสอบ Token ว่ามีหรือไม่
const tokenCookie = useCookie('auth_token')
const hasToken = computed(() => !!tokenCookie.value) // ตรวจสอบว่ามี Token หรือไม่

// ฟังก์ชันเช็ค Route ว่าปัจจุบันอยู่ในหน้านั้นหรือไม่
const route = useRoute()
const isActiveRoute = (path) => route.path === path
</script>

<style scoped>
/* ปรับแต่งความสูงของ Navbar */
nav {
  height: 60px; /* หรือใช้ Tailwind h-16 */
}
</style>

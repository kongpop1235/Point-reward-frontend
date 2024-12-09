<template>
  <transition name="fade">
    <div 
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div 
        class="bg-darkGray text-left p-6 rounded-lg shadow-md w-full max-w-sm transition-transform duration-300 transform scale-95"
      >
        <h2 class="text-2xl font-bold mb-4 text-white">{{ title }}</h2>

        <p class="text-gray-300 mb-6">{{ message }}</p>

        <div class="flex justify-between">
          <button 
            @click="$emit('cancel')" 
            class="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors duration-300"
          >
            {{ $t('Cancel') }}
          </button>
          
          <button 
            @click="$emit('confirm')" 
            class="bg-primary text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-300"
          >
            {{ $t('Confirm') }}
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
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

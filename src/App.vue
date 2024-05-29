<script setup>
import { onMounted, ref } from 'vue';
import TheToast from './components/TheToast.vue';
import { eventBus } from './utils/eventBus';

const toasts = ref([]);

onMounted(() => {
  eventBus.on('toast', (data) => {
    // console.log(data);
    toasts.value.push(data);
    removeOneToast();
  });
});

function removeOneToast() {
  setTimeout(() => {
    toasts.value.shift();
  }, 2222);
}
</script>

<template>
  <router-view></router-view>

  <!-- <div class="toasts"> -->
  <TransitionGroup name="slide-left" tag="div" class="toasts">
    <TheToast
      v-for="(toast, i) in toasts"
      :key="i"
      :toastType="toast.type"
      :message="toast.message"
    ></TheToast>
  </TransitionGroup>
  <!-- </div> -->
</template>

<style>
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.25s ease;
}
.slide-left-enter-from,
.slide-left-leave-to {
  opacity: 0;
  transform: translateX(100px);
}
</style>

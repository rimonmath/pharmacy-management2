<script setup>
import { ref, computed, onMounted } from 'vue';
import TheButton from '@/components/TheButton.vue';

const playList = 'Vue JS composition API';

/*=======================*/
const completedVideos = ref(3);
function completeVideo() {
  completedVideos.value++;
}
/*=======================*/

/*=======================*/
const firstName = ref('');
const lastName = ref('');

const fullName = computed(() => {
  return `${firstName.value} ${lastName.value}`;
});

function getCertificate() {
  alert(
    `Welcome ${fullName.value}.
        You have completed total ${completedVideos.value} videos
        of vue js 3 composition API course.`
  );
}

onMounted(() => {
  firstName.value = 'Guest';
});
/*=======================*/
</script>

<template>
  <div class="container">
    <h1>{{ playList }}</h1>
    <p>
      Completed Videos <strong>{{ completedVideos }}</strong>
      <button class="ml-4" @click="completeVideo">+</button>
    </p>

    <hr class="my-4" />

    <input type="text" v-model="firstName" placeholder="First Name" />
    <input
      class="ml-4"
      type="text"
      v-model="lastName"
      placeholder="Last Name"
    />

    <br />
    <br />
    <TheButton block @click="getCertificate">Get certificate</TheButton>
  </div>
</template>

<style scoped>
.container {
  width: 555px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 200px;
}

.ml-4 {
  margin-left: 11px;
}
</style>

<script setup>
import axios from 'axios';

import { setPrivateHeaders } from '../service/axiosInstance';
import { showErrorMessage, showSuccessMessage } from '../utils/functions';
import { infoStore } from '../data/info';
import { useAuthStore } from '../store/authStore';
import TheButton from '../components/TheButton.vue';
import { ref, shallowRef, shallowReactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const usernameEl = ref(null);
const passwordEl = ref(null);

const formData = shallowReactive({
  username: '',
  password: ''
});

const loggingIn = shallowRef(false);

const authStore = useAuthStore();

function handleSubmit() {
  if (!formData.username) {
    // TODO: show error message on toast

    showErrorMessage('username can not be empty!');
    usernameEl.value.focus();
    return;
  }
  if (formData.password.length < 6) {
    // alert("Password must be at least 6 characters long!");
    // TODO: show error message on toast
    showErrorMessage('Password must be at least 6 characters long!');
    passwordEl.value.focus();

    return;
  }

  loggingIn.value = true;
  axios
    .post('https://api.rimoned.com/api/pharmacy-management/v1/login', formData)
    .then((res) => {
      showSuccessMessage(res);
      authStore.login(res.data);
      localStorage.setItem('accessToken', res.data.accessToken);
      setPrivateHeaders();
      router.push('/dashboard');
    })
    .catch((err) => {
      showErrorMessage(err);
    })
    .finally(() => {
      loggingIn.value = false;
    });
}
</script>

<template>
  <div class="login-page">
    <div class="login-card">
      <h2>{{ infoStore.projectName }}</h2>

      <div class="text-center">
        <img src="/img/lock.png" class="login-card__icon" alt="" />
        <h2>User Login</h2>
      </div>

      <form action="#" @submit.prevent="handleSubmit">
        <label class="block">Username</label>
        <input
          type="text"
          placeholder="Enter your username"
          v-model="formData.username"
          required
          ref="usernameEl"
        />

        <label class="block mt-3">Password</label>
        <input
          type="password"
          placeholder="Enter password"
          v-model="formData.password"
          required
          ref="passwordEl"
        />

        <!-- <p class="text-center mt-3" v-if="loggingIn">Logging in...</p> -->
        <!-- <button type="submit" class="w-100 mt-3" v-else>Login</button> -->
        <TheButton :block="true" :loading="loggingIn" class="mt-3">
          Login
        </TheButton>

        <div class="d-flex jc-between mt-3">
          <div>
            <label>
              <input type="checkbox" />
              Remember Me
            </label>
          </div>
          <div>
            <a href="#">Forgot Password?</a>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style>
.box {
  width: 55px;
  height: 55px;
  background-color: greenyellow;
  margin-bottom: 22px;
  transition: all 0.5s;
}

.box--right {
  margin-left: 222px;
}

.box1 {
  width: 55px;
  height: 55px;
  background-color: greenyellow;
  margin-bottom: 22px;
  /* animation: showhide 1s ease-in; */
}

.login-page {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(235, 235, 235);
}

.login-card {
  width: 400px;
  /* border: 1px solid gray; */
  min-height: 193px;
  box-shadow: 0px 2px 9px 4px #dfdfdf;
  background-color: #fff;
  border-radius: 5px;
  padding: 44px 33px;
}

.login-card input[type='text'],
.login-card input[type='password'] {
  width: 100%;
}

.login-card__icon {
  max-width: 77px;
}

@keyframes showhide {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }

  50% {
    opacity: 0.5;
    transform: scale(1.2);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.showhide-enter-active {
  animation: showhide 1s ease-in;
  /* transition: all 0.5s; */
}
.showhide-enter-from {
  /* opacity: 0;
  transform: scale(0.5); */
}

.showhide-enter-to {
  /* opacity: 1;
  transform: scale(1); */
}

.showhide-leave-active {
  animation: showhide 1s ease-in reverse;
  /* transition: all 0.5s; */
}
.showhide-leave-from {
  /* opacity: 1;
  transform: scale(1); */
}

.showhide-leave-to {
  /* opacity: 0;
  transform: scale(0.5); */
}
</style>

// src/views/SignUp.vue

<template>
  <div>
    <h1>Sign Up</h1>
    <input type="text" placeholder="Username" v-model="username" />
    <input type="text" placeholder="Password" v-model="password" />
    <input
        type="text"
        placeholder="Password (repeat)"
        v-model="password_repeat"
    />
    <input type="button" @click="signUp" value="Sign Up" />
    <p v-if="msg">{{ msg }}</p>
  </div>
</template>
<script>
import AuthService from '@/services/AuthService.js';

export default {
  data() {
    return {
      username: '',
      password: '',
      password_repeat: '',
      msg: ''
    };
  },
  methods: {
    async signUp() {
      try {
        const credentials = {
          username: this.username,
          password: this.password,
          password_repeat: this.password_repeat
        };
        const response = await AuthService.signUp(credentials);
        this.msg = response.msg;
      } catch (error) {
        this.msg = error.response.data.msg;
      }
    }
  }
};
</script>
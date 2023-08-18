<template>
  <div class="login-container">
    <div class="login-form">
      <img alt="Vue logo" class="logo me-3" src="@/assets/logo.png" width="125" height="125" />
      <form @submit.prevent="submitForm">
        <h2 class="text-muted">Login</h2>
        <div class="form-group">
          <label for="username">Usuario:</label>
          <input v-model="username" type="text" id="username" required />
        </div>
        <div class="form-group">
          <label for="password">Senha:</label>
          <input v-model="password" type="password" id="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async submitForm() {
      console.log('ssssssss');
      try {
        const response = await axios.post('http://localhost:3000/login', {
          username: this.username,
          password: this.password,
        });
        if (response.data.error === false) {
          localStorage.setItem('token', response.data.accessToken);
        }

      } catch (error) {
        console.error('Erro ao fazer login:', error);
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(to bottom, #295d97, #3ea635);
}

.login-form {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 400px;
  padding: 20px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 10px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>

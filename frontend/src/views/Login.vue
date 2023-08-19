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
import { useToast } from 'vue-toastification';

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  setup() {
    const toast = useToast();
    return { toast }
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post('http://localhost:3000/login', {
          username: this.username,
          password: this.password,
        });
        if (response.data.error === false) {
          localStorage.setItem('token', response.data.accessToken);
          this.$router.push('/');
        }else {
          this.toast(response.data.message, {
            position: "top-right", 
            timeout: 2000,
            closeOnClick: true,
            pauseOnFocusLoss: false,
            type: 'warning',
          });
        }
      } catch (error) {
        console.error('Erro ao fazer login:', error);
      }
    },
    async validadeTokenExistente(token) {
      axios.post('http://localhost:3000/validate-token', { token })
        .then(response => {
          if (response.data.error == false) {
            this.$router.push('/');
          }
        });
    }
  },
  mounted() {
    const token = localStorage.getItem('token');
    if (token) {
      this.validadeTokenExistente(token);
    }
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

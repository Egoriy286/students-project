<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="card w-96 bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">Вход</h2>
        <form @submit.prevent="handleLogin">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input
              type="email"
              v-model="email"
              placeholder="Введите ваш email"
              class="input input-bordered"
              required
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Пароль</span>
            </label>
            <input
              type="password"
              v-model="password"
              placeholder="Введите ваш пароль"
              class="input input-bordered"
              required
            />
            <label class="label">
              <a href="#" class="label-text-alt link link-hover">Забыли пароль?</a>
            </label>
          </div>
          <div class="form-control mt-6">
            <button type="submit" class="btn btn-primary">Войти</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from '../services/auth';

export default {
  data() {
    return {
      email: '',
      password: '',
      error: null,
    };
  },
  methods: {
    async handleLogin() {
      this.error = null;
      try {
        const data = await login(this.email, this.password);
        localStorage.setItem('token', data.access_token);
        this.$router.push('/table'); // Перенаправление на страницу после успешного входа
      } catch (err) {
        this.error = 'Ошибка авторизации. Проверьте свои данные.';
      }
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
}
</style>

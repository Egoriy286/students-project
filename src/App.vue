<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink class="btn btn-m m-3 " v-if="isAuthenticated" to="/">Главная</RouterLink>
        <RouterLink class="btn btn-m m-3 " v-if="isAuthenticated" to="/table">Таблица</RouterLink>
        <RouterLink class="btn btn-m m-3" v-if="!isAuthenticated" to="/login">Вход</RouterLink>
        <button @click="logout" v-if="isAuthenticated" class="btn btn-m m-3">Выход</button>
      </nav>
    </div>
  </header>
  <RouterView />
</template>

<script setup lang="ts">
import { inject, ref } from 'vue';
import Login from './components/Login.vue';
import { RouterLink, RouterView } from 'vue-router'
import { log } from 'console';
// @ts-ignore
import { logout as apiLogout } from './services/auth'


const isAuthenticated = ref(false); // состояние аутентификации

// Функция для проверки аутентификации
const checkAuthentication = () => {
  const token = localStorage.getItem('token');
  isAuthenticated.value = !!token; // Устанавливаем состояние на основе наличия токена
};

// Вызываем проверку при создании компонента
checkAuthentication();

// Функция для выхода
const logout = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('Токен не найден');
    return;
  }
  
  try {
    await apiLogout(); // Запрос на выход
    localStorage.removeItem('token'); // Удаляем токен из localStorage
    isAuthenticated.value = false; // Обновляем состояние аутентификации
    location.reload();
    // Перенаправление на страницу входа (если необходимо)
    // Можно использовать this.$router.push('/login'); если не используете setup
  } catch (error) {
    console.error('Ошибка при выходе:', error);
  }
};
</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  background-color: #f8f9fa; /* Light background for the header */
  padding: 10px;
}

nav {
  display: flex;
  gap: 20px; /* Space between links */
}

.btn {
  text-decoration: none;
  padding: 10px 15px;
  border-radius: 5px;
  color: white;
  background-color: #007bff; /* Bootstrap primary color */
}

.btn:hover {
  background-color: #0056b3; /* Darker shade for hover */
}
</style>
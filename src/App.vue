<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink class="btn btn-m m-3 " to="/">Главная</RouterLink>
        <RouterLink class="btn btn-m m-3 " to="/table">Таблица</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>
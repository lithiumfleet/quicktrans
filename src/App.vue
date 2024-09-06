<script setup>
import { RouterLink, RouterView } from 'vue-router';

</script>


<template>
  <nav>
    <RouterLink to="/translate">Translate</RouterLink>
    <RouterLink to="/rewrite">Rewrite</RouterLink>
  </nav>
  <RouterView></RouterView>
</template>
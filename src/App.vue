<script setup>
import { ref } from 'vue'
import Reader from './Component/Reader.vue';
import { RouterLink, RouterView } from 'vue-router';

const title = ref("")

function printsth() {
  window.api.printsth(title.value)
}

function close_application() {
  window.close()
}



</script>


<template>
  <button @click="close_application">x</button>
  <nav>
    <RouterLink to="/translate">Translate</RouterLink>
    <RouterLink to="/rewrite">Rewrite</RouterLink>
  </nav>
  <RouterView></RouterView>
</template>
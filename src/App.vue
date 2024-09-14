<script setup>
import { RouterView } from 'vue-router';
import { onMounted } from 'vue';
import { settingPaddleState } from './Component/States';

onMounted(() => {
    window.paddleAPI.recevConfigFromMain().then((defaultStateFromMain) => {
        console.debug(defaultStateFromMain)
        Object.assign(settingPaddleState, defaultStateFromMain)
    })
})


</script>


<template>
  <RouterView></RouterView>
</template>

<style scoped>

</style>
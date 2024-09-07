<script lang="ts" setup>

function captureScreen() {
    window.captureAPI.captureScreen('./thumbnail.png')
}


</script>

<template>
    <h1>this is rewriter</h1>
    <button @click="captureScreen">capture screen</button>
</template>

<style scoped>
</style>
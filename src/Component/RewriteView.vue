<script lang="ts" setup>
import { ref } from 'vue';


const windowInfo = ref({
    width: 0,
    height: 0,
    x: 0,
    y: 0
})

function captureScreen() {
    window.captureAPI.captureScreen('./thumbnail.png')
}

async function showWindowInfo() {
    windowInfo.value = await window.captureAPI.getWindowInfo()
}


</script>

<template>
    <h1>this is rewriter</h1>
    <button @click="captureScreen">capture screen</button>

    <div>
        {{ windowInfo }}
    </div>
    <button @click="showWindowInfo">show window info</button>
</template>

<style scoped>
</style>
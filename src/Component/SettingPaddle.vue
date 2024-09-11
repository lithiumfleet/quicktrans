<script lang="ts" setup>

function closeWindow() {
    window.paddleAPI.settingPaddleIsClosing()
    console.debug('setting window closed mannully')
    window.close()
}

</script>

<template>
    <div @click="closeWindow">x</div>
    <div> THIS IS SETTING PADDLE </div>
</template>

<style scoped>
</style>
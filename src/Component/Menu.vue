<script lang="ts" setup>
import { ref } from 'vue'

const isOpening = ref(false)

window.settingAPI.onSettingPaddleIsClosing(() => {isOpening.value = false})

async function openSettingPaddle() {
    const base_url = window.location.origin
    window.settingAPI.openSettingPaddle(base_url)
    isOpening.value = true
}

</script>

<template>
    <img 
        class="menu-icon"
        :class="{ 'menu-icon-active':isOpening, 'menu-icon-deactive':!isOpening}"
        src="@imgs/setting.svg"
        @click="openSettingPaddle"
    />

</template>

<style scoped>

.menu-icon {
    width: 1em;
}

.menu-icon-active {
    transform: rotate(1.25turn);
    transition: transform 2s;
}

.menu-icon-deactive {
    transform: rotate(-1.25turn);
    transition: transform 2s;
}
</style>
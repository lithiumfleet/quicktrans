<script lang="ts" setup>
import { ref } from 'vue';
import { translateState } from './States'


async function ocrFromWindow() {
    await window.captureAPI.captureScreen('./temp.png')
    const windowArea = await window.captureAPI.getWindowInfo()
    const targetArea = {
        left : windowArea.left,
        top : windowArea.top,
        width : windowArea.width-19,
        height : windowArea.height-26
    }
    return await window.captureAPI.areaOCR('./temp.png', targetArea)
}

const openMenu = ref(false)
async function toggleMenu() {
    openMenu.value = !openMenu.value
    translateState.dst = await ocrFromWindow()
}

function close_window() {
    window.close()
}
</script>

<template>
    <img 
        class="menu-icon"
        :class="{ 'menu-icon-active':openMenu }"
        src="@imgs/setting.svg"
        @click="toggleMenu"
    />

</template>

<style scoped>

.menu-icon {
    width: 1em;
}

.menu-icon-active {
    transform: rotate(1turn);
    transition: transform 1s;
}
</style>
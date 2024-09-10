<script lang="ts" setup>
import { ref } from 'vue';
import { translateState, ocrZoneState } from './States'


async function ocrFromWindow() {
    await window.captureAPI.captureScreen('./thumbnail.png')
    const windowArea = await window.captureAPI.getWindowInfo()
    const targetArea = {
        left : windowArea.left,
        top : windowArea.top,
        width : ocrZoneState.width,
        height : ocrZoneState.height
    }
    return await window.captureAPI.areaOCR('./thumbnail.png', targetArea)
}

const openMenu = ref(false)
async function toggleMenu() {
    openMenu.value = !openMenu.value
    translateState.dst = await ocrFromWindow()
    ocrZoneState.update()
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
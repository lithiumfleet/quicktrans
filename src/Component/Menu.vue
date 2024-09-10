<script lang="ts" setup>
import { ref } from 'vue';
import { translateState } from './States'
import { ocrFromWindow } from './ocr'


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
        :class="{ 'menu-icon-active':openMenu, 'menu-icon-deactive':!openMenu }"
        src="@imgs/setting.svg"
        @click="toggleMenu"
    />

</template>

<style scoped>

.menu-icon {
    width: 1em;
}

.menu-icon-active {
    transform: rotate(0.75turn);
    transition: transform 1.5s;
}

.menu-icon-deactive {
    transform: rotate(-0.75turn);
    transition: transform 1.5s;
}
</style>
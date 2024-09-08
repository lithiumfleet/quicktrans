<script lang="ts" setup>
import { ref } from 'vue';

const openMenu = ref(false)
function toggleMenu() {
    openMenu.value = !openMenu.value
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
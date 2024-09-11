<script lang="ts" setup>
import TranslateCard from '@src/Component/TranslateCard.vue';
import Menu from '@src/Component/Menu.vue';
</script>

<template>
    <div class="main-page">
        <TranslateCard class="translate-card"></TranslateCard>
        <div class="side-bar">
            <Menu class="setting"></Menu>
            <img class="drag-area" src="@imgs/drag-bar.png" />
        </div>
    </div>
</template>

<style scoped>
.main-page {
    display: flex;
    flex-direction: row;
    border: 0.1vh rgba(152, 98, 228, 0.73) solid;
    height: 97vh;
}

.side-bar {
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-left: 0.1vh rgba(152, 98, 228, 0.73) solid;
    background-color: rgba(137, 43, 226, 0.508);
    overflow: hidden;
}

.setting {
    margin-top: 0em;
}

.drag-area {
    width: 1em;
    height: 1em;
    -webkit-app-region: drag;
    margin-bottom: 0em;
}
</style>
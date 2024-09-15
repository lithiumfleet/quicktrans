<script lang="ts" setup>
import { ref } from 'vue'
import { syncSettingPaddleStateWithMain } from './States';
import { settingPaddleState } from './States';
import { refreshOCRTrans } from './ocrTrans';

const isOpening = ref(false)
let OCRTimmer = null;

function updateOCRTimmer() {
    clearInterval(OCRTimmer);
    if (settingPaddleState.enableAutoOCRTrans) {
        OCRTimmer = setInterval(async () => {
            console.debug('auto ocr translate mode');
            await refreshOCRTrans();
        }, settingPaddleState.ocrInterval);
    } else {
        console.debug('mannul ocr translate mode');
        OCRTimmer = null;
    }
}

window.settingAPI.onSettingPaddleIsClosing(async () => {
    console.debug('paddleclosed event is trapped in menu')
    isOpening.value = false
    await syncSettingPaddleStateWithMain()
    updateOCRTimmer()
})

async function openSettingPaddle() {
    const base_url = window.location.origin
    await syncSettingPaddleStateWithMain()
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
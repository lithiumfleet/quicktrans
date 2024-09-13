<script lang="ts" setup>
import { translateState, ocrZoneState } from './States';


async function refreshOCRTrans() {
    await window.captureAPI.captureScreen('./thumbnail.png')
    const area = await ocrZoneState.getArea()
    translateState.src = await window.captureAPI.areaOCR('./thumbnail.png', area)
    console.debug(`ocr output: ${translateState.src}`)
    translateState.dst = await window.translateAPI.translate(translateState.src)
    console.debug(`translate output: ${translateState.dst}`)
}



</script>

<template>
    <div class="translate-card">
        <div id="OCRZONE" class="src-zone"> </div>
        <div id="DSTZONE" class="dst-zone" @click="refreshOCRTrans"> {{ translateState.dst }} </div>
    </div>
</template>

<style scoped>
.translate-card {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.src-zone {
    flex-grow: 1;
    overflow: auto;
}
.dst-zone {
    cursor: pointer;
    width: 100%;
    position: absolute;
    bottom: 0em;
    border-top: 0.1vh rgba(152, 98, 228, 0.73) solid;
    min-height: 1em;
    background-color: rgb(171, 119, 219);
    text-align: center;
}
</style>
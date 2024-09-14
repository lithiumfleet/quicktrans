<script lang="ts" setup>
import { watch, onBeforeUnmount  } from 'vue';
import { translateState, settingPaddleState } from './States';
import { refreshOCRTrans } from './ocrTrans';

let intervalId = null;

 // use getter function in watch. if pass directly watch will receive a primitive value, not a reactive property.
watch(() => settingPaddleState.enableAutoOCRTrans, (enableAuto) => { // FIXME: watch not work
  if (enableAuto) {
    intervalId = setInterval(async () => {
      console.debug('auto ocr translate mode');
      await refreshOCRTrans();
    }, settingPaddleState.ocrInterval);
  } else {
    console.debug('mannul ocr translate mode');
    if (intervalId !== null) { clearInterval(intervalId); }
    intervalId = null;
  }
});


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
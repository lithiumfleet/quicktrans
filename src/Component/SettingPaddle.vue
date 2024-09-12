<script lang="ts" setup>
import { reactive, toRaw } from 'vue';

let defaultPaddleState = {}
window.paddleAPI.recevConfigFromMain().then((data) => {
    console.debug(data)
    defaultPaddleState=data
})

const settingPaddleState = reactive(defaultPaddleState)

async function closeWindow() {
    await window.paddleAPI.settingPaddleIsClosing() // notify the main process
    console.debug('setting window closed mannully')
    await window.paddleAPI.sendConfigToMain(toRaw(settingPaddleState))
    window.close()
}


// FIXME: font not bind to settingPaddleState

</script>

<template>
    <img class="exit" src="@imgs/close-window.svg" @click="closeWindow"></img>
    <div class="setting-page">
        <div class="page-title"> SETTING PAGE </div>

        <fieldset class="choose-backend">
            <legend>Choose a backend</legend>
            <div>
                <input id="baiduTrans" type="radio" name="backend" value="baiduTrans" v-model="settingPaddleState.translateBackend" checked />
                <label for="baiduTrans">baiduTrans</label>
            </div>
            <div>
                <input id="rwkv" type="radio" name="backend" value="rwkv" v-model="settingPaddleState.translateBackend"/>
                <label for="rwkv">rwkv</label>
            </div>
        </fieldset>

        <fieldset v-if="settingPaddleState.translateBackend!==null && settingPaddleState.translateBackend!==undefined" class="backend-setting">
            <legend>Backend setting</legend>
            <div v-if="settingPaddleState.translateBackend==='baiduTrans'" class="input-setting">
                <div>
                    <label for="baidutrans-appid">Baidu AppId</label>
                    <input id="baidutrans-appid" type="text" v-model="settingPaddleState.baiduTransAppId" placeholder="optional"/>
                </div>
                <div>
                    <label for="baidutrans-apikey">Baidu ApiKey</label>
                    <input id="baidutrans-apikey" type="text" v-model="settingPaddleState.baiduTransApiKey" placeholder="optional"/>
                </div>
            </div>
            <div v-if="settingPaddleState.translateBackend==='rwkv'" class="input-setting">
                <div>
                    <label for="rwkv-model-path">RWKV Model Path</label>
                    <input id="rwkv-model-path" type="text" v-model="settingPaddleState.rwkvModelPath" placeholder="optional"/>
                </div>
            </div>
        </fieldset>

        <fieldset class="choose-task">
            <legend>Choose the task</legend>
            <label>from</label>
            <div class="tasks">
                <div>
                    <input id="auto" type="radio" name="from" value="auto" v-model="settingPaddleState.from" checked/>
                    <label for="auto">auto</label>
                </div>
                <div>
                    <input id="en" type="radio" name="from" value="en" v-model="settingPaddleState.from" :disabled="settingPaddleState.to==='en'"/>
                    <label for="en">en</label>
                </div>
                <div>
                    <input id="jp" type="radio" name="from" value="jp" v-model="settingPaddleState.from" :disabled="settingPaddleState.to==='jp'"/>
                    <label for="jp">jp</label>
                </div>
                <div>
                    <input id="zh" type="radio" name="from" value="zh" v-model="settingPaddleState.from" :disabled="settingPaddleState.to==='zh'"/>
                    <label for="zh">zh</label>
                </div>
            </div>
            <label>to</label>
            <div class="tasks">
                <div>
                    <input id="auto" type="radio" name="to" value="auto" v-model="settingPaddleState.to" checked/>
                    <label for="auto">auto</label>
                </div>
                <div>
                    <input id="en" type="radio" name="to" value="en" v-model="settingPaddleState.to" :disabled="settingPaddleState.from==='en'"/>
                    <label for="en">en</label>
                </div>
                <div>
                    <input id="jp" type="radio" name="to" value="jp" v-model="settingPaddleState.to" :disabled="settingPaddleState.from==='jp'"/>
                    <label for="jp">jp</label>
                </div>
                <div>
                    <input id="zh" type="radio" name="to" value="zh" v-model="settingPaddleState.to" :disabled="settingPaddleState.from==='zh'"/>
                    <label for="zh">zh</label>
                </div>
            </div>
        </fieldset>

        <fieldset class="ocr-setting input-setting">
            <legend>OCR setting</legend>
            <div>
                <label for="ocr-interval">OCR Interval(s)</label>
                <input id="ocr-interval" type="number" v-model="settingPaddleState.ocrInterval" min="0.1" max="5" placeholder="default 0.6"/>
            </div>
            <div>
                <label for="tesseract-model-path">Tesseract model path</label>
                <input id="tesseract-model-path" type="text" v-model="settingPaddleState.tesseractModelPath" placeholder="optional"/>
            </div>
        </fieldset>

    </div>
</template>

<style scoped>
.page-title {
    text-align: center;
    -webkit-app-region: drag;
}
.setting-page {
    display: flex;
    flex-direction: column;
}
.setting-page > * {
    margin: 0.4em;
}
.exit {
    cursor: pointer;
    float: right;
    margin-right: 0.5em;
    margin-top: 0.5em;
    width: 0.8em;
    height: 0.8em;
    padding: 0.2em;
}
.choose-task > .tasks {
    display: flex;
    flex-direction: row;
}
.choose-task > .tasks > div {
    margin-right: 1em;
}
.input-setting {
    display: flex;
    flex-direction: column;
}
.input-setting > div {
    display: flex;
    flex-direction: row;
    margin: 0.3em;
}
.input-setting > div > label {
    margin-right: 0.8em;
}
.input-setting > div > input {
    width: 10em;
}
.input-setting > div >
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
    margin: 0;
}
</style>
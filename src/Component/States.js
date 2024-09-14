import { reactive, ref } from "vue"

export const translateState = reactive({
    srcLangContent: "",
    destLangContent: "",

    get dst() { return this.destLangContent },
    set dst(val) { this.destLangContent = val },
    get src() { return this.srcLangContent },
    set src(val) { this.srcLangContent = val },
})


export const ocrZoneState = reactive({
    ocrZoneLeft: 0,
    ocrZoneTop: 0,
    ocrZoneWidth: 0,
    ocrZoneHeight: 0,

    setAll(left, top, width, height) { 
        this.ocrZoneLeft = left
        this.ocrZoneTop = top
        this.ocrZoneWidth = width
        this.ocrZoneHeight = height
    },

    async update() {
        const ocrZoneElement = document.getElementById("OCRZONE")
        const dstzoneElement = document.getElementById("DSTZONE")
        const windowInfo = await window.captureAPI.getWindowInfo()
        this.setAll(
            windowInfo.left,
            windowInfo.top,
            ocrZoneElement.offsetWidth,
            ocrZoneElement.offsetHeight - dstzoneElement.offsetHeight
        )
        console.log(`set ocr ltwh: ${this.ocrZoneLeft} ${this.ocrZoneTop} ${this.ocrZoneWidth} ${this.ocrZoneHeight}`)
    },

    async getArea() {
        await this.update()
        return {
            left: this.ocrZoneLeft,
            top: this.ocrZoneTop,
            width: this.ocrZoneWidth>=1 ? this.ocrZoneWidth : 1,
            height: this.ocrZoneHeight>=1 ? this.ocrZoneHeight : 1
        }
    }

})

export const settingPaddleState = reactive({}) // init from main when app.vue mounted
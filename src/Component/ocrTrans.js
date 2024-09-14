import { translateState, ocrZoneState } from "./States"

// about 600ms
export async function refreshOCRTrans() {
    await window.captureAPI.captureScreen('./thumbnail.png') // time consuming
    const area = await ocrZoneState.getArea()
    translateState.src = await window.captureAPI.areaOCR('./thumbnail.png', area)
    console.debug(`ocr output: ${translateState.src}`)
    translateState.dst = await window.translateAPI.translate(translateState.src)
    console.debug(`translate output: ${translateState.dst}`)
}
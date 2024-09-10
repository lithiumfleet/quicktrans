import { ocrZoneState } from './States'

/**
 * OCR function. Returns the ocr result string in the #OCRZONE.
 */
export async function ocrFromWindow() {
    ocrZoneState.update()
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
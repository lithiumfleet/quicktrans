// ocr tool
// main api: areaOCR
// this module don't provide desktop capture function
const { createWorker } = require('tesseract.js');

let worker = undefined
createWorker(['eng'])
    .then((newWorker) => worker=newWorker)

// input: 
//     img_path: path to the captured desktop
//     area: an object contains four keys
//           e.g { left: 0, top: 0, width: 500, height: 250 }
//           you may need ocrZoneState.getArea() to get area
// output: string
async function areaOCR(file_path, area) {
    const { data: { text } } = await worker.recognize(file_path, { rectangle: area })
    return text
}

module.exports = areaOCR
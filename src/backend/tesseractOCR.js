// ocr tool
// main api: areaOCR
// this module don't provide desktop capture function
const { createWorker } = require('tesseract.js');

const worker = await createWorker(['eng', 'zh', 'jp']);

// input: 
//     img_path: path to the captured desktop
//     area: an object contains four keys
//           e.g { left: 0, top: 0, width: 500, height: 250 }
// output: string
async function areaOCR(file_path, area) {
    const { data: { text } } = await worker.recognize(file_path, { rectangle: area })
    return text
}

exports.areaOCR = areaOCR
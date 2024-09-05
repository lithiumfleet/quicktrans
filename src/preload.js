const { contextBridge } = require('electron')
const fs = require('fs');
const path = require('path');


function printsth(msg) {
    console.log("Print Something", msg);
}

function readfile(file_path) {
    let local_path = path.normalize(file_path)
    return fs.readFileSync(local_path).toString();
}

contextBridge.exposeInMainWorld(
    'api',
    {
        printsth: (msg) => printsth(msg),
        readfile: (path) => readfile(path)
    }
)

contextBridge.exposeInMainWorld(
    'translateAPI',
    {
        printsth: (msg) => printsth(msg),
        translate: (srcContent) => srcContent
    }
)
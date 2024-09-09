import { contextBridge, ipcRenderer } from 'electron';


// Regist apis here
// contextBridge.exposeInMainWorld(
//     <api_group_name>, 
//     { <api_name>: ipcRenderer.invoke(<event_name>, <args>) }
// )
// In the fonts (vue render process, preload.js):
//      use window.<api_group_name>.<api_name> to call a registed function 
// In the backend (main process, main.js)
//      use ipcMain.handle(<event>, (event, ...args) => {do sth...})
contextBridge.exposeInMainWorld(
    'translateAPI',
    {
        baidutrans: (p, from, to) => ipcRenderer.invoke("baiduTrans", p, from, to)
    }
)

contextBridge.exposeInMainWorld(
    'captureAPI',
    {
        captureScreen: (img_path) => ipcRenderer.invoke("captureScreen", img_path),
        getWindowInfo: () => ipcRenderer.invoke("getWindowInfo"),
        areaOCR: (file_path, area) => ipcRenderer.invoke("areaOCR", file_path, area)
    }
)
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld(
    'paddleAPI',
    {
        settingPaddleIsClosing: () => ipcRenderer.invoke('settingPaddleIsClosing')
    }
)
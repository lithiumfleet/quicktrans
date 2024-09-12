const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld(
    'paddleAPI',
    {
        settingPaddleIsClosing: () => ipcRenderer.invoke('settingPaddleIsClosing'),
        sendConfigToMain: (config) => ipcRenderer.invoke('sendConfigToMain', config),
        recevConfigFromMain: () => ipcRenderer.invoke('recevConfigFromMain')
    }
)
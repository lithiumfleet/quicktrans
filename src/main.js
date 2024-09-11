const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

let mainWindow = null

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 160,
    height: 48,
    minHeight: 48,
    minWidth: 80,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    // fullscreenable: false,
    transparent: true
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


// Handler warpper
function autoUnwarpArgs(fn) {
  // wapper: auto unwarp args
  function handler(event, ...args) {
    return fn(...args)
  }
  return handler
}

// Regist functions in preload.js first!
const baiduTrans = require('D:/Quicktrans/quicktrans/src/backend/baiduTrans.js')
const captureScreen = require('D:/Quicktrans/quicktrans/src/backend/desktopCapture')
const getWindowInfo = require('D:/Quicktrans/quicktrans/src/backend/windowInfo')
const areaOCR = require('D:/Quicktrans/quicktrans/src/backend/tesseractOCR')
const { openSettingPaddle } = require('D:/Quicktrans/quicktrans/src/backend/openSettingPaddle')
const notifySettingPaddleClosing = (event) => { 
  console.debug("trigger notifySettingPaddleClosing handler")
  mainWindow.webContents.send('setting-paddle-closing') 
}

// Add handlers for registed events here

// translateAPI
ipcMain.handle('baiduTrans', autoUnwarpArgs(baiduTrans))
// captureAPI
ipcMain.handle('captureScreen', autoUnwarpArgs(captureScreen))
ipcMain.handle('getWindowInfo', getWindowInfo)
ipcMain.handle('areaOCR', autoUnwarpArgs(areaOCR))
// settingAPI
ipcMain.handle('openSettingPaddle', autoUnwarpArgs(openSettingPaddle))

// defined in main.js
ipcMain.handle('settingPaddleIsClosing', notifySettingPaddleClosing)

// window.<apigroup>.<apiname> is avaliable now :-)


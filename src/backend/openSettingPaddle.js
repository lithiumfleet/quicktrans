const { BrowserWindow } = require('electron')
const path = require('node:path')

const settingPaddleState = {
  translateBackend: 'baiduTrans',
  from: 'auto',
  to: 'auto',
  ocrInterval: 1,
  hotkey: undefined
}

let settingWindow = null


function openSettingPaddle(base_url) {
  if (settingWindow) {
    settingWindow.focus()
    return
  }

  settingWindow = new BrowserWindow({
    width: 300,
    height: 200,
    minWidth: 150,
    minHeight: 100,
    frame: false,
    fullscreenable: false,
    webPreferences: {
      preload: path.join(__dirname, 'settingPaddlePreload.js'),
    },
  });

  settingWindow.on('closed', () => {
    settingWindow = null
  });

  const settingURL = new URL('setting', base_url)
  console.debug(`opening setting paddle`)
  console.debug(`setting url: ${settingURL.toString()}`)
  settingWindow.loadURL(settingURL.toString());
};



exports.openSettingPaddle = openSettingPaddle
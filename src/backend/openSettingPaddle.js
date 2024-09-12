const { BrowserWindow } = require('electron')
const path = require('node:path')


let settingWindow = null


function openSettingPaddle(base_url) {
  if (settingWindow) {
    settingWindow.focus()
    return
  }

  settingWindow = new BrowserWindow({
    width: 420,
    height: 500,
    frame: false,
    fullscreenable: false,
    webPreferences: {
      preload: path.join(__dirname, 'settingPaddlePreload.js'),
    },
    resizable: false
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
const { BrowserWindow } = require('electron')
const path = require('node:path');

const openSettingPaddle = (base_url) => {
  const settingWindow = new BrowserWindow({
    width: 300,
    height: 200,
    minWidth: 150,
    minHeight: 100,
    frame: true,
    fullscreenable: false,
  });

  const settingURL = new URL('setting', base_url)
  console.debug(`opening setting paddle`)
  console.debug(`setting url: ${settingURL.toString()}`)
  settingWindow.loadURL(settingURL.toString());
};

module.exports = openSettingPaddle
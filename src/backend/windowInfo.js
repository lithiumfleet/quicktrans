// https://www.electronjs.org/docs/latest/api/browser-window#wingetposition
// https://www.electronjs.org/docs/latest/api/browser-window#wingetsize


// egt window width, height, x, y by proxiding winsow id
function getWindowInfo(event) {

    const reqWindow = event.sender.getOwnerBrowserWindow()

    const wh = reqWindow.getSize()
    const width = wh[0]
    const height = wh[1]

    const xy = reqWindow.getPosition()
    const x = xy[0]
    const y = xy[1]

    return {
        width,
        height,
        x,
        y
    }
}


module.exports = getWindowInfo
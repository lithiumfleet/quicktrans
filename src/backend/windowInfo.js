// https://www.electronjs.org/docs/latest/api/browser-window#wingetposition
// https://www.electronjs.org/docs/latest/api/browser-window#wingetsize


// egt window width, height, x, y by proxiding winsow id
function getWindowInfo(event) {

    const reqWindow = event.sender.getOwnerBrowserWindow()

    const wh = reqWindow.getSize()
    const width = wh[0]
    const height = wh[1]

    const lefttop = reqWindow.getPosition()
    const left = lefttop[0]
    const top = lefttop[1]
    return {
        left,
        top,
        width,
        height
    }
}


module.exports = getWindowInfo
const { desktopCapturer, app } = require('electron')
const fs = require('fs')


let screenWidth = screenHeight = 0

// update screen width and height when app ready
app.whenReady().then(() => {
    const { screen } = require('electron/main')
    const primaryDisplay = screen.getPrimaryDisplay()
    const { width, height } = primaryDisplay.size
    screenWidth = width
    screenHeight = height
})

async function captureScreen(img_path) {
    const sources = await desktopCapturer.getSources(
        { 
            types: ['screen'],
            thumbnailSize: { width: screenWidth, height: screenHeight }
        }
    )
    const source = sources[0]

    const img = source.thumbnail.toPNG()

    fs.writeFileSync(img_path, img)
}

module.exports = captureScreen
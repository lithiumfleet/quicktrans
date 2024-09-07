const { desktopCapturer, app } = require('electron')
const fs = require('fs')


let screenWidth = screenHeight = 0

app.whenReady().then(() => {
    const { screen } = require('electron')
    const primaryDisplay = screen.getPrimaryDisplay()
    const { width, height } = primaryDisplay.size
    screenWidth = width
    screenHeight = height
})

async function captureScreen(img_path) {
    console.log("screen: ", screenWidth, screenHeight)
    const sources = await desktopCapturer.getSources(
        { 
            types: ['screen'],
            thumbnailSize: { width: screenWidth, height: screenHeight }
        }
    )
    const source = sources[0]

    const img = source.thumbnail.toPNG()

    fs.writeFile(img_path, img, (err) => { console.log(`Error occur when capture screen: ${err}`)})
}

module.exports = captureScreen
const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow() {
  const win = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1024,
    minHeight: 640,
    frame: false,
    backgroundColor: '#020d1a',
    title: 'J.A.R.V.I.S',
    icon: path.join(__dirname, '../public/favicon.svg'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  })

  win.loadFile(path.join(__dirname, '../dist/index.html'))

  // Frameless window drag + close via keyboard
  win.webContents.on('before-input-event', (_, input) => {
    if (input.key === 'F11') win.setFullScreen(!win.isFullScreen())
    if (input.key === 'Escape' && win.isFullScreen()) win.setFullScreen(false)
    if ((input.control || input.meta) && input.key === 'w') win.close()
    if ((input.control || input.meta) && input.key === 'q') app.quit()
  })
}

app.whenReady().then(createWindow)
app.on('window-all-closed', () => app.quit())

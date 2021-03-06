'use strict'

const path = require('path')
const electron = require('electron')

require('./menu')

const {
  app,
  BrowserWindow
} = electron

let mainWindow = null

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.commandLine.appendSwitch('js-flags', '--harmony')

if (process.argv[1]) {
  const cwd = path.join(process.argv[1], 'node_modules')
  global.cwd = path.resolve(cwd)
}

// app.on('before-quit', () => {
//   global.quitting = true
// })

// ipcMain.on('log', (event, value) => {
//  mainWindow.webContents.send('log', value)
// })

function ready () {
  const display = electron.screen.getPrimaryDisplay()

  let width = Math.floor(display.workAreaSize.width * 0.7)
  let height = Math.floor(display.workAreaSize.height * 0.9)

  //
  // Don't make the window bigger than 1440x900 on massive screens
  //
  if (width > 1440) width = 1440
  if (height > 900) height = 900

  const iconfiletype = process.platform === 'win32' ? 'ico' : 'png'
  const icon = path.resolve(__dirname, `static/icon.${iconfiletype}`)

  const windowOptions = {
    width,
    height,
    icon,
    minWidth: 800,
    minHeight: 450,
    textAreasAreResizable: false,
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      nodeIntegration: true
    }
  }

  mainWindow = new BrowserWindow(windowOptions)
  const loc = `file://${path.join(__dirname, 'static', 'index.html')}`
  mainWindow.loadURL(loc)

  mainWindow.on('closed', () => {
    mainWindow = null
    app.quit()
  })
}

app.on('ready', ready)

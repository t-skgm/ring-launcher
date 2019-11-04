import { app, BrowserWindow, BrowserWindowConstructorOptions } from 'electron'
import constants from 'constants/index'

const isDebug = process.env.NODE_ENV !== 'production'

const windowOptions: BrowserWindowConstructorOptions = {
  width: constants.window.width,
  height: constants.window.height,
  transparent: true,
  backgroundColor: '#00FFFFFF',
  frame: false,
  hasShadow: false,
  alwaysOnTop: true,
  skipTaskbar: true,
  center: true,
  titleBarStyle: 'customButtonsOnHover'
}

const onReady = async () => {
  let win: BrowserWindow | null
  win = new BrowserWindow(windowOptions)

  if (isDebug) {
    win.loadURL('http://localhost:8080')
    win.webContents.openDevTools()
  } else {
    // win.loadURL(`file://${__dirname}/index.html`);
    // FIXME: path
    win.loadFile('./build/index.html')
  }

  win.on('closed', function() {
    win = null
  })
}

app.once('ready', onReady)
app.on('window-all-closed', () => {
  app.quit()
})

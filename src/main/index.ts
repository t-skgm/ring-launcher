import { app, BrowserWindow, BrowserWindowConstructorOptions } from 'electron'

const isDebug = process.env.NODE_ENV !== 'production'

const windowOptions: BrowserWindowConstructorOptions = {
  width: 600,
  height: 600,
  transparent: true,
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
  win.loadURL('http://localhost:8080')

  // ChromiumのDevツールを開く
  if (isDebug) win.webContents.openDevTools()

  win.on('closed', function() {
    win = null
  })
}

app.once('ready', onReady)
app.on('window-all-closed', () => { app.quit() })

import { app, BrowserWindow, BrowserWindowConstructorOptions } from 'electron'
import { constants } from '@/constants'
import { isDebug } from '@/utils'

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

app.once('ready', async () => {
  let win: BrowserWindow | null
  win = new BrowserWindow(windowOptions)
  // win.setIgnoreMouseEvents(true, { forward: true })

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
})

app.on('window-all-closed', () => {
  app.quit()
})

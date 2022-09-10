const { app, BrowserWindow } = require('electron');
const { autoUpdater } = require("electron-updater");
const path = require('path')
const log = require('electron-log');
// log.transports.file.resolvePath = () => path.join('C:/Users/Anvesh/user data/projects/electron js/electron-auto-update', 'logs/main.log');
log.log('Application version'+app.getVersion())
let win;
const dispatch = (data) => {
  win.webContents.send('message', data)
}
function createWindow () {
    win = new BrowserWindow({
      width: 800,
      height: 600,
      // webPreferences: {
      //   preload: path.join(__dirname, 'main.js')
      // }
    })
  
    win.loadFile(path.join(__dirname, 'index.html'));
    return win

  }


  app.whenReady().then(() => {
    createWindow()
  
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
        autoUpdater.checkForUpdatesAndNotify();
        win.webContents.on('did-finish-load', () => {
          win.webContents.send('version', app.getVersion())
        })
      }
    });
    win.webContents.on('did-finish-load', () => {
      log.log('webContents',app.getVersion())
      win.webContents.send('version', app.getVersion())
    })
  })



autoUpdater.on('update-available',()=>{
    log.info('update-available')

});



autoUpdater.on('checking-for-update',()=>{
    log.info('checking-for-update')

});

autoUpdater.on('download-progress',(progress)=>{
    log.info('download-progress')
    log.info('progress track',progress)

});

autoUpdater.on('update-downloaded',()=>{
    log.info('update-download')

});







  
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
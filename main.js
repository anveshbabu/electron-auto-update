const { app, BrowserWindow } = require('electron');
const { autoUpdater } = require("electron-updater");
const log = require('electron-log');
log.transports.file.resolvePath = () => path.join('/home/doodleblue/Anvesh/projects/electron js/auto-updater/', 'logs/main.log');
function createWindow () {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
    //   webPreferences: {
    //     preload: path.join(__dirname, 'preload.js')
    //   }
    })
  
    win.loadFile('index.html')
  }


  app.whenReady().then(() => {
    createWindow()
  
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
        autoUpdater.checkForUpdatesAndNotify()
      }
    })
  })



autoUpdater.on('update-available',()=>{
    log.info('update-available')

});



autoUpdater.on('checking-for-update',()=>{
    log.info('checking-for-update')

});

autoUpdater.on('download-progress',()=>{
    log.info('download-progress')

});

autoUpdater.on('update-downloaded',()=>{
    log.info('update-download')

});







  
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
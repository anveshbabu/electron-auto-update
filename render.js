
const { ipcRenderer } = require('electron');
const select = selector => document.querySelector(selector)
const log = require('electron-log');
let version = select('#version')
ipcRenderer.on('version', (event, text) => {
    log.log('querySelector',text)
    version.innerText = text
  })
  

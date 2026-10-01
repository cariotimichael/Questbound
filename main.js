const { app, BrowserWindow, dialog } = require('electron');
const { autoUpdater } = require('electron-updater');
const log = require('electron-log');
const path = require('path');

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
// Check for updates on launch, then every 6 hours
autoUpdater.autoDownload = false;

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 960,
    minHeight: 600,
    title: 'Questbound',
    backgroundColor: '#0a0a12',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  mainWindow.loadFile(path.join(__dirname, 'game', 'questbound.html'));

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function checkForUpdates() {
  autoUpdater.checkForUpdates().catch((err) => {
    log.warn('Update check failed:', err && err.message);
  });
}

autoUpdater.on('update-available', (info) => {
  const notes = info.releaseNotes
    ? (Array.isArray(info.releaseNotes) ? info.releaseNotes.map((r) => r.note).join('\n') : String(info.releaseNotes))
    : 'Bug fixes and improvements.';
  dialog
    .showMessageBox(mainWindow, {
      type: 'info',
      title: 'Questbound update available',
      message: `Questbound ${info.version} is available.`,
      detail: `What's new:\n\n${notes}\n\nDownload and install now? The game will restart.`,
      buttons: ['Download & Install', 'Later'],
      defaultId: 0,
    })
    .then(({ response }) => {
      if (response === 0) {
        autoUpdater.downloadUpdate();
      }
    });
});

autoUpdater.on('update-downloaded', (info) => {
  dialog
    .showMessageBox(mainWindow, {
      type: 'info',
      title: 'Update ready',
      message: `Questbound ${info.version} has been downloaded.`,
      detail: 'Restart now to apply the update?',
      buttons: ['Restart Now', 'Later'],
      defaultId: 0,
    })
    .then(({ response }) => {
      if (response === 0) {
        autoUpdater.quitAndInstall(false, true);
      }
    });
});

autoUpdater.on('error', (err) => {
  log.warn('Auto-updater error:', err && err.message);
});

app.whenReady().then(() => {
  createWindow();
  // Give the window a moment before checking, so the game is visible first
  setTimeout(checkForUpdates, 5000);
  setInterval(checkForUpdates, 6 * 60 * 60 * 1000);

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

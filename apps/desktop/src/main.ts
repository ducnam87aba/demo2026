import { app, BrowserWindow, shell } from 'electron';
import { join } from 'node:path';

const allowedExternalProtocols = new Set(['https:']);
function isAllowedExternalUrl(rawUrl: string): boolean {
  try { return allowedExternalProtocols.has(new URL(rawUrl).protocol); } catch { return false; }
}

async function createWindow(): Promise<void> {
  const window = new BrowserWindow({
    width: 1280, height: 800, minWidth: 360, minHeight: 640,
    webPreferences: { preload: join(__dirname, 'preload.js'), contextIsolation: true, nodeIntegration: false, sandbox: true }
  });
  window.webContents.setWindowOpenHandler(({ url }) => {
    if (isAllowedExternalUrl(url)) void shell.openExternal(url);
    return { action: 'deny' };
  });
  window.webContents.on('will-navigate', (event, url) => {
    const currentOrigin = new URL(window.webContents.getURL()).origin;
    if (new URL(url).origin !== currentOrigin) event.preventDefault();
  });
  const devUrl = process.env.ABA_DESKTOP_DEV_URL;
  if (devUrl) await window.loadURL(devUrl);
  else await window.loadFile(join(__dirname, '../../web/dist/index.html'));
}
void app.whenReady().then(createWindow);
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) void createWindow(); });
import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('abaDesktop', Object.freeze({
  platform: process.platform,
  appKind: 'desktop'
}));
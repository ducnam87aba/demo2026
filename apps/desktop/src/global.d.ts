export {};
declare global { interface Window { abaDesktop?: Readonly<{ platform: string; appKind: 'desktop' }> } }
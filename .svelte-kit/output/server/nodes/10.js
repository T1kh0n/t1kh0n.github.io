

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/stati/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/10.BYnBDWrY.js","_app/immutable/chunks/D6ufYkdB.js","_app/immutable/chunks/CJKyudpd.js","_app/immutable/chunks/C6TxPPQD.js","_app/immutable/chunks/B16sjKQM.js","_app/immutable/chunks/DqrtEIXV.js"];
export const stylesheets = [];
export const fonts = [];

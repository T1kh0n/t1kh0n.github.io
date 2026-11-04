

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/kontakty/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.CyYf2ctC.js","_app/immutable/chunks/D6ufYkdB.js","_app/immutable/chunks/CJKyudpd.js","_app/immutable/chunks/C6TxPPQD.js"];
export const stylesheets = [];
export const fonts = [];

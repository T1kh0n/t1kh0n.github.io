

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/portfolio/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/10.CPUJYgbB.js","_app/immutable/chunks/B9S0au6J.js","_app/immutable/chunks/CSkSXbQf.js","_app/immutable/chunks/tcVImH1l.js"];
export const stylesheets = [];
export const fonts = [];

import * as fs from 'fs';
import * as path from 'path';

const checkList = [
  'Direct Answer',
  'High Speed Machining',
  'Single Source of Truth',
  'Design for Manufacturing',
  'DFM',
  'Climb Milling',
  'Conventional Milling',
  'Trochoidal Milling',
  'Plunging',
  'Ramping',
  'Helical',
  'Face Milling',
  'Shoulder Milling',
  'Slotting',
  'Tool Life',
  'Cutting Speed',
  'Feed Rate',
  'Depth of Cut',
  'Roughing',
  'Finishing',
  'MetalProm39',
  'FAQ',
  'PVD',
  'CVD',
  'DLC'
];

function scanDir(dir) {
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) {
      if (item.name !== 'node_modules' && item.name !== '.git' && item.name !== '.svelte-kit' && item.name !== 'build') {
        scanDir(full);
      }
    } else if (full.endsWith('.md') || full.endsWith('.svelte')) {
      const content = fs.readFileSync(full, 'utf-8');
      for (const phrase of checkList) {
        if (content.includes(phrase)) {
          console.log(`Found "${phrase}" in ${full}`);
        }
      }
    }
  }
}

scanDir('src');

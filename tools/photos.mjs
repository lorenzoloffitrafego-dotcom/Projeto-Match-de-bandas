import { createAvatar } from '@dicebear/core';
import { notionists } from '@dicebear/collection';
import fs from 'fs';
const P={AC:['Ana3','efe2d6'],RS:['Rafael3','dfe7dc'],BL:['Bia2','e4e0ea'],CM:['Carol2','f1e6c8'],TH:['Thiago3','efe2d6'],GF:['Gui2','e4e0ea'],DN:['Duda2','dfe7dc'],PK:['Pedro2','f1e6c8'],LM:['Lucas2','efe2d6'],MP:['Mateus2','dfe7dc'],JR:['Duda3','f1e6c8']};
let out='// GERADO por tools/photos.mjs — retratos ilustrados DiceBear "Notionists" (CC0), por iniciais.\nconst PHOTO={\n';
for(const [k,[seed,bg]] of Object.entries(P)){const svg=createAvatar(notionists,{seed,backgroundColor:[bg],backgroundType:['solid']}).toString();out+=` ${k}:'data:image/svg+xml,${encodeURIComponent(svg).replace(/'/g,'%27')}',\n`;}
out+='};\nconst pic=i=>PHOTO[i]||PHOTO.LM;\n';
fs.writeFileSync(process.argv[2],out);

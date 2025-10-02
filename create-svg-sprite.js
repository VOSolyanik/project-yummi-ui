import fs from 'fs';

import svgStore from 'svgstore';

const SOURCE_FOLDER_PATH = './src/assets/icons';
const OUT_DIR_PATH = './public';

const createSvgPack = sprite => {
  const pathToFile = `${SOURCE_FOLDER_PATH}`;

  const fileNames = fs.readdirSync(pathToFile);

  for (const fileName of fileNames) {
    const file = fs.readFileSync(`${pathToFile}/${fileName}`);
    if (!file) {
      continue;
    }

    const fileNameSegments = fileName.split('.'); // icon-pdf.svg => ['icon-pdf', 'svg']
    const name = fileNameSegments[0]; // 'icon-pdf'
    const ext = fileNameSegments[1]; // 'svg'
    if (ext !== 'svg') {
      continue;
    }

    const id = `${name}`;

    sprite = sprite.add(id, file, 'utf8');
  }
};

const run = async () => {
  const sprites = svgStore({
    // Add file name as a prefix to defs content id to prevent ids duplicates
    renameDefs: true
  });

  createSvgPack(sprites);

  fs.writeFileSync(`${OUT_DIR_PATH}/sprite.svg`, sprites.toString());
};

run().catch(err => {
  console.error('SVG Pack Error', err);
  // eslint-disable-next-line no-undef
  process.exit(1);
});


const axios = require('axios');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

const FIGMA_TOKEN = process.env.FIGMA_TOKEN;
const FIGMA_FILE_ID = '3ERBmSDciFVH36fxpGOBTj';

const figmaApi = axios.create({
  baseURL: 'https://api.figma.com/v1',
  headers: {
    'X-Figma-Token': FIGMA_TOKEN,
  },
});

// Helper to convert Figma's RGBA to a hex string
function figmaColorToHex(color) {
  const { r, g, b, a } = color;
  if (a !== 1) {
    return `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${a.toFixed(2)})`;
  }
  const toHex = (c) => {
    const hex = Math.round(c * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

async function getFigmaFile() {
  try {
    const { data } = await figmaApi.get(`/files/${FIGMA_FILE_ID}`);
    console.log('Figma Document fetched.');
    return data.document;
  } catch (error) {
    console.error('Error fetching Figma file:', error.response ? error.response.data : error.message);
    return null;
  }
}

async function main() {
  console.log('Figma sync started...');
  const document = await getFigmaFile();

  if (!document) {
    console.log('Could not fetch figma file');
    return;
  }

  const colorTokens = {};

  // Find the "Tokens" page
  const tokensPage = document.children.find(
    (page) => page.type === 'CANVAS' && page.name === 'Tokens'
  );

  if (!tokensPage) {
    console.log('No "Tokens" page found in Figma file.');
    return;
  }

  console.log('"Tokens" page found. Children:', tokensPage.children.map(c => ({ name: c.name, type: c.type })));

  // Recursive function to find color nodes
  function findColorNodes(node) {
    if (node.fills && node.fills.length > 0 && node.type !== 'GROUP' && node.type !== 'FRAME' && node.type !== 'CANVAS') {
      const styleName = node.name;
      const color = node.fills[0].color;
      if (styleName && color) {
        const tokenName = styleName.replace(/\s*\/\s*/g, '-').toLowerCase();
        colorTokens[tokenName] = figmaColorToHex(color);
        console.log('Extracted color token:', tokenName, colorTokens[tokenName]);
      }
    }

    if (node.children) {
      for (const child of node.children) {
        findColorNodes(child);
      }
    }
  }

  // Start recursive search from the "Tokens" page
  findColorNodes(tokensPage);

  fs.writeFileSync('src/styles/tokens.json', JSON.stringify({ colors: colorTokens }, null, 2));

  console.log('Figma sync completed. Tokens written to src/styles/tokens.json');
  console.log(JSON.stringify({ colors: colorTokens }, null, 2));
}

main();

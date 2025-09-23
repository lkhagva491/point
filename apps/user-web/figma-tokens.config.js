// figma-tokens.config.js
require('dotenv').config({ path: '.env.local' });

module.exports = {
  fileId: '3ERBmSDciFVH36fxpGOBTj',
  outputters: [
    {
      name: 'json',
      output: 'src/styles/tokens.json',
    },
  ],
  token: process.env.FIGMA_TOKEN,
};

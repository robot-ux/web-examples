
module.exports = {
  reactStrictMode: true,
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    }

    return config
  }
}

// fix usb error.
const fs = require('fs');
const path = require('path');
const targetPath = 'node_modules/usb/index.js';
if (!fs.existsSync(targetPath)) {
  fs.mkdirSync(path.dirname(targetPath));
  fs.writeFileSync(targetPath, 'module.exports = {}');
  console.log('Usb Polyfill install successfully.')
}

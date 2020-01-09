// @ts-check
// hook next.js requirePage

const nextRequire = require('next/dist/next-server/server/require')
const defaultNoSsr = () => null
const nextHookPageModule = { default: defaultNoSsr }

const fs = require('fs')
const util = require('util')
const readFile = util.promisify(fs.readFile)

nextRequire.requirePage = (page, distDir, serverless) => {
  const pagePath = nextRequire.getPagePath(page, distDir, serverless);
  if (pagePath.endsWith('.html')) {
    return readFile(pagePath, 'utf8');
  }
  return nextHookPageModule;
}

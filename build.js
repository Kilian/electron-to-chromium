const request = require('request');
const allElectronVersions = require('electron-releases');
const fs = require('fs');

const electronVersions = {};
const electronFullVersions = {};
const chromiumVersions = {};
const chromiumFullVersions = {};

const makePrintable = mapping => JSON.stringify(mapping, null, "\t");

allElectronVersions
  .filter(x => x.deps)
  .forEach(item => {
    const {deps: electron} = item;
    
    if (!electron.version.includes("nightly")) {
      // simple list
      const simpleVersion = electron.version.split(".")[0] + "." + electron.version.split(".")[1];
      const chromeVersion = electron.chrome.split(".")[0];
      electronVersions[simpleVersion] = chromeVersion;
      chromiumVersions[chromeVersion] = simpleVersion;
    }

    // explicit list
    electronFullVersions[electron.version] = electron.chrome;
    if (!chromiumFullVersions[electron.chrome]) {
      chromiumFullVersions[electron.chrome] = [];
    }
    chromiumFullVersions[electron.chrome].push(electron.version);
});

[
  {list: electronVersions, file: "versions.js"},
  {list: electronFullVersions, file: "full-versions.js"},
  {list: chromiumVersions, file: "chromium-versions.js"},
  {list: chromiumFullVersions, file: "full-chromium-versions.js"},
].forEach((obj) => {
  fs.writeFile(obj.file, `module.exports = ${makePrintable(obj.list)};`, function (error) {
    if (error) {
      throw error;
    }
  });
});

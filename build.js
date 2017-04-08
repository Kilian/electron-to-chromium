const request = require('request');
const fs = require('fs');

request('https://atom.io/download/electron/index.json', function(error, response, body) {
  if (!error && response.statusCode == 200) {
    const allElectronVersions = JSON.parse(body);
    const electronVersions = {};
    const electronFullVersions = {};
    const chromiumVersions = {};
    const chromiumFullVersions = {};

    const makePrintable = mapping => JSON.stringify(mapping, null, "\t");

    allElectronVersions.forEach(electron => {
      // simple list
      const simpleVersion = electron.version.split(".")[0] + "." + electron.version.split(".")[1];
      const chromeVersion = electron.chrome.split(".")[0];
      electronVersions[simpleVersion] = chromeVersion;
      chromiumVersions[chromeVersion] = simpleVersion;

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
  }
})

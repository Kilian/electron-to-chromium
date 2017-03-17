const https = require('https');
const request = require('request');
const fs = require('fs');

request('https://atom.io/download/electron/index.json', function(error, response, body) {
  if (!error && response.statusCode == 200) {
    const allElectronVersions = JSON.parse(body);
    const electronVersions = {};
    const electronFullVersions = {};
    const chromeVersions = {};
    const fullChromeVersions = {};

    const makePrintable = mapping => JSON.stringify(mapping)
                                      .replace(/,/g, ",\n\t")
                                      .replace(/{/g, "{\n\t")
                                      .replace(/}/g, "\n}");

    allElectronVersions.forEach(electron => {
      // simple list
      const simpleVersion = electron.version.split(".")[0] + "." + electron.version.split(".")[1];
      const chromeVersion = electron.chrome.split(".")[0];
      electronVersions[simpleVersion] = chromeVersion;
      chromeVersions[chromeVersion] = simpleVersion;

      // explicit list
      electronFullVersions[electron.version] = electron.chrome;
      if (!fullChromeVersions[electron.chrome]) {
        fullChromeVersions[electron.chrome] = [];
      }
      fullChromeVersions[electron.chrome].push(electron.version);
    });

    fs.writeFile("versions.js", `module.exports = ${makePrintable(electronVersions)};`, function (error) {
      if (error) {
        throw error;
      }
    });

    fs.writeFile("chrome-versions.js", `module.exports = ${makePrintable(chromeVersions)};`, function (error) {
      if (error) {
        throw error;
      }
    });

    fs.writeFile("full-versions.js", `module.exports = ${makePrintable(electronFullVersions)};`, function (error) {
      if (error) {
        throw error;
      }
    });

    fs.writeFile("full-chrome-versions.js", `module.exports = ${JSON.stringify(fullChromeVersions, null, 2)};`, function (error) {
      if (error) {
        throw error;
      }
    });
  } else {
    throw error;
  }
})

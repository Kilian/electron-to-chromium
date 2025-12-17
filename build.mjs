import fs from 'fs';
import fetch from 'node-fetch';
import { compareVersions } from 'compare-versions';

const electronVersions = {};
const electronFullVersions = {};
const chromiumVersions = {};
const chromiumFullVersions = {};

const makePrintable = mapping => JSON.stringify(mapping, null, "\t");

await fetch("https://electronjs.org/headers/index.json")
  .then(body => body.json())
  .then(allElectronVersions => {
    allElectronVersions
      .sort(({ version: a }, { version: b }) => compareVersions(a, b))
      .forEach(electron => {

        if (!electron.version.includes("nightly")) {
          // simple list
          const simpleVersion = electron.version.split(".")[0] + "." + electron.version.split(".")[1];
          const chromeVersion = electron.chrome.split(".")[0];
          electronVersions[simpleVersion] = chromeVersion;
          chromiumVersions[chromeVersion] = chromiumVersions[chromeVersion] || simpleVersion;

          // explicit list
          electronFullVersions[electron.version] = electron.chrome;
          if (!chromiumFullVersions[electron.chrome]) {
            chromiumFullVersions[electron.chrome] = [];
          }
          chromiumFullVersions[electron.chrome].push(electron.version);
        }
      });

    [
      {list: electronVersions, file: "versions"},
      {list: electronFullVersions, file: "full-versions"},
      {list: chromiumVersions, file: "chromium-versions"},
      {list: chromiumFullVersions, file: "full-chromium-versions"},
    ].forEach((obj) => {
      fs.writeFile(`${obj.file}.js`, `module.exports = ${makePrintable(obj.list)};`, function (error) {
        if (error) {
          throw error;
        }
      });
    });
  });

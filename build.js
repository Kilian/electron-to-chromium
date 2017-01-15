const https = require('https');
const request = require('request');
const fs = require('fs');

request('https://atom.io/download/electron/index.json', function(error, response, body) {
  if (!error && response.statusCode == 200) {
    const allElectronVersions = JSON.parse(body);
    const versions = {};
    const fullVersions = {};

    allElectronVersions.forEach(electron => {
      // simple list
      const simpleVersion = electron.version.split(".")[0] + "." + electron.version.split(".")[1];
      versions[simpleVersion] = electron.chrome.split(".")[0];

      // explicit list
      fullVersions[electron.version] = electron.chrome;
    });

    const makePrintable = mapping => JSON.stringify(mapping)
                                      .replace(/,/g, ",\n\t")
                                      .replace(/{/g, "{\n\t")
                                      .replace(/}/g, "\n}");

    fs.readFile("./scaffold.js", {encoding: 'utf8'}, (error, data) => {
      if (error) {
        throw error;
      }
      data = data.replace(/{versions}/, makePrintable(versions))
                 .replace(/{fullVersions}/, makePrintable(fullVersions));

      fs.writeFile("index.js", data, function (error) {
        if (error) {
          throw error;
        }
        console.log("New index.js generated and saved");
      });
    });

  } else {
    throw error;
  }
})

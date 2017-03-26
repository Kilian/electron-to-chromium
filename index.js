var versions = require('./versions');
var fullVersions = require('./full-versions');
var chromeVersions = require('./chrome-versions');
var fullChromeVersions = require('./full-chrome-versions');

var electronToChromium = function (query) {
  var number = getQueryString(query);
  return number.split('.').length > 2 ? fullVersions[number] : versions[number] || undefined;
};

var chromiumToElectron = function (query) {
  var number = getQueryString(query);
  return number.split('.').length > 2 ? fullChromeVersions[number] : chromeVersions[number] || undefined;
};

var electronToBrowserList = function (query) {
  var number = getQueryString(query);
  return versions[number] ? "Chrome >= " + versions[number] : undefined;
};

var getQueryString = function (query) {
  var number = query;
  if (query === 1) { number = "1.0" }
  if (typeof query === 'number') { number += ''; }
  return number;
};

module.exports = {
  versions: versions,
  fullVersions: fullVersions,
  chromeVersions: chromeVersions,
  fullChromeVersions: fullChromeVersions,
  electronToChromium: electronToChromium,
  electronToBrowserList: electronToBrowserList,
  chromiumToElectron: chromiumToElectron
};

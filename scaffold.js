var versions = {versions};
var fullVersions = {fullVersions};
var electronToChromium = function (query) {
  return query.split('.').length > 2 ? fullVersions[query] : versions[query] || undefined;
}

var electronToBrowserList = function (query) {
  return versions[query] ? "Chrome >= " + versions[query] : undefined;
}

module.exports = {
  versions: versions,
  fullVersions: fullVersions,
  electronToChromium: electronToChromium,
  electronToBrowserList: electronToBrowserList
};

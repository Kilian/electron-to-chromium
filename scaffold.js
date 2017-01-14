var versions = {versions};
var fullVersions = {fullVersions};
var electronToChrome = function (query) {
  return versions[query] || undefined;
}

var electronToChromeBL = function (query) {
  return versions[query] ? "Chrome >= " + versions[query] : undefined;
}

module.exports = {
  versions: versions,
  fullVersions: fullVersions,
  electronToChrome: electronToChrome,
  electronToChromeBL: electronToChromeBL
};

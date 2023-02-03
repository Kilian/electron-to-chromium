const test = require("ava");
const e2c = require("./index.js");

// test functions
test("test electronToChromium", t => {
  t.is(e2c.electronToChromium(1), "49");
  t.is(e2c.electronToChromium(1.6), "56");
  t.is(e2c.electronToChromium("1.6"), "56");
  t.is(e2c.electronToChromium("1.5.1"), "54.0.2840.101");
  t.is(e2c.electronToChromium("15.1.1"), "94.0.4606.61");
  t.is(e2c.electronToChromium("9000"), undefined);
});
test("test chromiumToElectron", t => {
  t.is(e2c.chromiumToElectron(1), undefined);
  t.is(e2c.chromiumToElectron(56), "1.6");
  t.is(e2c.chromiumToElectron("56"), "1.6");
  t.deepEqual(e2c.chromiumToElectron("54.0.2840.51"), ["1.4.12"]);
  t.is(e2c.chromiumToElectron("9000"), undefined);
});
test("test electronToBrowserList", t => {
  t.is(e2c.electronToBrowserList("1.6"), "Chrome >= 56");
  t.is(e2c.electronToBrowserList(9999), undefined);
});

// test lists
test("test versions", t => {
  t.is(e2c.versions["1.6"], "56");
  t.is(e2c.versions["15.0"], "94");
});
test("test fullVersions", t => {
  t.is(e2c.fullVersions["1.5.1"], "54.0.2840.101");
  t.is(e2c.fullVersions["15.1.1"], "94.0.4606.61");
});
test("test chromiumVersions", t => {
  t.is(e2c.chromiumVersions["56"], "1.6");
  t.is(e2c.chromiumVersions["94"], "15.0");
});
test("test fullChromiumVersions", t => {
  t.deepEqual(e2c.fullChromiumVersions["54.0.2840.51"], ["1.4.12"]);
  t.deepEqual(e2c.fullChromiumVersions["94.0.4606.61"], ["15.1.0", "15.1.1"]);
});

// test individial includes
test("test versions.js", t => {
  t.is(require("./versions")["1.6"], "56");
  t.is(require("./versions")["15.0"], "94");
});
test("test full-versions.js", t => {
  t.is(require("./full-versions")["1.5.1"], "54.0.2840.101");
  t.is(require("./full-versions")["15.1.1"], "94.0.4606.61");
});
test("test chromium-versions.js", t => {
  t.is(require("./chromium-versions")["56"], "1.6");
  t.is(require("./chromium-versions")["94"], "15.0");
});
test("test full-chromium-versions.js", t => {
  t.deepEqual(require("./full-chromium-versions")["54.0.2840.51"], ["1.4.12"]);
  t.deepEqual(require("./full-chromium-versions")["94.0.4606.61"], ["15.1.0", "15.1.1"]);
});

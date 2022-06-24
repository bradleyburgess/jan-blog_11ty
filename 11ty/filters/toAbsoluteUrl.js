const sitemeta = require("../../src/_data/sitemeta.json");

module.exports = function (url) {
  const siteUrl = sitemeta.url.replace(/\/$/, "");
  const relUrl = url.replace(/^\//, "");
  return `${siteUrl}/${relUrl}`;
};

const debug = require("debug")("Eleventy-getRequest");
const { AssetCache } = require("@11ty/eleventy-fetch");
const { request } = require("graphql-request");

const url = process.env.API_ENDPOINT;
const duration = process.env.NODE_ENV === "production" ? "30s" : "1d";

const makeRequest = async (query) => {
  debug("making request");
  const result = await request({
    url,
    document: query,
  });
  debug("got request; returning");
  debug(result);
  return result;
};

async function getRequest(query, name = query) {
  debug(`getting ${name}`);
  const asset = new AssetCache(name);
  if (asset.isCacheValid(duration)) {
    debug(`cache is valid; returning cached value`);
    const result = await asset.getCachedValue();
    return result;
  }

  debug(`cache is not valid, making request`);
  const result = await makeRequest(query);
  await asset.save(result, "json");
  debug("saved cache; returning");
  return result;
}

module.exports = getRequest;

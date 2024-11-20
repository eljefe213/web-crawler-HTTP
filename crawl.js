function normalizeUrl(urlstring) {
  const urlObj = new URL(urlstring);
  return `${urlObj.host}${urlObj.pathname}`;
}

module.exports = { normalizeUrl };

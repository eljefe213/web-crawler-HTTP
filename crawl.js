const { JSDOM } = require("jsdom");

function getURLsFromHTML(htmlBody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const links = dom.window.document.querySelectorAll("a");
  for (const link of links) {
    if (link.href.slice(0, 1) === "/") {
      // Relative URL
      urls.push(`${baseURL}${link.href}`);
    } else {
      // Absolute URL
      urls.push(link.href);
    }
  }
  return urls;
}

function normalizeUrl(urlstring) {
  const urlObj = new URL(urlstring);
  const hostPath = `${urlObj.host}${urlObj.pathname}`;
  if (hostPath.length > 0 && hostPath.slice(-1) === "/") {
    return hostPath.slice(0, -1);
  }
  return hostPath;
}

module.exports = {
  normalizeUrl,
  getURLsFromHTML,
};

const { JSDOM } = require("jsdom");

async function crawlPage(currentURL) {
  console.log(`actively crawling: ${currentURL}`);

  try {
    const resp = await fetch(currentURL);

    if (resp.status > 399) {
      console.log(`error in fetch: ${resp.status} on page: ${currentURL}`);
      return;
    }

    const contentType = resp.headers.get("content-type");
    if (contentType !== "text/html") {
      console.log(
        `non html response, content type: ${contentType} on page: ${currentURL}`
      );
      return;
    }
    console.log(await resp.text());
  } catch (err) {
    console.log(`error in fetch: ${err.message} on page: ${currentURL}`);
    return;
  }
}
function getURLsFromHTML(htmlBody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const links = dom.window.document.querySelectorAll("a");
  for (const link of links) {
    if (link.href.slice(0, 1) === "/") {
      // Relative URL
      try {
        const urlObj = new URL(`${baseURL}${link.href}`);
        urls.push(urlObj.href);
      } catch (err) {
        console.log(`error with relative url: ${err.message}`);
      }
    } else {
      // Absolute URL
      try {
        const urlObj = new URL(link.href);
        urls.push(urlObj.href);
      } catch (err) {
        console.log(`error with absolute url: ${err.message}`);
      }
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
  crawlPage,
};

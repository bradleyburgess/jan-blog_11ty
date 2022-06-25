function getParams(object) {
  const params = Object.entries(object)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);

  return params.length > 0 ? `?${params.join("&")}` : "";
}

const socialMap = {
  twitter: (url, title) => "https://twitter.com/share" + getParams({ url, text: title }),
  facebook: (url, title) =>
    "https://www.facebook.com/sharer/sharer.php" + getParams({ u: url, quote: title }),
  whatsapp: (url, title) =>
    "https://web.whatsapp.com/send" + getParams({ text: title + " | " + url }),
  reddit: (url, title) => "https://www.reddit.com/submit" + getParams({ url, title }),
  pocket: (url, title) => "https://getpocket.com/save" + getParams({ url, title }),
  email: (url, title) => "mailto:" + getParams({ subject: title, body: url }),
};

function createShareLink(name, url, title) {
  return socialMap[name](url, title);
}

module.exports = createShareLink;

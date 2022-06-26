const cheerio = require("cheerio");

const Image = require("../shortcodes/image");

async function img2picture(content, paths) {
  const inputPath = paths.inputPath ?? this.inputPath;
  const outputPath = paths.outputPath ?? this.outputPath;
  const $ = cheerio.load(content);
  const images = $("img").not("picture img");
  if (inputPath === "./src/_pages/404.njk") return content;

  const promises = [];

  for (let i = 0; i < images.length; i++) {
    const index = i;
    const img = images[i];
    const src = $(img).attr("src");
    const alt = $(img).attr("alt") ?? "";
    const title = $(img).attr("title");
    promises[i] = generatePicture({ src, alt, title, index, outputPath });
  }

  const pictures = await Promise.all(promises);
  pictures.forEach((picture, i) => {
    $(images[i]).replaceWith(picture);
  });

  const result = $.html();
  return result;
}

async function generatePicture({ src, alt, title, index, outputPath }) {
  const imageOptions = {
    loading: index === 0 ? "eager" : "lazy",
    outputPath,
    sizes: "(max-width: 40em) 100vw, 40em",
    widths: [800, 950, 1100, 1250],
  };
  if (index === 0) imageOptions.fetchpriority = "high";
  if (title) imageOptions.title = title;

  const metadata = await Image(src, alt, imageOptions);
  return metadata;
}

module.exports = img2picture;

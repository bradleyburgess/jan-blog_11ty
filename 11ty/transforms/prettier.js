const { format } = require('prettier');

const parser = 'html';

module.exports = function (content, outputPath) {
  if (process.env.NODE_ENV !== 'development') return content;
  if (outputPath && outputPath.endsWith('.html')) {
    return format(content, { parser });
  }
  return content;
};

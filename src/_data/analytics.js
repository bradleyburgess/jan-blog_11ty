require("dotenv").config();

if (!process.env.ANALYTICS_IMGSRC || !process.env.ANALYTICS_SCRIPTSRC)
  console.log("Analytics variables not set, using blank");

const ANALYTICS_IMGSRC = process.env.ANALYTICS_IMGSRC ?? "";
const ANALYTICS_SCRIPTSRC = process.env.ANALYTICS_SCRIPTSRC ?? "";

module.exports = () => ({
  enabled: process.env.ANALYTICS_IMGSRC && process.env.ANALYTICS_SCRIPTSRC ? true : false,
  imgSrc: ANALYTICS_IMGSRC,
  scriptSrc: ANALYTICS_SCRIPTSRC,
});

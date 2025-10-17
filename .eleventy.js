const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

module.exports = function (eleventyConfig) {

    eleventyConfig.addPassthroughCopy('./src/img');
    eleventyConfig.addPassthroughCopy('./src/css');
    eleventyConfig.addPassthroughCopy('./src/js');
    eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
    eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
    return {
        dir: {
            input: "src",
            output: "public"
        },
        pathPrefix: "/test/"

    }
}
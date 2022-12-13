module.exports = {
  stories: ["../../src/stories/**/*.story.@(js|jsx|ts|tsx|mdx)"],
  addons: ["@storybook/addon-essentials", "@storybook/addon-links"],
  // needed to resolve WebpackOptionsValidationError
  core: {
    builder: "webpack5",
  },
};

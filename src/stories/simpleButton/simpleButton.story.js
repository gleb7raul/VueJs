import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import SimpleButton from "../../shared/SimpleButton.vue";

export default {
  title: "SimpleButton",
};

export const WithText = () => ({
  components: { SimpleButton },
  template: '<simple-button @click="action">Hello Button</simple-button>',
  methods: { action: action("clicked") },
});

export const WithJSX = () => ({
  render() {
    return (
      <SimpleButton onClick={linkTo("Button", "With Some Emoji")}>
        With JSX
      </SimpleButton>
    );
  },
});

export const WithSomeEmoji = () => ({
  components: { SimpleButton },
  template: "<simple-button>😀 😎 👍 💯</simple-button>",
});

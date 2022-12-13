import { action } from "@storybook/addon-actions";
import SwitcherComponent from "../../shared/SwitcherComponent.vue";

const defaultArgs = {
  backgroundColor: "#c7c5c5",
};

export default {
  title: "Switcher",
  text: "Switcher",
  argTypes: {
    backgroundColor: { control: "color" },
  },
  args: defaultArgs,
};

export const WithMethods = (args) => ({
  components: { SwitcherComponent },
  setup() {
    return { args };
  },
  template: `
      <SwitcherComponent
        text="Switcher"
        name="name"
        checkedValue="TITLE"
        @change="action"
        v-bind="args"
      />
    `,
  methods: { action: action("changed") },
});

const ControlledSwitcher = (args) => ({
  components: { SwitcherComponent },
  setup() {
    return { args };
  },
  template: `
      <SwitcherComponent
        name="name"
        checkedValue="TITLE"
        v-bind="args"
      />
    `,
});

export const Switcher = ControlledSwitcher.bind({});

Switcher.args = {
  labels: ["TITLE", "GENGRE"],
  text: "Switcher",
};

import { action } from "@storybook/addon-actions";
import SearchForm from "../../components/SearchForm.vue";

const defaultArgs = {
  backgroundColor: "#c7c5c5",
  args: defaultArgs,
};

export default {
  title: "SearchForm",
};

export const WithMethods = (args) => ({
  components: { SearchForm },
  setup() {
    return { args };
  },
  template: `
      <SearchForm
        defaultSearchType="title"
        @submit="action"
        v-bind="args"
      />
    `,
  methods: { action: action("submit") },
});

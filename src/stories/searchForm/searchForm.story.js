import SearchForm from "../../components/SearchForm.vue";

export default [
  "SearchForm",
  () => ({
    components: { SearchForm },
    template: '<SearchForm defaultSearchType="title"/>',
  }),
];

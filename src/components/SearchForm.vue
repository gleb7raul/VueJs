<template>
  <form class="search-form" @submit="handleSubmit" :style="style">
    <div class="search-wrapper">
      <input
        class="search-form__input"
        type="text"
        name="searchValue"
        placeholder="Search..."
        v-model="searchValue"
      />
      <input type="submit" value="Search" class="search-form__submit" />
    </div>
    <SwitcherComponent
      v-on:switcher-data="handleSwitcher"
      text="Search by"
      name="searchBy"
      :checkedValue="searchType"
      class="search-form__switcher"
    />
  </form>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import SwitcherComponent from "../shared/SwitcherComponent.vue";

export default defineComponent({
  name: "SearchForm",
  components: { SwitcherComponent },
  props: {
    defaultSearchType: String,
    backgroundColor: {
      type: String,
      default: "transparent",
    },
  },
  data: function () {
    return {
      searchValue: "",
      searchType: this.defaultSearchType,
      style: computed(() => ({
        backgroundColor: this.backgroundColor,
      })),
    };
  },
  methods: {
    handleSubmit(e: { preventDefault: () => void }) {
      e.preventDefault();
      if (this.searchValue.length > 3) {
        const data = {
          searchType: this.searchType,
          searchValue: this.searchValue,
        };
        this.$emit("search-movie", data);
      } else alert("Search in progress");
    },
    handleSwitcher(data: string | undefined) {
      this.searchType = data;
    },
  },
});
</script>

<style lang="scss" scoped>
.search-form {
  padding: 20px 30px;
  margin-bottom: 30px;

  .search-wrapper {
    display: flex;
    justify-content: space-between;

    .search-form__submit {
      width: 230px;
      background-color: #f65261;
    }
  }

  input {
    &[type="text"] {
      padding: 10px 15px;
      width: 80%;
    }

    &[type="text"],
    &[type="submit"] {
      color: white;
      text-decoration: none;
      padding: 15px;
      border: 2px solid #7488ab;
      display: block;
      align-self: center;
      transition-duration: 0.5s;
      background-color: transparent;
      margin: 20px 0px;

      &:hover,
      &:active,
      &:focus {
        color: #fff;
        border-color: #fff;
        box-shadow: 0 0.5em 0.5em -0.4em #fff;
        transform: translateY(-0.25em);
      }
    }
  }
}
</style>

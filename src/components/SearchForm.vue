<template>
  <div class="wrapper">
    <p>
      <span class="text_netflix">netflix</span>
      <span class="text_routlette">roulette</span>
    </p>
    <h2>{{ headerText }}</h2>
    <form class="search-form" @submit="handleSubmit" :style="style">
      <div class="search-wrapper">
        <input
          class="search-form__input"
          type="text"
          name="searchValue"
          placeholder="Search..."
          :value="search"
          @input="handleInput"
        />
        <input type="submit" value="Search" class="search-form__submit" />
      </div>
      <SwitcherComponent
        v-on:switcher-data="handleSwitcher"
        text="SEARCH BY"
        name="searchBy"
        :checkedValue="storeType || searchType"
        class="search-form__switcher"
      />
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "../store/store";
import { ActionTypes } from "../store/actions";

const DEFAULT_TYPE = "TITLE";

export default defineComponent({
  name: "SearchForm",
  props: {
    backgroundColor: {
      type: String,
      default: "transparent",
    },
  },
  setup() {
    const store = useStore();
    const search = computed(() => store.getters.getSearchValue);
    const type = computed(() => store.getters.getSearchType);
    const storeType = type.value || DEFAULT_TYPE;
    store.dispatch(ActionTypes.SetSearchType, storeType);
    return { search, storeType };
  },
  data: function () {
    return {
      searchType: DEFAULT_TYPE,
      style: computed(() => ({
        backgroundColor: this.backgroundColor,
      })),
      headerText: "FIND YOUR MOVIE",
    };
  },
  methods: {
    handleSubmit(e: { preventDefault: () => void }): void {
      e.preventDefault();
      this.$store.dispatch(ActionTypes.GetMovies);
    },
    handleSwitcher(data: string): void {
      this.searchType = data;
      this.$store.dispatch(ActionTypes.SetSearchType, data);
    },
    handleInput(payload: Event): void {
      let search = (payload.target as HTMLInputElement).value;
      this.$store.dispatch(ActionTypes.SetSearch, search);
      this.$router.push({ path: `/home`, query: { search: search } });
    },
  },
});
</script>

<style lang="scss" scoped>
.wrapper {
  background-image: url("../assets/intro2_blur2.jpg");

  h2 {
    color: white;
    margin-left: 128px;
  }

  p {
    margin-left: 70px;
    margin-bottom: 50px;

    span {
      color: #f65261;
      font-size: large;
    }

    .text_netflix {
      font-weight: bold;
    }
  }
  .search-form {
    padding: 20px 30px;

    .search-form__switcher {
      margin-left: 95px;
    }

    .search-wrapper {
      display: flex;
      justify-content: center;

      .search-form__submit {
        width: 200px;
        background-color: #f65261;
        margin-left: 24px;
      }
    }

    input {
      &[type="text"] {
        padding: 10px 15px;
        width: 60%;
      }

      &::placeholder {
        color: white;
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
}
</style>

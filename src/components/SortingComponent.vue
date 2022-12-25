<template>
  <div class="wrapper">
    <span class="text" v-if="isDetail">{{
      `Films by ${genres?.join(" & ")} gener(s)`
    }}</span>
    <span class="text" v-if="!isDetail">{{ `${movieCount} movie found` }}</span>
    <SwitcherComponent
      v-if="!isDetail"
      v-on:switcher-data="handleSwitcher"
      :labels="['RELEASE DATE', 'RATING']"
      text="SORT BY"
      name="sortBy"
      :checkedValue="sortType"
      class="switcher"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { MutationType } from "../store/mutations";
import { useStore } from "../store/store";
import { ActionTypes } from "../store/actions";

const DEFAULT_TYPE = "RATING";

export default defineComponent({
  name: "SortingComponent",
  props: {
    movieCount: {
      type: Number,
      required: true,
      default: 0,
    },
    defaultSortType: {
      type: String,
      default: DEFAULT_TYPE,
    },
    isDetail: Boolean,
    genres: Array,
  },
  setup() {
    const store = useStore();
    store.dispatch(ActionTypes.SetSortBy, DEFAULT_TYPE);
  },
  data: function () {
    return {
      movies: `${this.movieCount} movie found`,
      sortType: this.defaultSortType || DEFAULT_TYPE,
    };
  },
  methods: {
    handleSwitcher(data: string): void {
      this.sortType = data;
      this.$store.dispatch(ActionTypes.SetSortBy, data);
    },
  },
});
</script>

<style lang="scss" scoped>
.wrapper {
  height: 50px;
  background-color: #555555;
  display: flex;
  justify-content: space-around;
  align-items: center;

  .text {
    color: white;
    font-size: large;
  }
}
</style>

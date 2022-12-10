<template>
  <div class="wrapper">
    <span class="text">{{ movies }}</span>
    <SwitcherComponent
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
import SwitcherComponent from "../shared/SwitcherComponent.vue";

export default {
  name: "SortingComponent",
  components: { SwitcherComponent },
  props: {
    movieCount: Number,
    defaultSortType: String,
  },
  data: function () {
    return {
      movies: `${this.movieCount} movie found`,
      sortType: this.defaultSortType || "RATING",
    };
  },
  methods: {
    handleSwitcher(data: string) {
      this.sortType = data;
    },
  },
};
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

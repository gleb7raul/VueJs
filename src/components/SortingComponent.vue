<template>
  <div class="wrapper">
    <span class="text">{{ `${movieCount} movie found` }}</span>
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
import { defineComponent } from "vue";
import SwitcherComponent from "../shared/SwitcherComponent.vue";

export default defineComponent({
  name: "SortingComponent",
  components: { SwitcherComponent },
  props: {
    movieCount: {
      type: Number,
      required: true,
    },
    defaultSortType: {
      type: String,
      default: "RATING",
    },
  },
  data: function () {
    return {
      movies: `${this.movieCount} movie found`,
      sortType: this.defaultSortType || "RATING",
    };
  },
  methods: {
    handleSwitcher(data: string): void {
      this.sortType = data;
      this.$emit("sortBy", this.sortType);
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

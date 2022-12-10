<template>
  <div class="switcher" :style="style">
    <span class="switcher__label"> {{ text }} </span>
    <div class="switcher__body">
      <input
        v-model="currrentValue"
        :id="'switcher-' + titleLabel"
        class="switcher__item--left"
        :name="name"
        type="radio"
        :value="titleLabel"
        @change="switcherData"
      />
      <label :for="'switcher-' + titleLabel" class="btn">
        {{ titleLabel }}
      </label>
      <input
        v-model="currrentValue"
        :id="'switcher-' + gengreLabel"
        class="switcher__item--right"
        :name="name"
        :value="gengreLabel"
        type="radio"
        @change="switcherData"
      />
      <label :for="'switcher-' + gengreLabel" class="btn">
        {{ gengreLabel }}
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "SwitcherComponent",
  props: {
    labels: Array,
    text: String,
    name: String,
    checkedValue: String,
    values: Array,
    backgroundColor: {
      type: String,
      default: "transparent",
    },
  },
  data: function () {
    return {
      currrentValue: this.checkedValue,
      titleLabel: this.labels ? this.labels[0] : "TITLE",
      gengreLabel: this.labels ? this.labels[1] : "GENGRE",
      style: computed(() => ({
        backgroundColor: this.backgroundColor,
      })),
    };
  },
  methods: {
    switcherData: function () {
      this.$emit("switcher-data", this.currrentValue);
    },
  },
});
</script>

<style lang="scss" scoped>
.switcher {
  max-width: 331px;
  display: flex;
  align-items: center;
  padding: 4px;
  @media screen and (max-width: 800px) {
    flex-direction: column;
    margin: 20px 0;
  }

  .switcher__body {
    border-radius: 7%;
  }

  .btn {
    display: inline-block;
    padding: 10px 20px;
    position: relative;
    text-align: center;
    transition: background-color 600ms ease, color 600ms ease;
    user-select: none;
    color: white;
  }

  &__label {
    color: white;
    margin-right: 15px;
    margin-bottom: 0;

    @media screen and (max-width: 800px) {
      margin-right: 0;
      margin-bottom: 10px;
    }
  }

  &__body {
    overflow: hidden;
  }

  &__item {
    &--left + label {
      border-right: 0;

      &:after {
        left: 100%;
      }
    }

    &--right + label {
      margin-left: -5px;

      &:after {
        left: -95%;
      }
    }

    &--left,
    &--right {
      display: none;

      & + label {
        cursor: pointer;
        min-width: 60px;

        &:hover {
          background: none;
          color: #f65261;
        }

        &:after {
          background-color: #f65261;
          content: "";
          height: 100%;
          position: absolute;
          top: 0;
          transition: left 200ms cubic-bezier(0.77, 0, 0.175, 1);
          width: 100%;
          z-index: -1;
        }
      }

      &:checked + label {
        cursor: default;
        color: white;
        transition: color 200ms;
        background-color: #f65261;

        &:after {
          left: 0;
        }
      }
    }
  }
}
</style>

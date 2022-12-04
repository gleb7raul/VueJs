<template>
  <button type="button" :class="classes" @click="onClick" :style="style">{{ label }}</button>
</template>

<script>
import './button.css';
import { reactive, computed } from 'vue';

export default {
  name: 'my-button',

  props: {
    label: {
      type: String,
      required: true,
    },
    primary: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      validator(value) {
        return ['small', 'medium', 'large'].indexOf(value) !== -1;
      },
    },
    backgroundColor: {
      type: String,
    },
  },

  emits: ['click'],

  setup(props, { emit }) {
    return {
      classes: computed(() => ({
        'storybook-button': true,
        'storybook-button--primary': reactive(props).primary,
        'storybook-button--secondary': !reactive(props).primary,
        [`storybook-button--${reactive(props).size || 'medium'}`]: true,
      })),
      style: computed(() => ({
        backgroundColor: reactive(props).backgroundColor,
      })),
      onClick() {
        emit('click');
      },
    };
  },
};
</script>

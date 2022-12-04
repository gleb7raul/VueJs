<template>
  <footer class="footer">
    <span class="footer__text">netflixroulette</span>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FooterComponent",
});
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;
  padding: 20px;
  display: flex;
  align-content: center;
  justify-content: center;

  &__text {
    color: #f65261;
  }
}
</style>

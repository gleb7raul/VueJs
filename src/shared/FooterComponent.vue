<template>
  <footer class="footer">
    <span class="footer__text_netflix">netflix</span>
    <span class="footer__text_routlette">roulette</span>
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

  span {
    color: #f65261;
    font-size: large;
  }

  .footer__text_netflix {
    font-weight: bold;
  }
}
</style>

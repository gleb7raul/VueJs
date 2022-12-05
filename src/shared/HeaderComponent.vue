<template>
  <header class="header">
    <span class="title">Movie app</span>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HeaderComponent",
});
</script>

<style lang="scss" scoped>
.header {
  padding: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.title {
  font-size: 40px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 40px;
  text-shadow: 1px 5px 20px rgba(255, 255, 255, 0.4);
}
</style>

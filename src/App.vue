<template>
  <section class="container">
    <header>
      <router-view name="headerRouter" />
    </header>
    <main>
      <router-view />
    </main>
    <FooterComponent class="footer"></FooterComponent>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";

import { useStore } from "./store/store";
import { ActionTypes } from "./store/actions";

export default defineComponent({
  name: "App",
  setup() {
    const store = useStore();
    onMounted(() => store.dispatch(ActionTypes.GetMovies));
    const totalCount = computed(() => store.getters.totalCount);
    return { totalCount, store };
  },
});
</script>

<style lang="scss" scoped>
.container {
  max-width: 1200px;
  height: 99vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}
</style>

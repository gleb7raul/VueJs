import { shallowMount } from "@vue/test-utils";
import HeaderComponent from "../../src/shared/HeaderComponent.vue";

describe("HeaderComponent.vue", () => {
  it("renders HeaderComponent", () => {
    const title = "Movie app";

    const wrapper = shallowMount(HeaderComponent);

    expect(wrapper.vm.$options.name).toBe("HeaderComponent");
    expect(wrapper.find("span").element.textContent).toBe(title);
  });
});

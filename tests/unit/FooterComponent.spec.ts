import { shallowMount } from "@vue/test-utils";
import FooterComponent from "../../src/shared/FooterComponent.vue";

describe("FooterComponent.vue", () => {
  it("renders FooterComponent", () => {
    const title = "netflix";
    const subTitle = "roulette";

    const wrapper = shallowMount(FooterComponent);

    expect(wrapper.vm.$options.name).toBe("FooterComponent");
    expect(wrapper.find(".footer__text_netflix").element.textContent).toBe(
      title
    );
    expect(wrapper.find(".footer__text_routlette").element.textContent).toBe(
      subTitle
    );
  });
});

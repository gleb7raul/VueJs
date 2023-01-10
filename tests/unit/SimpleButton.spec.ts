import { shallowMount } from "@vue/test-utils";
import SimpleButton from "../../src/shared/SimpleButton.vue";

describe("SimpleButton.vue", () => {
  it("Calls onClick() when pressing simple button", async () => {
    const wrapper = shallowMount(SimpleButton);
    const button = wrapper.find("button");
    const spy = jest.spyOn(wrapper.vm, "onClick");

    button.trigger("click");

    await wrapper.vm.$nextTick();

    expect(spy).toHaveBeenCalled();

    jest.restoreAllMocks();
  });
});

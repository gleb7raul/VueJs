import { mount, VueWrapper } from "@vue/test-utils";
import SwitcherComponent from "../../src/shared/SwitcherComponent.vue";

describe("SwitcherComponent.vue", () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    wrapper = mount(SwitcherComponent);
    wrapper.setProps({
      labels: ["TITLE", "GENGRE"],
      text: "TEXT",
      name: "NAME",
      checkedValue: "TITLE",
      values: ["TITLE", "GENGRE"],
      backgroundColor: "transparent",
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders SwitcherComponent", async () => {
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$options.name).toBe("SwitcherComponent");
    expect(wrapper.find(".switcher__label").element.textContent).toBe("TEXT");
    expect(wrapper.find(".btn").element.textContent).toBe("TITLE");
  });

  it("Calls switcherData() when pressed first radio", async () => {
    await wrapper.vm.$nextTick();

    const switcher = wrapper.find(".switcher__item--left");
    const spy = jest.spyOn(wrapper.vm, "switcherData");

    await switcher.trigger("change");

    await wrapper.vm.$nextTick();

    expect(spy).toHaveBeenCalled();
  });

  it("Calls switcherData() when pressed second radio", async () => {
    await wrapper.vm.$nextTick();

    const switcher = wrapper.find(".switcher__item--right");
    const spy = jest.spyOn(wrapper.vm, "switcherData");

    await switcher.trigger("change");

    await wrapper.vm.$nextTick();

    expect(spy).toHaveBeenCalled();
  });
});

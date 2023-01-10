import { createStore } from "vuex";
import { mount, VueWrapper } from "@vue/test-utils";
import SearchForm from "../../src/components/SearchForm.vue";
import { actions } from "../../src/store/actions";
import { state } from "../../src/store/state";
import { key } from "../../src/store/store";
import { getters } from "@/store/getters";
import { mutations } from "../../src/store/mutations";

const store = createStore({
  state,
  getters,
  actions,
  mutations,
});

describe("SearchForm.vue", () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    wrapper = mount(SearchForm, {
      global: {
        plugins: [[store, key]],
      },
    });
    wrapper.setProps({
      backgroundColor: "transparent",
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders SearchForm", async () => {
    const title = "netflix";
    const subTitle = "roulette";
    const headerText = "FIND YOUR MOVIE";

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$options.name).toBe("SearchForm");
    expect(wrapper.find(".text_netflix").element.textContent).toBe(title);
    expect(wrapper.find(".text_routlette").element.textContent).toBe(subTitle);
    expect(wrapper.find("h2").element.textContent).toBe(headerText);
  });

  it("Calls handleSubmit() when user search movies", async () => {
    const searchIcon = wrapper.find(".search-form");
    const spy = jest.spyOn(wrapper.vm, "handleSubmit");

    await searchIcon.trigger("submit");
    await wrapper.vm.$nextTick();

    expect(spy).toHaveBeenCalled();
  });

  it("Calls handleInput() when user search movies", async () => {
    const searchIcon = wrapper.find(".search-form__input");
    const spy = jest.spyOn(wrapper.vm, "handleInput");

    await searchIcon.trigger("input");
    await wrapper.vm.$nextTick();

    expect(spy).toHaveBeenCalled();
  });

  it("Calls handleInput() when user input text in search control ", async () => {
    const searchIcon = wrapper.find(".search-form__input");
    const spy = jest.spyOn(wrapper.vm, "handleInput");

    await searchIcon.trigger("input");
    await wrapper.vm.$nextTick();

    expect(spy).toHaveBeenCalled();
  });

  it("Calls handleSwitcher() when user handle SwitcherComponent", async () => {
    const searchIcon = wrapper.find("SwitcherComponent");
    const spy = jest.spyOn(wrapper.vm, "handleSwitcher");

    await searchIcon.trigger("switcher-data");
    await wrapper.vm.$nextTick();

    expect(spy).toHaveBeenCalled();
  });
});

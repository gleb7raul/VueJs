import { createStore } from "vuex";
import { mount, VueWrapper } from "@vue/test-utils";
import SortingComponent from "../../src/components/SortingComponent.vue";
import mockedMovies from "../../src/data/movies.json";
import { actions } from "../../src/store/actions";
import { state } from "../../src/store/state";
import { key } from "../../src/store/store";
import { getters } from "@/store/getters";
import { mutations } from "../../src/store/mutations";

const store = createStore({
  state: {
    ...state,
    selectedMovie: mockedMovies.movies[0],
  },
  getters,
  actions,
  mutations,
});

describe("SortingComponent.vue", () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    wrapper = mount(SortingComponent, {
      global: {
        plugins: [[store, key]],
      },
    });
    wrapper.setProps({
      movieCount: 10,
      defaultSortType: "RATING",
      isDetail: false,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders SortingComponent with empty selected movie state", async () => {
    const moviesCount = "10 movie found";

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$options.name).toBe("SortingComponent");
    expect(wrapper.find(".text").element.textContent).toBe(moviesCount);
  });

  it("renders SortingComponent", async () => {
    const geners = "Films by Drama gener(s)";

    wrapper.setProps({
      isDetail: true,
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$options.name).toBe("SortingComponent");
    expect(wrapper.find(".text").element.textContent).toBe(geners);
  });
});

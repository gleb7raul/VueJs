import { createStore } from "vuex";
import { mount, VueWrapper } from "@vue/test-utils";
import DetailMovieInfo from "../../src/components/DetailMovieInfo.vue";
import mockedMovies from "../../src/data/movies.json";
import { actions } from "../../src/store/actions";
import { state } from "../../src/store/state";
import { mutations } from "../../src/store/mutations";
import { key } from "../../src/store/store";
import { getters } from "@/store/getters";

const store = createStore({
  state: {
    ...state,
    selectedMovie: mockedMovies.movies[0],
  },
  getters,
  actions,
  mutations,
});

describe("DetailMovieInfo.vue", () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    wrapper = mount(DetailMovieInfo, {
      global: { plugins: [[store, key]] },
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders DetailMovieInfo", async () => {
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$options.name).toBe("DetailMovieInfo");
    expect(wrapper.find(".text_netflix").element.textContent).toBe("netflix");
    expect(wrapper.find(".text_routlette").element.textContent).toBe(
      "roulette"
    );
    expect(wrapper.find(".movie-card__title").element.textContent).toBe(
      "The Shawshank Redemption"
    );
    expect(wrapper.find(".movie-card__vote_average").element.textContent).toBe(
      "9.3"
    );
    expect(wrapper.find(".subTitle").element.textContent).toBe(
      "Top rated movie #1"
    );
    expect(wrapper.find(".release_date").element.textContent).toBe("1994");
    expect(wrapper.find(".dur").element.textContent).toBe("2h 6min");
    expect(wrapper.find(".movie-card__overview").element.textContent).toBe(
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency."
    );
  });

  it("Calls onHomePaget() when pressing search icon", async () => {
    const searchIcon = wrapper.find("#search");
    const spy = jest.spyOn(wrapper.vm, "onHomePaget");

    await searchIcon.trigger("click");
    await wrapper.vm.$nextTick();

    expect(spy).toHaveBeenCalled();
  });

  it("Calls onHomePaget() whith empte selected movie", async () => {
    const localStore = createStore({
      state,
      getters,
      actions,
      mutations,
    });
    const localWrapper = mount(DetailMovieInfo, {
      global: { plugins: [[localStore, key]] },
    });

    const searchIcon = localWrapper.find("#search");
    const spy = jest.spyOn(localWrapper.vm, "onHomePaget");

    await searchIcon.trigger("click");
    await localWrapper.vm.$nextTick();

    expect(spy).toHaveBeenCalled();
  });
});

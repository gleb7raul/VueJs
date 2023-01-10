import { createStore } from "vuex";
import { mount, VueWrapper } from "@vue/test-utils";
import MovieList from "../../src/components/MovieList.vue";
import mockedMovies from "../../src/data/movies.json";
import { actions } from "../../src/store/actions";
import { state } from "../../src/store/state";
import { key } from "../../src/store/store";
import { getters } from "@/store/getters";
import { mutations } from "../../src/store/mutations";

const store = createStore({
  state: {
    ...state,
    movies: mockedMovies.movies,
  },
  getters,
  actions,
  mutations: {
    ...mutations,
    SetMovieListByGenres: (state) => (state.movies = mockedMovies.movies),
  },
});

describe("MovieList.vue", () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    wrapper = mount(MovieList, {
      global: {
        plugins: [[store, key]],
      },
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders MovieList", async () => {
    wrapper.setProps({
      isDetail: false,
    });
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$options.name).toBe("MovieList");
  });
});

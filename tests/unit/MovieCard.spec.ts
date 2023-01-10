import Vuex from "vuex";
import { mount } from "@vue/test-utils";
import MovieCard from "../../src/shared/MovieCard.vue";
import mockedMovies from "../../src/data/movies.json";
import { actions } from "../../src/store/actions";
import { state } from "../../src/store/state";
import { mutations } from "../../src/store/mutations";

const store = new Vuex.Store({
  state,
  actions,
  mutations,
});

const wrapper = mount(MovieCard, { global: { plugins: [store] } });
wrapper.setProps({
  movie: mockedMovies.movies[0],
});

describe("MovieCard.vue", () => {
  it("renders MovieCard", async () => {
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$options.name).toBe("MovieCard");
    expect(wrapper.find(".movie-card__title").element.textContent).toBe(
      "The Shawshank Redemption"
    );
    expect(wrapper.find(".movie-card__release_date").element.textContent).toBe(
      "1994"
    );
    expect(wrapper.find(".movie-card__genres").element.textContent).toBe(
      "Drama"
    );
  });

  it("Calls onDetail() when pressing any movie card", async () => {
    const card = wrapper.find(".movie-card");
    const spy = jest.spyOn(wrapper.vm, "onDetail");

    await card.trigger("click");
    await wrapper.vm.$nextTick();

    expect(spy).toHaveBeenCalled();

    jest.restoreAllMocks();
  });
});

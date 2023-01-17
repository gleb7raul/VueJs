import axios from "axios";

const API_URL = "https://tame-erin-pike-toga.cyclic.app/movies";

export const API = {
  async get(sort: string, search?: string, searchType?: string) {
    const url = search
      ? `${API_URL}?_sort=${sort}&${searchType}=${search}`
      : `${API_URL}?_sort=${sort}`;

    return await axios({
      method: "GET",
      url: url,
    });
  },
};

export const MoviesApi = {
  install(app: any) {
    app.config.globalProperties.$api = API;
  },
};

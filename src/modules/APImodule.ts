import axios from "axios";

const API_URL = "https://tame-erin-pike-toga.cyclic.app/movies";

export const API = {
  async get() {
    return axios.get(API_URL);
  },
  async post(url: string, data: any) {
    return axios.post(url, data);
  },
  async put(url: string, data: any) {
    return axios.put(url, data);
  },
  async delete(url: string) {
    return axios.delete(url);
  },
};

export const MoviesApi = {
  install(app: any) {
    app.config.globalProperties.$api = API;
  },
};

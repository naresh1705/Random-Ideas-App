import axios from "axios";

class IdeasApi {
  constructor() {
    this._api_URL = "/api/ideas";
  }

  GetIdeas() {
    return axios.get(this._api_URL);
  }

  createIdeas(data) {
    return axios.post(this._api_URL, data);
  }

  updateIdea(id, data) {
    return axios.put(`${this._api_URL}/${id}`, data);
  }

  deleteIdea(id) {
    const username = localStorage.getItem("username")
      ? localStorage.getItem("username")
      : "";
    return axios.delete(`${this._api_URL}/${id}`, {
      data: {
        username,
      },
    });
  }
}

export default new IdeasApi();

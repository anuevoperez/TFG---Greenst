export default class FetchService {
  #url;
  #token;
  #defaultOptions = {};
  constructor(url, token = null) {
    this.#url = url;
    this.#token = token;
  }
  set token(_token){
    this.#token=_token;
  }
  async get(path = "/", query = null, additionalOptions = {}) {
    let params = "";
    const headers = {
      "Content-Type": "application/json",
    };
    if (this.#token) headers.Authorization = "Bearer " + this.#token;
    const options = {
      method: "GET",
      headers,
      ...this.#defaultOptions,
      ...additionalOptions,
    };
    if (query) params = new URLSearchParams(query).toString();

    const url = this.#url + path +"?"+ params;
    const response= await fetch(url, options);
    return await response.json()
  }
  async post(path = "/",body, additionalOptions = {}) {
    const headers = {
      "Content-Type": "application/json",
    };
    if (this.#token) headers.Authorization = "Bearer " + this.#token;
    const options = {
      method: "POST",
      headers,
      body: JSON.stringify(body),
      ...this.#defaultOptions,
      ...additionalOptions,
    };
    const url = this.#url + path;
    const response= await fetch(url, options);
    return await response.json()
  }
  async put(path = "/",body={}, additionalOptions = {}) {
    const headers = {
      "Content-Type": "application/json",
    };
    if (this.#token) headers.Authorization = "Bearer " + this.#token;
    const options = {
      method: "PUT",
      headers,
      body: JSON.stringify(body),
      ...this.#defaultOptions,
      ...additionalOptions,
    };
    const url = this.#url + path;
    const response= await fetch(url, options);
    return await response.json()
  }
  async delete(path = "/", additionalOptions = {}) {
    const headers = {
      "Content-Type": "application/json",
    };
    if (this.#token) headers.Authorization = "Bearer " + this.#token;
    const options = {
      method: "DELETE",
      headers,
      ...this.#defaultOptions,
      ...additionalOptions,
    };
    const url = this.#url + path;
    const response= await fetch(url, options);
    return await response.json()
  }
}

import axios from "axios";

class ApiClient {
  constructor(remoteHostUrl) {
    this.remoteHostUrl = remoteHostUrl;
    this.token = null;
    this.tokenName = "numble_token";
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem(this.tokenName, token);
  }

  async request({ endpoint, method = `GET`, data = {}, contentType = "application/json" }) {
    const url = `${this.remoteHostUrl}/${endpoint}`;
    const headers = {
      "Content-Type": contentType,
    };

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    try {
      const res = await axios({ url, method, data, headers });
      return { data: res.data, error: null };
    } catch (error) {
      console.error({ errorResponse: error.response });
      const message = error?.response?.data?.error?.message;
      return { data: null, error: message || String(error) };
    }
  }

  //AUTH requests

  // GET Requests



  async loginUser(credentials) {
    return await this.request({
      endpoint: `user/login`,
      method: `POST`,
      data: credentials,
    });
  }

  async signupUser(credentials) {
    return await this.request({
      endpoint: `user/register`,
      method: `POST`,
      data: credentials,
    });
  }

  async postStatistics(stats){

    return await this.request({
      endpoint: `stats/post`,
      method: `POST`,
      data: stats,
    })

  }

  async getStatistics(id){
    return await this.request({
      endpoint: `stats/get/` + id,
      method: `GET`,
    })
  }

}



export default new ApiClient("http://localhost:3001");

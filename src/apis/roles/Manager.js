class Manager {
  static instance;

  static getInstance() {
    if (!Manager.instance) {
      Manager.instance = new Manager();
    }
    return Manager.instance;
  }

  async list(params = {}) {
    return this.request({ url: "/manager", method: "GET", params });
  }

  async update(data, params = {}) {
    return this.request({ url: "/manager", method: "PATCH", data, params });
  }

  async getById(id, params = {}) {
    return this.request({ url: `/manager/${id}`, method: "GET", params });
  }

  async getByUserId(id, params = {}) {
    return this.request({ url: `/manager/user/${id}`, method: "GET", params });
  }

  async delete(id, params = {}) {
    return this.request({ url: `/manager/${id}`, method: "DELETE", params });
  }

  async approve(id, params = {}) {
    return this.request({
      url: `/manager/approve/${id}`,
      method: "GET",
      params,
    });
  }

  async reject(id, params = {}) {
    return this.request({
      url: `/manager/reject/${id}`,
      method: "DELETE",
      params,
    });
  }

  async deactivate(id, params = {}) {
    return this.request({
      url: `/manager/deactivate/${id}`,
      method: "DELETE",
      params,
    });
  }
}

export default Manager;

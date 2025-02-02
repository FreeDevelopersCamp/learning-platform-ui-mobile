class ContentManager {
  static instance;

  static getInstance() {
    if (!ContentManager.instance) {
      ContentManager.instance = new ContentManager();
    }
    return ContentManager.instance;
  }

  async list(params = {}) {
    return this.request({ url: "/content-manager", method: "GET", params });
  }

  async update(data, params = {}) {
    return this.request({
      url: "/content-manager",
      method: "PATCH",
      data,
      params,
    });
  }

  async getById(id, params = {}) {
    return this.request({
      url: `/content-manager/${id}`,
      method: "GET",
      params,
    });
  }

  async getByUserId(id, params = {}) {
    return this.request({
      url: `/content-manager/user/${id}`,
      method: "GET",
      params,
    });
  }

  async delete(id, params = {}) {
    return this.request({
      url: `/content-manager/${id}`,
      method: "DELETE",
      params,
    });
  }

  async approve(id, params = {}) {
    return this.request({
      url: `/content-manager/approve/${id}`,
      method: "GET",
      params,
    });
  }

  async reject(id, params = {}) {
    return this.request({
      url: `/content-manager/reject/${id}`,
      method: "DELETE",
      params,
    });
  }

  async deactivate(id, params = {}) {
    return this.request({
      url: `/content-manager/deactivate/${id}`,
      method: "DELETE",
      params,
    });
  }
}

export default ContentManager;

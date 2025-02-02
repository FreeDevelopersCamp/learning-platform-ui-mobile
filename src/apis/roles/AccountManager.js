class AccountManager {
  static instance;

  static getInstance() {
    if (!AccountManager.instance) {
      AccountManager.instance = new AccountManager();
    }
    return AccountManager.instance;
  }

  async list(params = {}) {
    return this.request({ url: "/account-manager", method: "GET", params });
  }

  async update(data, params = {}) {
    return this.request({
      url: "/account-manager",
      method: "PATCH",
      data,
      params,
    });
  }

  async getById(id, params = {}) {
    return this.request({
      url: `/account-manager/${id}`,
      method: "GET",
      params,
    });
  }

  async getByUserId(id, params = {}) {
    return this.request({
      url: `/account-manager/user/${id}`,
      method: "GET",
      params,
    });
  }

  async delete(id, params = {}) {
    return this.request({
      url: `/account-manager/${id}`,
      method: "DELETE",
      params,
    });
  }

  async approve(id, params = {}) {
    return this.request({
      url: `/account-manager/approve/${id}`,
      method: "GET",
      params,
    });
  }

  async reject(id, params = {}) {
    return this.request({
      url: `/account-manager/reject/${id}`,
      method: "DELETE",
      params,
    });
  }

  async deactivate(id, params = {}) {
    return this.request({
      url: `/account-manager/deactivate/${id}`,
      method: "DELETE",
      params,
    });
  }
}

export default AccountManager;

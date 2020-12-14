import Route from "@ember/routing/route";

interface Params {
  search?: string
  page?: number
}

export default class DashboardRoute extends Route {
  queryParams = {
    search: {
      refreshModel: true
    },
    page: {
      refreshModel: true
    }
  };

  async model(params: Params) {
    return this.store.query('question', {
      "filter[search]": params.search,
      "sort": "-views",
      "page[size]": 10,
      "page[number]": params.page
    });
  }
}

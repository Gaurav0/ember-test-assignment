import Route from "@ember/routing/route";
import QuestionsController from "expert-advice/controllers/authenticated/questions";
import Transition from "@ember/routing/-private/transition";

interface Params {
  search?: string;
  page?: number;
}

interface Query {
  sort: string;
  "page[size]": number;
  "page[number]": number;
  "filter[search]"?: string;
}

export default class QuestionsRoute extends Route {
  queryParams = {
    search: {
      refreshModel: true,
    },
    page: {
      refreshModel: true,
    },
  };

  async model(params: Params): Promise<unknown> {
    const query: Query = {
      sort: "-views",
      "page[size]": 10,
      "page[number]": params.page!,
    };
    if (params.search) {
      query["filter[search]"] = params.search;
    }
    return this.store.query("question", query);
  }

  setupController(
    controller: QuestionsController,
    model: Record<string, unknown>,
    transition: Transition
  ): void {
    super.setupController(controller, model, transition);
    controller.tempSearch = controller.search;
  }
}

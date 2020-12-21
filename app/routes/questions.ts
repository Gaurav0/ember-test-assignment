import Route from "@ember/routing/route";
import QuestionsController from "expert-advice/controllers/questions";
import Transition from "@ember/routing/-private/transition";
import { inject as service, Registry as Services } from "@ember/service";

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
  @service session!: Services["session"];

  queryParams = {
    search: {
      refreshModel: true,
    },
    page: {
      refreshModel: true,
    },
  };

  async beforeModel(): Promise<void> {
    if (!this.session.user?.email) {
      await this.session.loadUser();
    } else {
      await this.session.invalidate();
    }
  }

  async model(params: Params): Promise<unknown> {
    const query: Query = {
      sort: "-createdAt",
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

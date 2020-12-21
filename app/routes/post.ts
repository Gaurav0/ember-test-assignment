import Route from "@ember/routing/route";
import { inject as service, Registry as Services } from "@ember/service";
import Question from "expert-advice/models/question";

interface Params {
  slug?: string;
}

export default class PostRoute extends Route {
  @service session!: Services["session"];

  model(params: Params): Promise<Question | null> {
    return this.store.queryRecord("question", { slug: params.slug });
  }

  async afterModel(model: Question): Promise<void> {
    await model.incrementViews();
  }

  serialize(model: Question): Params {
    return { slug: model.slug };
  }
}

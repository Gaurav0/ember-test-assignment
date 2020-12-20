import Route from "@ember/routing/route";
import { inject as service, Registry as Services } from "@ember/service";
import Transition from "@ember/routing/-private/transition";
import User from "expert-advice/models/user";

export default class AskRoute extends Route {
  @service session!: Services["session"];

  async beforeModel(transition: Transition): Promise<void> {
    this.session.requireAuthentication(transition, "login");
    await this.session.loadUser();
  }

  model(): User {
    return this.store.createRecord("question", {
      createdBy: this.session.user,
    });
  }
}

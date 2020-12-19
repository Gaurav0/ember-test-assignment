import Route from "@ember/routing/route";
import { inject as service, Registry as Services } from "@ember/service";
import User from "expert-advice/models/user";

export default class SignupRoute extends Route {
  @service session!: Services["session"];

  beforeModel(): void {
    this.session.prohibitAuthentication("quthenticated.questions");
  }

  model(): Promise<User | null> {
    return this.store.createRecord("user");
  }
}

import Route from "@ember/routing/route";
import { inject as service, Registry as Services } from "@ember/service";

export default class SignupRoute extends Route {
  @service session!: Services['session'];

  beforeModel() {
    this.session.prohibitAuthentication("index");
  }

  model() {
    return this.store.createRecord("user");
  }
}

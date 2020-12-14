import Route from "@ember/routing/route";
import { inject as service, Registry as Services } from "@ember/service";

export default class LoginRoute extends Route {
  @service session!: Services['session'];

  beforeModel() {
    this.session.prohibitAuthentication("authenticated.questions");
  }
}

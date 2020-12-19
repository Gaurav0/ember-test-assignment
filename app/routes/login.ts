import Route from "@ember/routing/route";
import { inject as service, Registry as Services } from "@ember/service";
import LoginController from "expert-advice/controllers/login";
import Transition from "@ember/routing/-private/transition";

export default class LoginRoute extends Route {
  @service session!: Services["session"];

  beforeModel() {
    this.session.prohibitAuthentication("authenticated.questions");
  }

  resetController(
    controller: LoginController,
    isExiting: boolean,
    transition: Transition
  ) {
    controller.reset();
    super.resetController(controller, isExiting, transition);
  }
}

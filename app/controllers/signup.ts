import Controller from "@ember/controller";
import { inject as service, Registry as Services } from "@ember/service";
import { action } from "@ember/object";

export default class LoginController extends Controller {
  @service session!: Services["session"];

  @action
  async signup(): Promise<void> {
    const user = this.model;
    await user.save();
    await this.session.authenticate(
      "authenticator:oauth2",
      user.email,
      user.password
    );
    await this.transitionToRoute("authenticated.questions");
  }
}

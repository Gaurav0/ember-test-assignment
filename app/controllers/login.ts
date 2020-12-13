import Controller from "@ember/controller";
import { inject as service, Registry as Services } from "@ember/service";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";

export default class LoginController extends Controller {
  @service session!: Services['session'];

  @tracked email = "";
  @tracked password = "";
  @tracked errorMessage = "";

  @action
  async login(email: string, password: string, event: Event): Promise<void> {
    event.preventDefault();
    try {
      await this.session.authenticate("authenticator:oauth2", email, password);
    } catch {
      this.errorMessage = "Invalid login.";
    }
  }
}

import Route from "@ember/routing/route";
import { inject as service, Registry as Services } from "@ember/service";
import { action } from "@ember/object";

export default class ApplicationRoute extends Route {
  @service session!: Services["session"];

  @action
  logout(): void {
    this.session.invalidate();
  }
}

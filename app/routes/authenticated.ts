import Route from "@ember/routing/route";
import { inject as service, Registry as Services } from "@ember/service";
import Transition from '@ember/routing/-private/transition';

export default class IndexRoute extends Route {
  @service session!: Services['session'];

  beforeModel(transition: Transition) {
    this.session.requireAuthentication(transition, "login");
    return this.session.loadUser();
  }
}

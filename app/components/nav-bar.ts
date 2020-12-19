import Component from "@glimmer/component";
import { inject as service, Registry as Services } from "@ember/service";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";

export default class NavBarComponent extends Component {
  @service session!: Services["session"];

  @tracked collapsed = false;

  @action
  logout() {
    this.session.invalidate();
  }
}

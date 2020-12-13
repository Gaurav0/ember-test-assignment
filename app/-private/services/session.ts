import AddonSessionService from "ember-simple-auth/services/session";
import { inject as service, Registry as Services } from "@ember/service";
import { tracked } from '@glimmer/tracking';
import User from "ember-test-assignment/models/user";

export default class SessionService extends AddonSessionService {
  @service store!: Services['store'];

  @tracked user?: User | null;

  async loadUser() {
    if (!this.isAuthenticated) return;
    if (this.user) return;
    const user = await this.store.queryRecord('user', { me: true });
    this.user = user;
    return user;
  }

  invalidate(): void {
    super.invalidate(...arguments);
    this.user = null;
  }
}

declare module '@ember/service' {
  interface Registry {
    'session': SessionService
  }
}

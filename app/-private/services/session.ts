import AddonSessionService from "ember-simple-auth/services/session";
import { inject as service, Registry as Services } from "@ember/service";
import { tracked } from "@glimmer/tracking";
import User from "expert-advice/models/user";

export default class SessionService extends AddonSessionService {
  @service store!: Services["store"];

  @tracked user?: User | null;

  async loadUser(): Promise<User | null> {
    if (!this.isAuthenticated) return null;
    if (this.user) return this.user;
    const user = await this.store.queryRecord("user", { me: true });
    this.user = user;
    return user;
  }

  invalidate(...args: unknown[]): void {
    super.invalidate(...args);
    this.user = null;
  }
}

declare module "@ember/service" {
  interface Registry {
    session: SessionService;
  }
}

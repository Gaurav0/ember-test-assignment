import Service from "@ember/service";
import Evented from "@ember/object/evented";
import RSVP from "rsvp";
import Transition from "@ember/routing/-private/transition";

interface Data {
  authenticated: {
    access_token: string;
  };
}
declare module "ember-simple-auth/services/session" {
  export default class session extends Service.extend(Evented) {
    /**
     * Triggered whenever the session is successfully authenticated. This happens
     * when the session gets authenticated via
     * {{#crossLink "SessionService/authenticate:method"}}{{/crossLink}} but also
     * when the session is authenticated in another tab or window of the same
     * application and the session state gets synchronized across tabs or windows
     * via the store (see
     * {{#crossLink "BaseStore/sessionDataUpdated:event"}}{{/crossLink}}).
     * When using the {{#crossLink "ApplicationRouteMixin"}}{{/crossLink}} this
     * event will automatically get handled (see
     * {{#crossLink "ApplicationRouteMixin/sessionAuthenticated:method"}}{{/crossLink}}).
     * @event authenticationSucceeded
     * @public
     */

    /**
     * Triggered whenever the session is successfully invalidated. This happens
     * when the session gets invalidated via
     * {{#crossLink "SessionService/invalidate:method"}}{{/crossLink}} but also
     * when the session is invalidated in another tab or window of the same
     * application and the session state gets synchronized across tabs or windows
     * via the store (see
     * {{#crossLink "BaseStore/sessionDataUpdated:event"}}{{/crossLink}}).
     * When using the {{#crossLink "ApplicationRouteMixin"}}{{/crossLink}} this
     * event will automatically get handled (see
     * {{#crossLink "ApplicationRouteMixin/sessionInvalidated:method"}}{{/crossLink}}).
     * @event invalidationSucceeded
     * @public
     */

    isAuthenticated: boolean;
    data: Data | null;
    store: any;
    attemptedTransition: any;
    session: any;

    authenticate(...args: unknown[]): RSVP.Promise<boolean>;
    invalidate(...args: any): void;
    authorize(...args: any[]): RSVP.Promise<any>;

    requireAuthentication(
      transition: Transition,
      routeOrCallback: string | Function
    ): boolean;
    prohibitAuthentication(routeOrCallback: string | Function): boolean;
  }
}

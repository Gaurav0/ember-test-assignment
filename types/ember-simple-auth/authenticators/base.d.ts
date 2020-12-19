import RSVP from "rsvp";
import EmberObject from "@ember/object";

declare module "ember-simple-auth/authenticators/base" {
  export default class BaseAuthenticator extends EmberObject {
    restore(): RSVP.Promise<any>;
    authenticate(): RSVP.Promise<any>;
    invalidate(): RSVP.Promise<any> | void;
  }
}

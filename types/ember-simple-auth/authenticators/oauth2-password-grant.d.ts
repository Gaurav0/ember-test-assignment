import BaseAuthenticator from "ember-simple-auth/authenticators/base";

declare module "ember-simple-auth/authenticators/oauth2-password-grant" {
  export function parseResponse(locationHash: string): any;
  export default class OAuthPasswordGrant extends BaseAuthenticator {}
}

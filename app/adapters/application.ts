/* eslint-disable ember/no-computed-properties-in-native-classes */

import JSONAPIAdapter from "@ember-data/adapter/json-api";
import { underscore } from "@ember/string";
import { pluralize } from "ember-inflector";
import { computed } from "@ember/object";
import { inject as service } from "@ember/service";
import ENV from "../config/environment";
import { Registry as Services } from "@ember/service";

export default class ApplicationAdapter extends JSONAPIAdapter {
  @service session!: Services["session"];

  namespace = ENV.apiNamespace;
  host = ENV.serverURL;

  pathForType(type: string | number): string {
    const underscored = underscore(type as string);
    return pluralize(underscored);
  }

  @computed("session.{isAuthenticated,data.authenticated.access_token}")
  get headers() {
    const headers: { Authorization?: string } = {};
    if (this.session.isAuthenticated) {
      headers["Authorization"] = `Bearer ${
        this.session.data!.authenticated.access_token
      }`;
    }
    return headers;
  }
}

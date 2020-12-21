/* eslint-disable ember/no-get */ // false positive

import ENV from "expert-advice/config/environment";
import getOauthToken from "./handlers/get-oath-token";
import getUsersMe from "./handlers/get-users-me";
import postQuestions from "./handlers/post-questions";

import { Server } from "ember-cli-mirage";

export default function config(this: Server): void {
  this.logging = true;
  this.timing = 0;

  this.urlPrefix = ENV.serverURL;

  this.post("/oauth/token", getOauthToken);

  this.namespace = "/api/v1";

  this.get("/users/me", getUsersMe);

  this.get("/questions");
  this.patch("/questions/:id");
  this.post("/questions", postQuestions);
}

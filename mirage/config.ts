/* eslint-disable ember/no-get */ // false positive

import ENV from "expert-advice/config/environment";
import getOauthToken from "./handlers/get-oauth-token";
import getUsersMe from "./handlers/get-users-me";
import postUsers from "./handlers/post-users";
import getQuestions from "./handlers/get-questions";
import postQuestions from "./handlers/post-questions";
import postAnswers from "./handlers/post-answers";
import { Server } from "ember-cli-mirage";
import User from "expert-advice/models/user";

let currentUser: User | null = null;

export function getCurrentUser(): User | null {
  return currentUser;
}

export function setCurrentUser(user: User): void {
  currentUser = user;
}

export default function config(this: Server): void {
  this.logging = true;
  this.timing = 0;

  this.urlPrefix = ENV.serverURL;

  this.post("/oauth/token", getOauthToken);

  this.namespace = "/api/v1";

  this.get("/users/me", getUsersMe);
  this.post("/users", postUsers);

  this.get("/questions", getQuestions);
  this.patch("/questions/:id");
  this.post("/questions", postQuestions);

  this.post("/answers", postAnswers);
}

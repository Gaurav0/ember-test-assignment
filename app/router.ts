import EmberRouter from "@ember/routing/router";
import config from "./config/environment";

class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route("login");
  this.route("signup");
  this.route("questions", { path: "/" }, function () {
    this.route("index", { path: "/" });
  });
  this.route("ask");
  this.route("post", { path: "/:slug" });
});

export default Router;

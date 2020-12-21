import { module, test } from "qunit";
import { currentURL } from "@ember/test-helpers";
import { TestContext } from "ember-test-helpers";
import { setupApplicationTest } from "ember-qunit";
import { setupMirage } from "ember-cli-mirage/test-support";
import defaultScenario from "expert-advice/mirage/scenarios/default";
import { Server as MirageServer } from "ember-cli-mirage";
import {
  authenticate,
  invalidate,
} from "expert-advice/tests/helpers/authenticate";
import PostPage from "../helpers/page-objects/post";

type Context = TestContext & {
  server: MirageServer;
};

const postPage = new PostPage();

module("Acceptance | questions", function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);
  hooks.afterEach(async function (this: Context) {
    await invalidate(this.owner);
  });

  test("Loads post route successfully", async function (this: Context, assert) {
    defaultScenario(this.server);
    await authenticate(this.owner);
    await postPage.visit("what-is-the-meaning-of-life");

    assert.equal(
      currentURL(),
      "/what-is-the-meaning-of-life",
      "loaded the post route"
    );
  });
});

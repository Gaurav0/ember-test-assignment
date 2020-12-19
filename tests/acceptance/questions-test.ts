import { module, test } from "qunit";
import { currentURL, visit } from "@ember/test-helpers";
import { TestContext } from "ember-test-helpers";
import { setupApplicationTest } from "ember-qunit";
import { setupMirage } from "ember-cli-mirage/test-support";
import defaultScenario from "expert-advice/mirage/scenarios/default";
import { Server as MirageServer } from "miragejs";
import authenticate from "expert-advice/tests/helpers/authenticate";
import QuestionsPage from "expert-advice/tests/helpers/page-objects/questions";

type Context = TestContext & {
  server: MirageServer;
};

const questionsPage = new QuestionsPage();

module("Acceptance | questions", function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test("Loads questions route successfully", async function (this: Context, assert) {
    defaultScenario(this.server);
    await authenticate(this.owner);
    await questionsPage.visit();

    assert.equal(currentURL(), "/", "navigated to questions route");
  });
});

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
import QuestionsPage from "expert-advice/tests/helpers/page-objects/questions";
import AskPage from "expert-advice/tests/helpers/page-objects/ask";

type Context = TestContext & {
  server: MirageServer;
};

const questionsPage = new QuestionsPage();
const askPage = new AskPage();

module("Acceptance | ask", function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);
  hooks.afterEach(async function (this: Context) {
    await invalidate(this.owner);
  });

  test("Loads ask route successfully", async function (this: Context, assert) {
    defaultScenario(this.server);
    await authenticate(this.owner);
    await askPage.visit();

    assert.equal(currentURL(), "/ask", "navigated to ask route");

    assert.equal(
      questionsPage.header.element?.textContent?.trim(),
      "Expert Advice",
      "header is shown"
    );

    assert.equal(
      questionsPage.subheader.element?.textContent?.trim(),
      "Get answers to difficult questions",
      "subheader is shown"
    );

    assert.equal(
      askPage.formHeader.element?.textContent?.trim(),
      "Ask a question",
      "askPage form header is shown"
    );

    assert.equal(
      askPage.titleLabel.element?.textContent?.trim(),
      "Title",
      "title label is shown"
    );

    assert.dom(askPage.titleField.element).exists("title field is shown");

    assert.equal(
      askPage.descriptionLabel.element?.textContent?.trim(),
      "Description",
      "description label is shown"
    );

    assert
      .dom(askPage.descriptionField.element)
      .exists("description field is shown");

    assert.equal(
      askPage.tagsLabel.element?.textContent?.trim(),
      "Tags",
      "tags label is shown"
    );

    assert.dom(askPage.tagsField.element).exists("tags field is shown");

    assert.dom(askPage.postButton.element).exists("post button is shown");
  });

  test("Rediriects to /login if not authenticated", async function (this: Context, assert) {
    defaultScenario(this.server);

    // Bug in ember: TransitionAborted error thrown See https://github.com/emberjs/ember-test-helpers/issues/332
    try {
      await askPage.visit();
    } catch {
      // Do nothing
    }

    assert.equal(currentURL(), "/login", "rediriected to login route");
  });
});

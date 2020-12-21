import { module, test } from "qunit";
import { currentURL, settled } from "@ember/test-helpers";
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
import PostPage from "expert-advice/tests/helpers/page-objects/post";
import faker from "faker";

type Context = TestContext & {
  server: MirageServer;
};

const questionsPage = new QuestionsPage();
const askPage = new AskPage();
const postPage = new PostPage();

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

  test("Redirects to /login if not authenticated", async function (this: Context, assert) {
    defaultScenario(this.server);

    // Bug in ember: TransitionAborted error thrown See https://github.com/emberjs/ember-test-helpers/issues/332
    assert.rejects(askPage.visit(), "Error: TransitionAborted");

    await settled();

    assert.equal(currentURL(), "/login", "rediriected to login route");
  });

  test("Can successfully post a question", async function (this: Context, assert) {
    defaultScenario(this.server);
    await authenticate(this.owner);
    await askPage.visit();

    await askPage.fillInTitle("What is the meaning of life?");
    await askPage.fillInDescription(faker.lorem.paragraphs(2));
    await askPage.fillInTags("meaning of life, philosophy");
    await askPage.postQuestion();

    assert.equal(currentURL(), "/what-is-the-meaning-of-life");

    assert.equal(
      postPage.views.element?.textContent?.trim(),
      1,
      "views was incremented to 1"
    );

    assert.equal(
      postPage.title.element?.textContent?.trim(),
      "What is the meaning of life?",
      "title is correct"
    );
  });

  test("Can show all 3 validation messages", async function (this: Context, assert) {
    defaultScenario(this.server);
    await authenticate(this.owner);
    await askPage.visit();
    await askPage.postQuestion();

    assert.equal(currentURL(), "/ask");
    assert.equal(
      askPage.validationErrors.length,
      3,
      "all three errors are shown"
    );
  });
});

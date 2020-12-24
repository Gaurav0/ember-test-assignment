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

    assert.equal(
      postPage.title.element?.textContent?.trim(),
      "What is the meaning of life?",
      "displays the question"
    );

    assert.equal(
      postPage.views.element?.textContent?.trim(),
      1,
      "displays the views"
    );

    assert.equal(
      postPage.author.element?.textContent?.trim(),
      "From: test@test.com",
      "displays question author"
    );

    assert.dom(postPage.description.element).exists("dispalys description");

    assert.equal(
      postPage.answersHeader.element?.textContent?.trim(),
      "Answers",
      "displays answer header"
    );

    assert.equal(postPage.answers.length, 1, "1 answer shown");

    assert.equal(
      postPage.answers[0].author.element?.textContent?.trim(),
      "by test2@test.com",
      "answer's author shown"
    );

    assert
      .dom(postPage.answers[0].text.element)
      .exists("displays answer's text");
  });
});

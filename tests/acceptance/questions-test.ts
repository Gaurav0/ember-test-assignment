import { module, test } from "qunit";
import { currentURL } from "@ember/test-helpers";
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

    assert.equal(
      questionsPage.header.element?.textContent?.trim(),
      "Expert Advice",
      "header is shown"
    );

    assert.equal(
      questionsPage.searchField.element?.getAttribute("placeholder"),
      "Search...",
      "search field is shown"
    );

    assert.equal(
      questionsPage.askButton.element?.textContent?.trim(),
      "Ask a Question",
      "Ask button is shown"
    );

    assert.equal(
      questionsPage.viewsColumnHeader.element?.textContent?.trim(),
      "Views",
      "Views column header is shown"
    );

    assert.equal(
      questionsPage.titleColumnHeader.element?.textContent?.trim(),
      "Questions",
      "Question title column header is shown"
    );
  });

  test("Paginates questions", async function (this: Context, assert) {
    defaultScenario(this.server);
    this.server.createList("question", 51);
    await authenticate(this.owner);
    await questionsPage.visit();

    assert.equal(questionsPage.questions?.length, 10, "10 questions are shown");
    assert.equal(questionsPage.pageLinks?.length, 6, "6 page links are shown");
    assert.equal(questionsPage.currentPageNumber(), 1, "on first page");

    await questionsPage.clickPage(2);
    assert.equal(questionsPage.currentPageNumber(), 2, "on second page");
    assert.equal(questionsPage.questions?.length, 10, "10 questions are shown");

    await questionsPage.clickPage(3);
    assert.equal(questionsPage.currentPageNumber(), 3, "on third page");
    assert.equal(questionsPage.questions?.length, 10, "10 questions are shown");

    await questionsPage.clickPage(4);
    assert.equal(questionsPage.currentPageNumber(), 4, "on 4th page");
    assert.equal(questionsPage.questions?.length, 10, "10 questions are shown");

    await questionsPage.clickPage(5);
    assert.equal(questionsPage.currentPageNumber(), 5, "on 5th page");
    assert.equal(questionsPage.questions?.length, 10, "10 questions are shown");

    await questionsPage.clickPage(6);
    assert.equal(questionsPage.currentPageNumber(), 6, "on 6th page");
    assert.equal(questionsPage.questions?.length, 1, "1 question is shown");
  });
});

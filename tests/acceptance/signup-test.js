import { module, test } from "qunit";
import { currentURL } from "@ember/test-helpers";
import { setupApplicationTest } from "ember-qunit";
import { setupMirage } from "ember-cli-mirage/test-support";
import originalScenario from "expert-advice/mirage/scenarios/original";
import SignupPage from "../helpers/page-objects/signup";
import NavbarPage from "../helpers/page-objects/navbar";

const signupPage = new SignupPage();
const navbarPage = new NavbarPage();

module("Acceptance | signup", function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test("Signing up with new credentials", async function (assert) {
    originalScenario(this.server);
    await signupPage.visit();
    await signupPage.fillInEmail("test3@test.com");
    await signupPage.fillInPassword("test");
    await signupPage.submit();
    assert.equal(currentURL(), "/");
    assert.dom(navbarPage.email.element).hasText("test3@test.com", "signed up");
  });
});

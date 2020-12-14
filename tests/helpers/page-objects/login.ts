import { click, visit, fillIn } from "@ember/test-helpers";
import { PageObject, selector } from "fractal-page-object";

class LoginPage extends PageObject {
  url = "/login";

  emailField = selector(".login-form #email-field");
  passwordField = selector(".login-form #password-field");
  submitButton = selector(".login-form button[type='submit']");
  error = selector(".login-form__error");

  async visit() {
    await visit(this.url);
  }

  async fillInEmail(value: string) {
    await fillIn(this.emailField.element!, value);
  }

  async fillInPassword(value: string) {
    await fillIn(this.passwordField.element!, value);
  }

  async submit() {
    await click(this.submitButton.element!);
  }
}

export default LoginPage;

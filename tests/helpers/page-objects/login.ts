import { click, visit, fillIn } from "@ember/test-helpers";
import { PageObject, selector } from "fractal-page-object";

class LoginPage extends PageObject {
  url = "/login";

  emailField = selector(".login-form #email-field");
  passwordField = selector(".login-form #password-field");
  submitButton = selector(".login-form button[type='submit']");
  error = selector(".login-form__error");

  visit() {
    return visit(this.url);
  }

  fillInEmail(value: string) {
    return fillIn(this.emailField.element!, value);
  }

  fillInPassword(value: string) {
    return fillIn(this.passwordField.element!, value);
  }

  submit() {
    return click(this.submitButton.element!);
  }
}

export default LoginPage;

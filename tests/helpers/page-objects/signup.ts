import { click, visit, fillIn } from "@ember/test-helpers";
import { PageObject, selector } from "fractal-page-object";

class Signup extends PageObject {
  url = "/signup";

  emailField = selector(".signup-form #exampleInputEmail1");
  passwordField = selector(".signup-form #exampleInputPassword1");
  submitButton = selector(".signup-form button[type='submit']");
  error = selector(".signup-form__error");

  async visit(): Promise<void> {
    await visit(this.url);
  }

  async fillInEmail(value: string): Promise<void> {
    await fillIn(this.emailField.element!, value);
  }

  async fillInPassword(value: string): Promise<void> {
    await fillIn(this.passwordField.element!, value);
  }

  async submit(): Promise<void> {
    await click(this.submitButton.element!);
  }
}

export default Signup;

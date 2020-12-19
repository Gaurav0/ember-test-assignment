import { visit } from "@ember/test-helpers";
import { PageObject, selector } from "fractal-page-object";

class QuestionsPage extends PageObject {
  url = "/";

  async visit(): Promise<void> {
    await visit(this.url);
  }
}

export default QuestionsPage;

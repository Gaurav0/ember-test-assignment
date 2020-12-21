import { visit } from "@ember/test-helpers";
import { PageObject, selector } from "fractal-page-object";

class AskPage extends PageObject {
  url = "/ask";

  formHeader = selector(".Ask__form-header");
  titleLabel = selector(".Ask__label-title");
  titleField = selector("#Ask__title");
  descriptionLabel = selector(".Ask__label-description");
  descriptionField = selector("#Ask__description");
  tagsLabel = selector(".Ask__tags-label-title");
  tagsField = selector("#Ask__tags");
  postButton = selector(".Ask__post-button");

  async visit(): Promise<void> {
    await visit(this.url);
  }
}

export default AskPage;

import { visit, click, fillIn } from "@ember/test-helpers";
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
  validationErrors = selector(".Ask__error");

  async visit(): Promise<void> {
    await visit(this.url);
  }

  async fillInTitle(title: string): Promise<void> {
    await fillIn(this.titleField.element!, title);
  }

  async fillInDescription(description: string): Promise<void> {
    await fillIn(this.descriptionField.element!, description);
  }

  async fillInTags(tags: string): Promise<void> {
    await fillIn(this.tagsField.element!, tags);
  }

  async postQuestion(): Promise<void> {
    await click(this.postButton.element!);
  }
}

export default AskPage;

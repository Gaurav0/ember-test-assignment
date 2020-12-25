import { PageObject, selector } from "fractal-page-object";
import { click, fillIn, visit } from "@ember/test-helpers";

export default class PostPage extends PageObject {
  views = selector(".Question__views");
  title = selector(".Question__title");
  author = selector(".Question__author");
  description = selector(".Question__description");
  answersHeader = selector(".Question__answer-header");
  newAnswerField = selector("#Answer__text");
  newAnswerPostButton = selector(".Answer__post-button");

  tags = selector(
    ".Question__tags",
    class Tags extends PageObject {
      tag = selector(".Question___tag");
    }
  );

  answers = selector(
    ".Question__answer__body",
    class Answers extends PageObject {
      text = selector(".Question__answer__text");
      author = selector(".Question__answer__author");
    }
  );

  async visit(slug: string): Promise<void> {
    await visit(`/${slug}`);
  }

  async fillInAnswer(answer: string): Promise<void> {
    await fillIn(this.newAnswerField.element!, answer);
  }

  async submitAnswer(): Promise<void> {
    await click(this.newAnswerPostButton.element!);
  }
}

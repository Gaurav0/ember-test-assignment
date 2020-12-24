import { PageObject, selector } from "fractal-page-object";
import { visit } from "@ember/test-helpers";

export default class PostPage extends PageObject {
  views = selector(".Question__views");
  title = selector(".Question__title");
  author = selector(".Question__author");
  description = selector(".Question__description");
  answersHeader = selector(".Question__answer-header");

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
}

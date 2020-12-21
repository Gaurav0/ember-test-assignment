import { PageObject, selector } from "fractal-page-object";
import { visit } from "@ember/test-helpers";

export default class PostPage extends PageObject {
  views = selector(".Question__views");
  title = selector(".Question__title");

  async visit(slug: string): Promise<void> {
    await visit(`/${slug}`);
  }
}

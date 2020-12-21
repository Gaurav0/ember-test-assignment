import { PageObject, selector } from "fractal-page-object";

export default class PostPage extends PageObject {
  views = selector(".Question__views");
  title = selector(".Question__title");
}

import { PageObject, selector } from "fractal-page-object";

export default class NavbarPage extends PageObject {
  email = selector(".navbar-username");
}

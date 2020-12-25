import { click, fillIn, triggerEvent, visit } from "@ember/test-helpers";
import { PageObject, selector } from "fractal-page-object";

class QuestionsPage extends PageObject {
  url = "/";

  header = selector(".Question__header");
  subheader = selector(".Question__subheader");
  searchBar = selector(".Question__search-bar");
  searchField = selector(".Question__search>input");
  askButton = selector(".Question__ask-button");
  viewsColumnHeader = selector(".Question__header-views");
  titleColumnHeader = selector(".Question__header-title");

  questions = selector(
    ".Question__question",
    class Question extends PageObject {
      title = selector(".Question__title");
      views = selector(".Question__views");
    }
  );
  pageLinks = selector(
    ".Question__page-nav>a",
    class PageLink extends PageObject {
      isActive(): boolean {
        return this.element?.classList.contains("active") ?? false;
      }
    }
  );

  currentPageNumber(): number | null {
    const activePageLink = this.pageLinks.find((link) => link.isActive());
    const pageString = activePageLink?.element?.textContent;
    return (pageString && parseInt(pageString, 10)) || null;
  }

  async visit(): Promise<void> {
    await visit(this.url);
  }

  async clickPage(pageNumber: number): Promise<void> {
    await click(this.pageLinks[pageNumber - 1].element as HTMLAnchorElement);
  }

  async searchFor(searchBy: string): Promise<void> {
    await fillIn(this.searchField.element!, searchBy);
    await triggerEvent(this.searchField.element!, "focusout");
  }
}

export default QuestionsPage;

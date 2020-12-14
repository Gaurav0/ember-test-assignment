import Controller from "@ember/controller";
import { action } from "@ember/object";
import { debounce } from "@ember/runloop";

export default class QuestionsController extends Controller {
  queryParams = ['search', 'page'];

  search = "";
  page = 1;

  @action
  updateSearch(search: string) {
    debounce(this.debouncedUpdateSearch.bind(this, search), 500, true);
  }

  debouncedUpdateSearch(search: string) {
    this.search = search;
  }
}

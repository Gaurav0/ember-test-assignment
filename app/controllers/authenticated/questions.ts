import Controller from "@ember/controller";
import { action } from "@ember/object";
import { debounce } from "@ember/runloop";
import { tracked } from "@glimmer/tracking";

export default class QuestionsController extends Controller {
  queryParams = ['search', 'page'];

  @tracked search = "";
  @tracked page = 1;

  @tracked tempSearch = "";

  @action
  updateSearch(event: InputEvent) {
    const search = (event.target! as HTMLInputElement).value;
    this.tempSearch = search;
    debounce(this.debouncedUpdateSearch.bind(this), 500, true);
  }

  debouncedUpdateSearch() {
    if (this.tempSearch.length >= 3) {
      this.search = this.tempSearch;
    }
    else {
      this.search = "";
    }
  }
}

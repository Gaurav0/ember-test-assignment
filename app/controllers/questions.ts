import Controller from "@ember/controller";
import { inject as service, Registry as Services } from "@ember/service";
import { action } from "@ember/object";
import { debounce } from "@ember/runloop";
import { tracked } from "@glimmer/tracking";

export default class QuestionsController extends Controller {
  @service session!: Services["session"];

  queryParams = ["search", "page"];

  @tracked search = "";
  @tracked page = 1;

  @tracked tempSearch = "";

  get totalPages(): number {
    return this.model?.meta.pages ?? 0;
  }

  get pages(): number[] {
    const array = new Array(this.totalPages);
    for (let index = 0; index < this.totalPages; ++index) {
      array[index] = index + 1;
    }
    return array;
  }

  @action
  updateSearch(event: InputEvent): void {
    const search = (event.target! as HTMLInputElement).value;
    this.tempSearch = search;
    debounce(this.debouncedUpdateSearch.bind(this), 500, true);
  }

  debouncedUpdateSearch(): void {
    if (this.tempSearch.length >= 3) {
      this.search = this.tempSearch;
    } else {
      this.search = "";
    }
  }
}

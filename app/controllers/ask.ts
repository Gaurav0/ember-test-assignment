import Controller from "@ember/controller";
import { action } from "@ember/object";
import { inject as service, Registry as Services } from "@ember/service";
import { tracked } from "@glimmer/tracking";
import Question from "expert-advice/models/question";
import AdapterError from "@ember-data/adapter/error";

interface MyErrorJSON {
  code: number;
  message: string;
  value: unknown;
}

interface MyAdapterError extends AdapterError {
  errors: MyErrorJSON[];
}

export default class AskController extends Controller {
  @service session!: Services["session"];

  @tracked titleError = "";
  @tracked tagsError = "";

  // alias model to question
  get question(): Question {
    return this.model;
  }

  set question(value: Question) {
    this.model = value;
  }

  get tagsCommaSeparated(): string {
    return this.question.tags ? this.question.tags.join(", ") : "";
  }

  @action
  updateTitle(event: InputEvent): void {
    this.question.title = (event.target! as HTMLInputElement).value;
    this.titleError = "";
  }

  @action
  updateDescription(event: InputEvent): void {
    this.question.description = (event.target! as HTMLInputElement).value;
  }
  @action
  updateTags(event: InputEvent): void {
    this.question.tags = (event.target! as HTMLInputElement).value
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s);
    this.tagsError = "";
  }

  @action
  async postQuestion(event: Event): Promise<void> {
    event.preventDefault();
    try {
      const savedQuestion = await this.question.save();
      await this.transitionToRoute("post", { slug: savedQuestion.slug });
    } catch (error) {
      if (error.isAdapterError) {
        const err = error as MyAdapterError;
        err.errors.forEach((e) => {
          switch (e.code) {
            case 101:
              this.titleError = e.message;
              break;
            case 102:
              this.tagsError = e.message;
              break;
            default:
              console.error(e.message); // eslint-disable-line no-console
          }
        });
      } else {
        throw error;
      }
    }
  }

  @action
  resetForm(): void {
    this.question = this.store.createRecord("question", {
      user: this.session.user,
    });
    this.titleError = "";
    this.tagsError = "";
  }
}

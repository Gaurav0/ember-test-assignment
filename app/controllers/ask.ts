import Controller from "@ember/controller";
import { action } from "@ember/object";
import { inject as service, Registry as Services } from "@ember/service";
import Question from "expert-advice/models/question";

export default class AskController extends Controller {
  @service session!: Services["session"];

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
    console.log(this.question.tags);
  }

  @action
  async postQuestion(event: Event): Promise<void> {
    event.preventDefault();
    const savedQuestion = await this.question.save();
    await this.transitionToRoute("post", { slug: savedQuestion.slug });
  }

  @action
  resetForm(): void {
    this.question = this.store.createRecord("question", {
      user: this.session.user,
    });
  }
}

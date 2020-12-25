import Controller from "@ember/controller";
import { inject as service, Registry as Services } from "@ember/service";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";
import Question from "expert-advice/models/question";
import Answer from "expert-advice/models/answer";

export default class PostController extends Controller {
  @service session!: Services["session"];

  // alias model to question
  get question(): Question {
    return this.model;
  }

  set question(value: Question) {
    this.model = value;
  }

  @tracked newAnswer: Answer | null = null;

  get hasAnswer(): boolean {
    return !!(this.newAnswer && this.newAnswer.text);
  }

  @action
  updateAnswer(event: InputEvent): void {
    const value = (event.target! as HTMLInputElement).value;
    if (this.newAnswer) {
      this.newAnswer.text = value;
    } else {
      this.newAnswer = this.store.createRecord("answer", {
        createdBy: this.session.user,
      });
      this.newAnswer!.text = value;
    }
  }

  @action
  async submitAnswer(): Promise<void> {
    if (this.hasAnswer) {
      const answer = this.newAnswer!;
      answer.question = this.question;
      await answer.save();
      this.newAnswer = null;
      if (!this.isDestroyed) {
        (document.querySelector("#Answer__text") as HTMLInputElement).value =
          "";
      }
    }
  }
}

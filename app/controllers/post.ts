import Controller from "@ember/controller";
import { inject as service, Registry as Services } from "@ember/service";
import Question from "expert-advice/models/question";

export default class QuestionsController extends Controller {
  @service session!: Services["session"];

  // alias model to question
  get question(): Question {
    return this.model;
  }

  set question(value: Question) {
    this.model = value;
  }
}

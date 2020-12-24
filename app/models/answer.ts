import Model, { attr, belongsTo } from "@ember-data/model";
import User from "./user";
import Question from "./question";

export default class Answer extends Model {
  @attr text?: string;
  @attr("date") createdAt?: Date;

  @belongsTo("user") createdBy?: User;
  @belongsTo("question") question?: Question;
}

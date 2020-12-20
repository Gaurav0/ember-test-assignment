import Model, { attr, belongsTo } from "@ember-data/model";
import User from "./user";

export default class Question extends Model {
  @attr("string") title?: string;
  @attr("string") description?: string;
  @attr("number") views?: number;
  @attr("date") createdAt?: Date;
  @attr("string") slug?: string;
  @attr() tags?: string[];

  @belongsTo("user") createdBy?: User;

  //@hasMany() answers: Answer[]
}

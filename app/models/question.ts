import Model, { attr } from "@ember-data/model";

export default class Question extends Model {
  @attr("string") title?: string;
  @attr("string") description?: string;
  @attr("number") views?: number;

  //@hasMany() tags: Tag[]
  //@hasMany() answers: Answer[]
}

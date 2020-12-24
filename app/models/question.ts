import Model, { attr, belongsTo, hasMany } from "@ember-data/model";
import User from "./user";
import Answer from "./answer";

export default class Question extends Model {
  @attr("string") title?: string;
  @attr("string") description?: string;
  @attr("number") views?: number;
  @attr("date") createdAt?: Date;
  @attr("string") slug?: string;
  @attr() tags?: string[];

  @belongsTo("user") createdBy?: User;

  @hasMany("answer") answers?: Answer[];

  async incrementViews(): Promise<void> {
    this.views ??= 0;
    this.views++;
    await this.save();
  }
}

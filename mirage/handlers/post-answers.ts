import { RequestHandlerContext, Response } from "ember-cli-mirage";
import Schema from "ember-cli-mirage/orm/schema";

export default function postAnswers(
  this: RequestHandlerContext,
  schema: Schema
): Response {
  const attrs = this.normalizedRequestAttrs();

  attrs.createdAt = new Date();
  // attrs.createdById // TODO: should ensure this is correct
  // attrs.questionId // TODO: should ensure this is provided
  attrs.text = attrs.text ?? ""; // TODO: should ensure this has a value

  return new Response(201, {}, schema.answers.create(attrs));
}

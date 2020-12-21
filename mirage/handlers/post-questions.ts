import { RequestHandlerContext, Response } from "ember-cli-mirage";
import Schema from "ember-cli-mirage/orm/schema";

export default function postQuestions(
  this: RequestHandlerContext,
  schema: Schema
): Response {
  const attrs = this.normalizedRequestAttrs();

  console.log(attrs);

  attrs.views = 0;
  attrs.createdAt = new Date();
  // attrs.createdById // should ensure this is correct

  const errors = [];

  if (!attrs.title) {
    errors.push({
      code: 101,
      message: "Title must have a value",
      value: attrs.title,
    });
  }

  if (!attrs.tags || !Array.isArray(attrs.tags) || attrs.tags.length === 0) {
    errors.push({
      code: 102,
      message: "You must provide at least one tag",
      value: attrs.title,
    });
  }

  console.log(errors);

  if (errors.length > 0) {
    return new Response(400, { errors: JSON.stringify(errors) });
  }

  return new Response(201, schema.questions.create(attrs));
}

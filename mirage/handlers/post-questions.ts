import { RequestHandlerContext, Response } from "ember-cli-mirage";
import Schema from "ember-cli-mirage/orm/schema";
import slug from "slug";

export default function postQuestions(
  this: RequestHandlerContext,
  schema: Schema
): Response {
  const attrs = this.normalizedRequestAttrs();

  attrs.views = 0;
  attrs.createdAt = new Date();
  // attrs.createdById // TODO: should ensure this is correct
  attrs.title = attrs.title ?? "";
  attrs.description = attrs.description ?? "";
  attrs.slug = slug(attrs.title as string);

  const errors = [];

  if (!attrs.title) {
    errors.push({
      code: 101,
      message: "Title must have a value",
      value: attrs.title,
    });
  }

  if (!attrs.description) {
    errors.push({
      code: 102,
      message: "Description must not be empty",
      value: attrs.description,
    });
  }

  if (!attrs.tags || !Array.isArray(attrs.tags) || attrs.tags.length === 0) {
    errors.push({
      code: 103,
      message: "You must provide at least one tag",
      value: attrs.tags,
    });
  }

  if (errors.length > 0) {
    return new Response(422, {}, { errors });
  }

  return new Response(201, {}, schema.questions.create(attrs));
}

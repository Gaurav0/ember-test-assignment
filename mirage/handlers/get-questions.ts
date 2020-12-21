import { RequestHandlerContext, Request, Response } from "ember-cli-mirage";
import Schema from "ember-cli-mirage/orm/schema";

export default function getQuestions(
  this: RequestHandlerContext,
  schema: Schema,
  request: Request
): Response {
  const slug = request.queryParams.slug;
  if (slug) {
    return new Response(200, {}, schema.questions.findBy({ slug }));
  }
  return new Response(200, {}, schema.questions.all());
}

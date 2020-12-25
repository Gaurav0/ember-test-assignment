import { RequestHandlerContext, Response } from "ember-cli-mirage";
import Schema from "ember-cli-mirage/orm/schema";
import { setCurrentUser } from "../config";

export default function postUsers(
  this: RequestHandlerContext,
  schema: Schema
): Response {
  const attrs = this.normalizedRequestAttrs();

  const user = schema.users.create(attrs);
  setCurrentUser(user.attrs);

  return new Response(201, {}, user);
}

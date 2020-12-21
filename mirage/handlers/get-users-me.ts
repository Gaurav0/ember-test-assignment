import { Request, Response } from "ember-cli-mirage";
import Schema from "ember-cli-mirage/orm/schema";

export default function getUsersMe(schema: Schema, request: Request): Response {
  if (request.requestHeaders.Authorization) {
    return schema.users.first();
  }
  return new Response(401);
}

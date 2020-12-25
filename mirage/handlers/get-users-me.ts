import { Request, Response } from "ember-cli-mirage";
import Schema from "ember-cli-mirage/orm/schema";
import { getCurrentUser, setCurrentUser } from "../config";

export default function getUsersMe(schema: Schema, request: Request): Response {
  if (request.requestHeaders.Authorization) {
    let user = getCurrentUser();
    if (!user) {
      user = schema.users.first();
      setCurrentUser(user!);
    }
    return new Response(200, {}, user!);
  }
  return new Response(401);
}

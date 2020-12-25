import { Response, RequestHandlerContext } from "ember-cli-mirage";
import Schema from "ember-cli-mirage/orm/schema";
import { setCurrentUser } from "../config";

export default function getOauthToken(
  this: RequestHandlerContext,
  schema: Schema
): Response {
  const { username, password } = this.normalizedRequestAttrs();
  const user = schema.users.where({
    email: username,
    password,
  });

  if (user.length) {
    setCurrentUser(user.models[0]);
    return new Response(
      200,
      {},
      {
        access_token:
          "1b1234074a7a5e4868c96ce2e32b8a4a6aa3a7e929ef2f33e38b08f8f057961e",
        created_at: 1597285088,
        expires_in: 7200,
        refresh_token:
          "c0ff9573874e236d7e74c1adb3e2668329f2b84aba1aa5a67528799fc2634761",
        token_type: "Bearer",
      }
    );
  }

  return new Response(401);
}

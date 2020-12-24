import { Server } from "ember-cli-mirage";

export default function defaultScenario(server: Server): void {
  const user = server.create("user", { email: "test@test.com" } as Record<
    string,
    unknown
  >);

  const user2 = server.create("user", { email: "test2@test.com" } as Record<
    string,
    unknown
  >);

  const question = server.create("question", {
    title: "What is the meaning of life?",
    createdBy: user,
    tags: ["meaning of life", "philosophy"],
  } as Record<string, unknown>);

  server.create("question", {
    title: "Why can't we all just get along?",
    createdBy: user2,
    tags: ["politics"],
  } as Record<string, unknown>);

  server.create("answer", {
    question,
    createdBy: user2,
  } as Record<string, unknown>);

  // server.createList("question", 51); // uncomment to play with pagination
}

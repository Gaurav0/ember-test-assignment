import { Server } from "ember-cli-mirage";

export default function defaultScenario(server: Server): void {
  server.create("user", { email: "test@test.com" } as Record<string, unknown>);
}

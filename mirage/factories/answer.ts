import { Factory, Server } from "ember-cli-mirage";
import Schema from "ember-cli-mirage/orm/schema";
import faker from "faker";

declare const server: Server;

export default Factory.extend({
  text() {
    return faker.lorem.paragraph();
  },
  createdAt() {
    return new Date();
  },
  createdBy() {
    return (server.schema as Schema).users.first();
  },
  question() {
    return (server.schema as Schema).questions.first();
  },
});

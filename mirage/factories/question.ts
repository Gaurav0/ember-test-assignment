import { Factory, Server } from "ember-cli-mirage";
import Schema from "ember-cli-mirage/orm/schema";
import faker from "faker";

declare const server: Server;

export default Factory.extend({
  title() {
    return faker.lorem.sentence();
  },
  description() {
    return faker.lorem.paragraphs(2);
  },
  views: 0,
  createdAt() {
    return new Date();
  },
  createdBy() {
    return (server.schema as Schema).users.first();
  },
  tags() {
    return [];
  },
});

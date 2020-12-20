import { Factory } from "ember-cli-mirage";
import faker from "faker";

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
    return window.server.schema.users.first();
  },
  tags() {
    return [];
  },
});

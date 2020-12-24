import Schema from "miragejs/orm/schema";
import { Registry, Model, Factory } from "miragejs";
import DbCollection from "miragejs/db-collection";

type SchemaType = Schema<
  Registry<Record<string, typeof Model>, Record<string, typeof Factory>>
>;

export class Collection extends DbCollection {
  first(): any;
  create(query: object): any;
}

interface SchemaInterface extends SchemaType {
  users: Collection;
  questions: Collection;
  answers: Collection;
}

export default SchemaInterface;

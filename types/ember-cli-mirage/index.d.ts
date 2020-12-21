export {
  Server,
  Factory,
  Model,
  Request,
  Response,
  JSONAPISerializer,
} from "miragejs";

declare module "ember-cli-mirage" {
  export class RequestHandlerContext {
    normalizedRequestAttrs(modelName?: string): Record<string, unknown>;
  }
}

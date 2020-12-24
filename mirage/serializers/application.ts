import JSONAPISerializer from "ember-mirage-sauce/mirage-serializers/json-api-serializer";

export default class MirageSerializer extends JSONAPISerializer {
  serializeIds = "always";
}

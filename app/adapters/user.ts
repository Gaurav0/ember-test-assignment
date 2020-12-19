import ApplicationAdapter from "./application";

export interface Query {
  me?: unknown;
}

export default class UserAdapter extends ApplicationAdapter {
  urlForQueryRecord(query: Query, modelName?: string | number): string {
    if (query.me) {
      delete query.me;
      return `${super.urlForQueryRecord(query, modelName ?? "user")}/me`;
    }

    return super.urlForQueryRecord(query, modelName ?? "user");
  }
}
